import { authOptions } from '@/components/shared/constants/auth-options'
import { prisma } from '@/prisma/prisma-client'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

// GET: Получение заказов ТЕКУЩЕГО пользователя
export async function GET() {
	try {
		const session = await getServerSession(authOptions)

		if (!session || !session.user) {
			return NextResponse.json(
				{ error: 'Не авторизован' },
				{ status: 401 },
			)
		}

		const rawOrders = await prisma.order.findMany({
			where: {
				userId: Number(session.user.id),
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		const orders = rawOrders.map(order => {
			let items = []

			let parsedItems = []

			if (typeof order.items === 'string') {
				try {
					parsedItems = JSON.parse(order.items)
				} catch (e) {
					console.error('JSON parse error:', e)
					parsedItems = []
				}
			} else if (Array.isArray(order.items)) {
				parsedItems = order.items
			}

			// Преобразуем элементы в нужный формат, учитывая вложенность product
			items = parsedItems.map((item: any) => {
				// Ищем данные внутри item.product, если нет - берем напрямую из item
				const productData = item.product || item

				return {
					id: item.id,
					name: productData.name || 'Товар без названия',
					price: Number(productData.price) || 0,
					count: Number(item.count) || 1,
					imageUrl: productData.imageUrl || null,
				}
			})

			return {
				...order,
				id: String(order.id), // Превращаем ID в строку для UI
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
