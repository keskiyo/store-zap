import { Order, OrderHistoryData, OrderStatus } from '@/types'
import useSWR from 'swr'

interface ApiOrderItem {
	name: string
	price: number
	count?: number
	imageUrl?: string
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

const fetcher = async (url: string) => {
	const res = await fetch(url)

	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`)
	}

	const jsonData = await res.json()
	const orders: (Order & { items: ApiOrderItem[] })[] = jsonData

	return orders.map((order: Order & { items: ApiOrderItem[] }) => ({
		id: `№ ${order.id}`,
		date: formatDate(order.createdAt),
		status: mapStatus(order.status),
		total: order.totalAmount,
		address: order.address || 'Адрес не указан',
		items: order.items.map((item: ApiOrderItem) => ({
			name: item.name,
			price: item.price * (item.count || 1),
			imageUrl: item.imageUrl,
		})),
	}))
}

export const useOrders = (pollingInterval: number = 30000) => {
	const { data, error, mutate } = useSWR<OrderHistoryData[], Error>(
		'/api/orders-history',
		fetcher,
		{
			refreshInterval: pollingInterval,
			revalidateOnFocus: false, // Не обновляем при фокусе
			revalidateOnReconnect: true, // Обновляем при восстановлении соединения
		},
	)

	return {
		orders: data || [],
		loading: !error && !data,
		error: error?.message || null,
		refetch: mutate,
	}
}
