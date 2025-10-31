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

		const order = await prisma.order.findFirst({
			where: {
				id: Number(data.object.metadata.order_id),
			},
		})

		if (!order) {
			return NextResponse.json({ message: 'Заказ не найден' }, { status: 404 })
		}

		const isSucceeded = data.object.status === 'succeeded'

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
			},
		})

		const items = JSON.parse(order?.items as string) as CartItemDTO[]

		const successOrderTemplate = await OrderSuccessTemplate({
			orderId: order.id,
			items,
		})

		if (isSucceeded) {
			await sendEmail(
				order.email,
				'Rus-autovaz | Ваш заказ успешно оформлен !',
				successOrderTemplate
			)
		} else {
			// Отмена платежа
		}

		return NextResponse.json(data)
	} catch (error) {
		console.error('[CHECKOUT_CALLBACK] error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить данные оплаты' },
			{ status: 500 }
		)
	}
}
