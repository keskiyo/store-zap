'use server'

import { PayOrderTemplate } from '@/components/email/PayOrder'
import { VerificationUserTemplate } from '@/components/email/VerificationUser'
import { CheckoutFormValues } from '@/components/shared/constants/checkout-form-schema'
import { getUserSession } from '@/lib/auth/get-user-session'
import { sendEmail } from '@/lib/email/sendEmail'
import { createPayment } from '@/lib/payments/create-payment'
import { prisma } from '@/prisma/prisma-client'
import { OrderStatus, Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { randomUUID } from 'crypto'
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
		if (userCart.sum === 0) {
			throw new Error('Cart is empty')
		}
		// Создание заказа
		const order = await prisma.order.create({
			data: {
				userId: userCart.userId,
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

		// Тестовые карты ЮKassa
		// 5555 5555 5555 4642 (Mastercard)
		// 4000 0000 0000 0002 (Visa)

		// Очистка корзины
		await prisma.cart.update({
			where: { id: userCart.id },
			data: { sum: 0 },
		})
		await prisma.cartProduct.deleteMany({
			where: { cartId: userCart.id },
		})

		// Создание нового токена для корзины
		const newCartToken = randomUUID()
		// Обновляем токен корзины (не создаём новую!)
		// Старые товары остаются до подтверждения оплаты
		await prisma.cart.update({
			where: { id: userCart.id },
			data: { token: newCartToken },
		})

		// Создание ссылки для оплаты
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: 'Оплата заказа #' + order.name,
			userId: order.userId,
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

		//Отправка письма об оплате и ссылка на оплату
		const payOrderTemplate = await PayOrderTemplate({
			orderId: order.id,
			totalAmount: order.totalAmount,
			paymentUrl,
		})

		if (payOrderTemplate) {
			await sendEmail(
				data.email,
				'Rus-autovaz | Заказ успешно оформлен! Оплатите заказ #' +
					order.id,
				payOrderTemplate,
			)
		}

		return {
			paymentUrl,
			newCartToken,
		}
	} catch (err) {
		console.error('[CreateOrder] server error', err)
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession()

		if (!currentUser) {
			throw new Error('Пользователь не найден')
		}

		const data: Prisma.UserUpdateInput = {
			name: body.name,
			email: body.email,
		}

		if (body.password) {
			data.password = hashSync(body.password as string, 10)
		}

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data,
		})
	} catch (err) {
		console.error('Error [UPDATE_USER]', err)
		throw err
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		// Проверяем, существует ли пользователь
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		})

		if (user) {
			// Если пользователь найден И ПОДТВЕРЖДЕН
			if (user.verified) {
				throw new Error('Пользователь уже зарегистрирован')
			}

			// Если пользователь найден, но НЕ ПОДТВЕРЖДЕН
			// Обновляем данные и отправляем код повторно
			const code = Math.floor(100000 + Math.random() * 900000).toString()

			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					name: body.name,
					password: hashSync(body.password, 10),
				},
			})

			await prisma.verificationCode.upsert({
				where: {
					userId: user.id,
				},
				update: {
					code: code,
					createdAt: new Date(),
				},
				create: {
					code: code,
					userId: user.id,
				},
			})

			const verificationUser = VerificationUserTemplate({
				code,
			})

			if (verificationUser) {
				await sendEmail(
					user.email,
					'Rus-autovaz | 📝 Повторное подтверждение регистрации',
					verificationUser,
				)
			}

			return
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

		const verificationUser = VerificationUserTemplate({
			code,
		})

		if (verificationUser) {
			await sendEmail(
				createdUser.email,
				'Rus-autovaz | 📝 Подтверждение регистрации',
				verificationUser,
			)
		}
	} catch (err) {
		console.error('Error [CREATE_USER]', err)
		throw err
	}
}
