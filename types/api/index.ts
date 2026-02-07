// API response types
export interface ApiResponse<T = any> {
	data: T
	status: number
	message?: string
}

// Auth types
export interface LoginRequest {
	email: string
	password: string
}

export interface RegisterRequest {
	email: string
	password: string
	fullName: string
}

// Cart types
export interface CartItem {
	id: number
	productId: number
	quantity: number
	price: number
}

// Product types
export interface Product {
	id: number
	name: string
	price: number
	description?: string
	imageUrl?: string
	categoryId: number
	brand: string
	article: string
}

// Category types
export interface Category {
	id: number
	name: string
	description?: string
	imageUrl?: string
}

// Order types
export interface Order {
	id: number
	userId?: number
	totalAmount: number
	status: string
	createdAt: Date
	items: OrderItem[]
}

export interface OrderItem {
	id: number
	orderId: number
	productId: number
	quantity: number
	price: number
}
