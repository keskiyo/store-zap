import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

// GET: Получение всех заказов
export async function GET() {
	try {
		const rawOrders = await prisma.order.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		})

		const orders = rawOrders.map(order => {
			let items = []

			// Проверяем, является ли items массивом
			if (Array.isArray(order.items)) {
				items = order.items.map((item: any) => ({
					name: item.name || 'Товар без названия',
					// Превращаем в число. Если нет данных - ставим 0, чтобы избежать NaN
					price: Number(item.price) || 0,
					count: Number(item.count) || 0,
					imageUrl: item.imageUrl,
					// Сохраняем остальные поля, если они есть
					...item,
				}))
			} else if (typeof order.items === 'string') {
				// На случай, если JSON пришел строкой
				try {
					const parsed = JSON.parse(order.items)
					items = Array.isArray(parsed) ? parsed : []
				} catch (e) {
					items = []
				}
			}

			return {
				...order,
				items,
			}
		})

		return NextResponse.json(orders)
	} catch (error) {
		console.error('Error fetching orders:', error)
		return NextResponse.json(
			{ error: 'Ошибка при получении заказов' },
			{ status: 500 },
		)
	}
}

// PATCH: Обновление заказа (статус или комментарий)
export async function PATCH(req: Request) {
	try {
		const body = await req.json()
		const { id, status, comment } = body

		if (!id) {
			return NextResponse.json(
				{ error: 'ID заказа обязателен' },
				{ status: 400 },
			)
		}

		const updatedOrder = await prisma.order.update({
			where: { id: Number(id) },
			data: {
				...(status && { status }),
				...(comment !== undefined && { comment }),
			},
		})

		return NextResponse.json(updatedOrder)
	} catch (error) {
		console.error('Error updating order:', error)
		return NextResponse.json(
			{ error: 'Ошибка при обновлении заказа' },
			{ status: 500 },
		)
	}
}
