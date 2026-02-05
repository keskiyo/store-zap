export type OrderStatus = 'PENDING' | 'SUCCEEDED' | 'CANCELLED'

export type OrderItem = {
	name: string
	price: number
	count: number
	imageUrl?: string
}

export type Order = {
	id: number
	token: string
	totalAmount: number
	status: OrderStatus
	name: string
	email: string
	phone: string
	address: string
	comment: string | null
	items: OrderItem[]
	createdAt: string
}

export interface AdminOrdersProps {
	className?: string
}
