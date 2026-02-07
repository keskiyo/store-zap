'use client'

import { DashboardStats } from '@/types/admin/dashboard'
import { useEffect, useState } from 'react'

export function useDashboardStats(filters: any) {
	const [data, setData] = useState<DashboardStats | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)

		// Функция для получения дат в зависимости от фильтра
		const getDates = () => {
			const now = new Date()
			let from: Date | null = null
			const to = new Date(now.getTime() + 86400000) // +1 день (чтобы захватить весь сегодняшний день)

			if (filters.range === 'day') {
				from = new Date(now.setHours(0, 0, 0, 0)) // Начало сегодня
			} else if (filters.range === 'week') {
				const day = now.getDay() || 7 // 0 (Вс) -> 7
				if (day !== 1) now.setHours(-24 * (day - 1))
				from = new Date(now.setHours(0, 0, 0, 0)) // Начало недели (Пн)
			} else if (filters.range === 'month') {
				from = new Date(now.getFullYear(), now.getMonth(), 1) // Начало месяца
			} else {
				// 'all' - не ограничиваем
				from = null
			}

			return { from, to }
		}

		const { from, to } = getDates()

		// Формируем параметры запроса
		const params = new URLSearchParams()
		if (from) params.append('from', from.toISOString())
		if (to) params.append('to', to.toISOString())

		fetch(`/api/admin/dashboard/stats?${params.toString()}`)
			.then(r => r.json())
			.then(d => setData(d))
			.finally(() => setLoading(false))
	}, [filters.range])

	return { data, loading }
}

export function useDashboardCharts(filters: any) {
	const [data, setData] = useState<any>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)

		const getDates = () => {
			const now = new Date()
			let from: Date | null = null
			const to = new Date(now.getTime() + 86400000) // +1 день (чтобы захватить весь текущий день)

			if (filters.range === 'day') {
				from = new Date(now.setHours(0, 0, 0, 0)) // Начало сегодня
			} else if (filters.range === 'week') {
				const day = now.getDay() || 7 // 0 (Вс) -> 7
				if (day !== 1) now.setHours(-24 * (day - 1))
				from = new Date(now.setHours(0, 0, 0, 0)) // Начало недели (Пн)
			} else if (filters.range === 'month') {
				from = new Date(now.getFullYear(), now.getMonth(), 1) // Начало месяца
			} else {
				from = null
			}

			return { from, to }
		}

		const { from, to } = getDates()

		const params = new URLSearchParams()
		if (from) params.append('from', from.toISOString())
		if (to) params.append('to', to.toISOString())

		fetch(`/api/admin/dashboard/charts?${params.toString()}`)
			.then(r => r.json())
			.then(d => setData(d))
			.finally(() => setLoading(false))
	}, [filters.range])

	return { data, loading }
}

export function useDashboardActivity(filters: any) {
	const [orders, setOrders] = useState<any[]>([])
	const [users, setUsers] = useState<any[]>([])
	const [lowStock, setLowStock] = useState<any[]>([])

	const [ordersOffset, setOrdersOffset] = useState(0)
	const [usersOffset, setUsersOffset] = useState(0)
	const [lowStockOffset, setLowStockOffset] = useState(0)

	const [loading, setLoading] = useState(false)
	const [dataf, setData] = useState<any>(null)

	const load = async (type?: 'orders' | 'users' | 'lowStock') => {
		setLoading(true)

		const res = await fetch(
			`/api/admin/dashboard/activity?orders=5&users=5&lowStock=5` +
				`&ordersOffset=${type === 'orders' ? ordersOffset : 0}` +
				`&usersOffset=${type === 'users' ? usersOffset : 0}` +
				`&lowStockOffset=${type === 'lowStock' ? lowStockOffset : 0}`,
		)

		const data = await res.json()

		if (!type || type === 'orders') {
			setOrders(prev => [...prev, ...data.orders])
			setOrdersOffset(prev => prev + 5)
		}

		if (!type || type === 'users') {
			setUsers(prev => [...prev, ...data.users])
			setUsersOffset(prev => prev + 5)
		}

		if (!type || type === 'lowStock') {
			setLowStock(prev => [...prev, ...data.lowStock])
			setLowStockOffset(prev => prev + 5)
		}

		setLoading(false)
	}

	useEffect(() => {
		const params = new URLSearchParams(filters as any).toString()

		fetch(`/api/admin/dashboard/activity?${params}`)
			.then(r => r.json())
			.then(d => setData(d))
			.finally(() => setLoading(false))
	}, [JSON.stringify(filters)])

	useEffect(() => {
		load()
	}, [])

	return {
		data: { orders, users, lowStock },
		loadMoreOrders: () => load('orders'),
		loadMoreUsers: () => load('users'),
		loadMoreLowStock: () => load('lowStock'),
		loading,
		dataf,
	}
}
