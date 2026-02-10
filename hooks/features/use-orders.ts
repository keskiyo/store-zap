import { Order, OrderHistoryData, OrderStatus } from '@/types'
import { useEffect, useState } from 'react'

interface ApiOrderItem {
	name: string
	price: number
	count?: number
}

const mapStatus = (dbStatus: string): OrderStatus => {
	switch (dbStatus) {
		case 'SUCCEEDED':
			return 'completed'
		case 'PENDING':
			return 'processing'
		case 'CANCELLED':
			return 'canceled'
		default:
			return 'processing'
	}
}

const formatDate = (dateString: string | Date) => {
	const date = new Date(dateString)
	return date.toLocaleString('ru-RU', {
		day: 'numeric',
		month: 'long',
		hour: '2-digit',
		minute: '2-digit',
	})
}

export const useOrders = () => {
	const [orders, setOrders] = useState<OrderHistoryData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true)
				const res = await fetch('/api/orders')

				if (!res.ok) {
					throw new Error('Ошибка сети')
				}

				// Указываем тип, что ожидаем массив объектов типа Order
				const data: (Order & { items: ApiOrderItem[] })[] =
					await res.json()

				// Трансформируем данные
				const transformedData: OrderHistoryData[] = data.map(
					(order: Order & { items: ApiOrderItem[] }) => ({
						id: `№ ${order.id}`,
						date: formatDate(order.createdAt),
						status: mapStatus(order.status),
						total: order.totalAmount,
						address: order.address || 'Адрес не указан',
						items: order.items.map((item: ApiOrderItem) => ({
							name: item.name,
							price: item.price * (item.count || 1),
						})),
					}),
				)

				setOrders(transformedData)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchOrders()
	}, [])

	return { orders, loading, error }
}
