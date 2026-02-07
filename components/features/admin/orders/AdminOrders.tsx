'use client'

import { formatDate } from '@/hooks'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AdminOrdersProps, Order } from '../../../../types/admin/orders'
import { OrderCardHeader } from './form/OrderCardHeader'
import { OrderDetails } from './form/OrderDetails'
import { OrdersControlPanel } from './form/OrdersControlPanel'

export const AdminOrders: React.FC<AdminOrdersProps> = ({ className }) => {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)

	// State для фильтров
	const [searchQuery, setSearchQuery] = useState('')
	const [statusFilter, setStatusFilter] = useState<string>('ALL')
	const [sortBy, setSortBy] = useState<'date' | 'sum'>('date')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

	// State для UI
	const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)
	const [updatingId, setUpdatingId] = useState<number | null>(null)

	// Загрузка данных
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true)
				const res = await fetch('/api/admin/orders')
				if (!res.ok) throw new Error('Failed to fetch')
				const data: Order[] = await res.json()
				setOrders(data)
			} catch (e) {
				toast.error('Ошибка при загрузке заказов')
				console.error(e)
			} finally {
				setLoading(false)
			}
		}
		fetchOrders()
	}, [])

	// Логика фильтрации и сортировки
	const filteredAndSortedOrders = useMemo(() => {
		let result = [...orders]

		if (searchQuery) {
			const lowerQuery = searchQuery.toLowerCase()
			if (lowerQuery.startsWith('#')) {
				const idPart = lowerQuery.substring(1)
				const idToFind = parseInt(idPart, 10)

				if (!isNaN(idToFind)) {
					result = result.filter(order => order.id === idToFind)
				}
			} else {
				result = result.filter(order => {
					const nameMatch = order.name
						.toLowerCase()
						.includes(lowerQuery)
					const emailMatch = order.email
						.toLowerCase()
						.includes(lowerQuery)
					const dateMatch = formatDate(order.createdAt).includes(
						lowerQuery,
					)

					return nameMatch || emailMatch || dateMatch
				})
			}
		}

		if (statusFilter !== 'ALL') {
			result = result.filter(order => order.status === statusFilter)
		}

		result.sort((a, b) => {
			let comparison = 0
			if (sortBy === 'date') {
				comparison =
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime()
			} else if (sortBy === 'sum') {
				comparison = a.totalAmount - b.totalAmount
			}
			return sortOrder === 'asc' ? comparison : -comparison
		})

		return result
	}, [orders, searchQuery, statusFilter, sortBy, sortOrder])

	const toggleExpand = (id: number) => {
		setExpandedOrderId(prev => (prev === id ? null : id))
	}

	const handleCommentSave = async (orderId: number, text: string) => {
		setUpdatingId(orderId)
		try {
			const res = await fetch('/api/admin/orders', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: orderId, comment: text }),
			})
			if (!res.ok) throw new Error('Failed to update comment')
			setOrders(prev =>
				prev.map(order =>
					order.id === orderId ? { ...order, comment: text } : order,
				),
			)
			toast.success('Комментарий сохранен')
		} catch (e) {
			toast.error('Ошибка при сохранении комментария')
		} finally {
			setUpdatingId(null)
		}
	}

	if (loading) return <div className='p-6'>Загрузка...</div>

	return (
		<div
			className={`container mx-auto bg-white p-6 rounded-lg shadow ${className}`}
		>
			<h1 className='text-2xl font-bold text-gray-800'>
				Управление заказами
			</h1>

			<OrdersControlPanel
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				statusFilter={statusFilter}
				setStatusFilter={setStatusFilter}
				sortBy={sortBy}
				setSortBy={setSortBy}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
			/>

			{filteredAndSortedOrders.length === 0 ? (
				<p className='text-gray-500 text-center py-10'>
					{orders.length === 0
						? 'Заказов пока нет'
						: 'Ничего не найдено'}
				</p>
			) : (
				<div className='space-y-4'>
					{filteredAndSortedOrders.map(order => (
						<div
							key={order.id}
							className='border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition'
						>
							<OrderCardHeader
								order={order}
								isExpanded={expandedOrderId === order.id}
								onToggle={() => toggleExpand(order.id)}
							/>
							{expandedOrderId === order.id && (
								<OrderDetails
									order={order}
									onCommentSave={handleCommentSave}
									isUpdating={updatingId === order.id}
								/>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
