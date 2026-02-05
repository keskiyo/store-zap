'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { OrderCardHeader } from './form/OrderCardHeader'
import { OrderDetails } from './form/OrderDetails'
import { AdminOrdersProps, Order } from './form/types'

export const AdminOrders: React.FC<AdminOrdersProps> = ({ className }) => {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)
	const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)
	const [updatingId, setUpdatingId] = useState<number | null>(null)

	// Загрузка данных
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true)
				const res = await fetch('/api/admin/orders')
				if (!res.ok) throw new Error('Failed to fetch')

				// Теперь мы можем сразу использовать данные, так как API их починил
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

	// Actions
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

	// Render
	if (loading) {
		return (
			<div className={`p-6 text-center ${className}`}>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
			</div>
		)
	}

	return (
		<div
			className={`container mx-auto bg-white p-6 rounded-lg shadow ${className}`}
		>
			<h1 className='text-2xl font-bold mb-6'>Управление заказами</h1>

			{orders.length === 0 ? (
				<p className='text-gray-500 text-center py-10'>
					Заказов пока нет
				</p>
			) : (
				<div className='space-y-4'>
					{orders.map(order => (
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

//TODO Добавить поиск по номеру заказа ФИО или email или дате, так же добавить возможность фильтровать по статусу, убыванию, возрастанию, по сумме, по дате
