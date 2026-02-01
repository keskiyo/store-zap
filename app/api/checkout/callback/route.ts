import { PaymentCallbackData } from '@/@types/yookassa'
import { OrderSuccessTemplate } from '@/components/shared/pages/email-templates/order-success'
import { sendEmail } from '@/lib/sendEmail'
import { prisma } from '@/prisma/prisma-client'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const data = (await req.json()) as PaymentCallbackData

		const userId = data.object.metadata.user_id
			? Number(data.object.metadata.user_id)
			: null

		const order = await prisma.order.findFirst({
			where: {
				id: Number(data.object.metadata.order_id),
			},
		})

		if (!order) {
			return NextResponse.json(
				{ message: 'Заказ не найден' },
				{ status: 404 },
			)
		}

		// Определяем целевой статус заказа на основе статуса платежа от ЮKassa
		let newStatus: OrderStatus

		switch (data.object.status) {
			case 'succeeded':
				newStatus = OrderStatus.SUCCEEDED
				break
			case 'canceled':
				newStatus = OrderStatus.CANCELLED
				break
			case 'waiting_for_capture':
				newStatus = OrderStatus.PENDING
				break
			default:
				// Для прочих статусов (например, pending) оставляем как есть или логируем ошибку
				console.log(
					`[CHECKOUT_CALLBACK] Необработанный статус: ${data.object.status}`,
				)
				return NextResponse.json(
					{ message: 'Статус не требует обработки' },
					{ status: 200 },
				)
		}

		if (order.status === newStatus) {
			return NextResponse.json({ message: 'Статус уже актуален' })
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: newStatus,
				...(userId && !order.userId && { userId: userId }),
			},
		})

		// Логика только для успешно оплаченного заказа
		if (newStatus === OrderStatus.SUCCEEDED) {
			const items = JSON.parse(order?.items as string) as CartItemDTO[]

			const successOrderTemplate = await OrderSuccessTemplate({
				orderId: order.id,
				items,
			})

			await sendEmail(
				order.email,
				'Rus-autovaz | Ваш заказ успешно оформлен !',
				successOrderTemplate,
			)

			// 2. Очищаем корзину, так как заказ оплачен
			if (order.token) {
				const cart = await prisma.cart.findFirst({
					where: {
						token: order.token,
					},
				})

				if (cart) {
					// Обнуляем сумму
					await prisma.cart.update({
						where: {
							id: cart.id,
						},
						data: {
							sum: 0,
						},
					})
					// Удаляем товары
					await prisma.cartProduct.deleteMany({
						where: {
							cartId: cart.id,
						},
					})
				}
			}
		}

		return NextResponse.json({ message: 'OK', data })
	} catch (error) {
		console.error('[CHECKOUT_CALLBACK] error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить данные оплаты' },
			{ status: 500 },
		)
	}
}
