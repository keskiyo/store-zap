'use server'

import { VerificationUserTemplate } from '@/components/shared'
import { CheckoutFormValues } from '@/components/shared/constants/checkout-form-schema'
import { PayOrderTemplate } from '@/components/shared/pages/email-templates/pay-order'
import { createPayment } from '@/lib/create-payment'
import { getUserSession } from '@/lib/get-user-session'
import { sendEmail } from '@/lib/sendEmail'
import { prisma } from '@/prisma/prisma-client'
import { OrderStatus, Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies()
		const cartToken = (await cookieStore).get('cartToken')?.value

		if (!cartToken) {
			throw new Error('Cart token not found')
		}
		// Поиск корзины по токену
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						product: true,
					},
				},
			},
			where: {
				token: cartToken,
			},
		})
		// Если корзина не найдена возвращаем ошибку
		if (!userCart) {
			throw new Error('User cart not found')
		}
		// Если корзина пустая возвращаем ошибку
		if (userCart?.sum === 0) {
			throw new Error('Cart is empty')
		}
		// Создание заказа
		const order = await prisma.order.create({
			data: {
				// userId,
				token: cartToken,
				status: OrderStatus.PENDING,
				totalAmount: userCart.sum,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				items: JSON.stringify(userCart.items),
				name: data.firstName + ' ' + data.lastName,
				email: data.email,
			},
		})
		// Очищение суммы корзины
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				sum: 0,
			},
		})
		// Удаление товаров из корзины
		await prisma.cartProduct.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		// Создание ссылки для оплаты
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: 'Оплата заказа #' + order.name,
		})

		if (!paymentData) {
			throw new Error('Payment data not found')
		}

		// Обновление заказа с ссылкой на оплату
		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		})

		const paymentUrl = paymentData.confirmation.confirmation_url

		//Отправка письма об оплате и ссылка на оплату (не думаю что это требуется)
		const payOrderTemplate = await PayOrderTemplate({
			orderId: order.id,
			totalAmount: order.totalAmount,
			paymentUrl,
		})

		await sendEmail(
			data.email,
			'Rus-autovaz | Заказ успешно оформлен! Оплатите заказ #' + order.id,
			payOrderTemplate
		)

		return paymentUrl
	} catch (err) {
		console.log('[CreateOrder] server error', err)
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession()

		if (!currentUser) {
			throw new Error('Пользователь не найден')
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		})

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				name: body.name,
				email: body.email,
				password: body.password
					? hashSync(body.password as string, 10)
					: findUser?.password,
			},
		})
	} catch (err) {
		console.log('Error [UPDATE_USER]', err)
		throw err
	}
}

export async function registerUser(
	body: Prisma.UserCreateInput & { captchaToken: string }
) {
	try {
		const captchaResponse = await fetch('https://hcaptcha.com/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `response=${body.captchaToken}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
		})

		const captchaResult = await captchaResponse.json()

		if (!captchaResult.success) {
			throw new Error(
				'Ошибка проверки безопасности. Пожалуйста, попробуйте еще раз'
			)
		}

		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		})

		if (user) {
			if (!user.verified) {
				throw new Error('Почта не подтверждена')
			}

			throw new Error('Пользователь уже существует')
		}

		const createdUser = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		})

		const code = Math.floor(100000 + Math.random() * 900000).toString()

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		})

		const verificationUser = await VerificationUserTemplate({
			code,
		})

		await sendEmail(
			createdUser.email,
			'Rus-autovaz | 📝 Подтверждение регистрации',
			verificationUser
		)
	} catch (err) {
		console.log('Error [CREATE_USER]', err)
		throw err
	}
}
