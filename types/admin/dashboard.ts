export type DashboardStats = {
	revenue: number
	orders: number
	users: number
	carts: number
	conversionRate: number
	aov: number
	lowStock: {
		id: number
		name: string
		count: number
	}[]
	newUsers: number
}

export type RevenueByDay = {
	createdAt: string
	_sum: {
		totalAmount: number
	}
}

export type OrdersByStatus = {
	status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED'
	_count: {
		_all: number
	}
}

export type UserGrowth = {
	createdAt: string
	_count: {
		_all: number
	}
}

export type CategoryPerformance = {
	name: string
	products: number
	stock: number
}

export type TopProduct = {
	id: number
	name: string
	sold: number
	revenue: number
}

export type DashboardCharts = {
	revenueByDay: RevenueByDay[]
	ordersByStatus: OrdersByStatus[]
	userGrowth: UserGrowth[]
	categoryPerformance: CategoryPerformance[]
	topProducts: TopProduct[]
}

export type ActivityData = {
	recentOrders: {
		id: number
		totalAmount: number
		status: string
		createdAt: string
		name: string
	}[]
	newUsers: {
		id: number
		name: string
		email: string
		createdAt: string
	}[]
	lowStock: {
		id: number
		name: string
		count: number
	}[]
}
