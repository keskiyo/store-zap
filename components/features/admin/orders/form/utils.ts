import { OrderStatus } from './types'

export const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

export const getStatusColor = (status: OrderStatus) => {
	switch (status) {
		case 'PENDING':
			return 'bg-yellow-100 text-yellow-800 border-yellow-200'
		case 'SUCCEEDED':
			return 'bg-green-100 text-green-800 border-green-200'
		case 'CANCELLED':
			return 'bg-red-100 text-red-800 border-red-200'
		default:
			return 'bg-gray-100 text-gray-800'
	}
}

export const getStatusLabel = (status: OrderStatus) => {
	switch (status) {
		case 'PENDING':
			return 'Ожидает оплаты'
		case 'SUCCEEDED':
			return 'Оплачен'
		case 'CANCELLED':
			return 'Отменен'
		default:
			return status
	}
}
