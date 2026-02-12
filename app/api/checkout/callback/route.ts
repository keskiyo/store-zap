import { prisma } from '@/prisma/prisma-client'
import { PaymentCallbackData } from '@/types/external/yookassa.types'
import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const data = (await req.json()) as PaymentCallbackData

		const userId = data.object.metadata.user_id
			? Number(data.object.metadata.user_id)
			: null

		const orderId = Number(data.object.metadata.order_id)

		const order = await prisma.order.findFirst({
			where: {
				id: orderId,
			},
		})

		if (!order) {
			return NextResponse.json(
				{ message: 'Заказ не найден' },
				{ status: 404 },
			)
		}

		console.log('=== ВЕБХУК ПРИШЁЛ ===')
		console.log('Статус платежа:', data.object.status)
		console.log('ID заказа:', orderId)
		console.log('Метаданные:', data.object.metadata)
		console.log('=======================')

		// Определяем целевой статус заказа на основе статуса платежа от ЮKassa
		let newStatus: OrderStatus

		switch (data.object.status) {
			case 'succeeded':
				newStatus = OrderStatus.SUCCEEDED
				break

			case 'waiting_for_capture':
				newStatus = OrderStatus.PENDING
				break

			case 'canceled':
				newStatus = OrderStatus.CANCELLED
				break

			case 'pending':
				newStatus = OrderStatus.PENDING
				break

			default:
				// Для прочих статусов логируем и возвращаем
				console.warn(
					`[CHECKOUT_CALLBACK] Необработанный статус платежа: ${data.object.status}`,
					{ orderId, paymentId: data.object.id },
				)
				return NextResponse.json(
					{ message: 'Статус платежа не требует обработки' },
					{ status: 200 },
				)
		}

		if (order.status === newStatus) {
			return NextResponse.json({ message: 'Статус уже актуален' })
		}

		await prisma.order.update({
			where: { id: order.id },
			data: {
				status: newStatus,
				// Привязываем пользователя, если он не был привязан ранее
				...(userId && !order.userId && { userId: userId }),
			},
		})

		if (newStatus === OrderStatus.SUCCEEDED) {
			console.log(
				`[CHECKOUT_CALLBACK] Заказ #${order.id} успешно оплачен`,
			)

			// Очищаем СТАРУЮ корзину (по токену из заказа)
			// Новая корзина уже существует и пустая (новый токен)
			if (order.token) {
				try {
					const oldCart = await prisma.cart.findFirst({
						where: { token: order.token }, // Старый токен из заказа
					})

					if (oldCart) {
						// Обнуляем сумму старой корзины
						await prisma.cart.update({
							where: { id: oldCart.id },
							data: { sum: 0 },
						})

						// Удаляем товары из старой корзины
						await prisma.cartProduct.deleteMany({
							where: { cartId: oldCart.id },
						})

						console.log(
							`[CHECKOUT_CALLBACK] Старая корзина очищена`,
						)
					}
				} catch (cartError) {
					console.error(
						'[CHECKOUT_CALLBACK] Ошибка очистки корзины:',
						cartError,
					)
				}
			}
		}

		// ЛОГИКА ДЛЯ ОТМЕНЁННОГО ЗАКАЗА
		if (newStatus === OrderStatus.CANCELLED) {
			console.log(`[CHECKOUT_CALLBACK] Заказ #${order.id} отменён`)

			// TODO: вернуть товары обратно в корзину
		}

		// ЛОГИКА ДЛЯ ОЖИДАЮЩЕГО ПОДТВЕРЖДЕНИЯ ЗАКАЗА
		if (
			newStatus === OrderStatus.PENDING &&
			order.status !== OrderStatus.PENDING
		) {
			console.log(
				`[CHECKOUT_CALLBACK] Заказ #${order.id} ожидает подтверждения оплаты`,
			)
		}

		return NextResponse.json({
			message: 'OK',
			data: { orderId, newStatus },
		})
	} catch (error) {
		console.error('[CHECKOUT_CALLBACK] error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить данные оплаты' },
			{ status: 500 },
		)
	}
}
