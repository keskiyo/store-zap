'use client'

import { useDashboardActivity } from '@/hooks'
import { AlertTriangle, ShoppingCart, User } from 'lucide-react'

export function ActivityFeed() {
	const { data, loading, loadMoreOrders, loadMoreUsers, loadMoreLowStock } =
		useDashboardActivity()

	if (loading) {
		return (
			<div className='bg-white rounded-2xl p-6 shadow-sm animate-pulse space-y-4'>
				<div className='h-6 w-40 bg-gray-200 rounded' />
				<div className='h-24 bg-gray-100 rounded-xl' />
				<div className='h-24 bg-gray-100 rounded-xl' />
				<div className='h-24 bg-gray-100 rounded-xl' />
			</div>
		)
	}

	if (!data) return null

	return (
		<div className='bg-white rounded-2xl p-6 shadow-sm'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Orders */}
				<ActivityCard
					title='Новые заказы'
					icon={<ShoppingCart className='w-5 h-5' />}
				>
					{data.orders.length === 0 && (
						<EmptyState text='Нет новых заказов' />
					)}

					{data.orders.map(order => (
						<div
							key={order.id}
							className='flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition'
						>
							<div>
								<p className='font-medium text-gray-800'>
									#{order.id} · {order.totalAmount}₽
								</p>
								<p className='text-xs text-gray-400'>
									{order.email}
								</p>
							</div>

							<StatusBadge status={order.status} />
						</div>
					))}
					<button
						onClick={loadMoreOrders}
						className='w-full mt-3 py-2 rounded-xl border text-sm text-gray-600 hover:bg-gray-50 transition'
					>
						Загрузить больше
					</button>
				</ActivityCard>

				{/* Users */}
				<ActivityCard
					title='Новые пользователи'
					icon={<User className='w-5 h-5' />}
				>
					{data.users.length === 0 && (
						<EmptyState text='Нет новых пользователей' />
					)}

					{data.users.map(user => (
						<div
							key={user.id}
							className='flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition'
						>
							<div>
								<p className='font-medium text-gray-800'>
									{user.email}
								</p>
								<p className='text-xs text-gray-400'>
									{user.name}
								</p>
							</div>

							<span className='text-xs text-gray-400'>
								{new Date(user.createdAt).toLocaleDateString()}
							</span>
						</div>
					))}
					<button
						onClick={loadMoreUsers}
						className='w-full mt-3 py-2 rounded-xl border text-sm text-gray-600 hover:bg-gray-50 transition'
					>
						Загрузить больше
					</button>
				</ActivityCard>

				{/* Low Stock */}
				<ActivityCard
					title='Товаров меньше 5'
					icon={<AlertTriangle className='w-5 h-5 text-red-500' />}
				>
					{data.lowStock.length === 0 && (
						<EmptyState text='Всех товаров больше 5 ✅' />
					)}

					{data.lowStock.map(p => (
						<div
							key={p.id}
							className='flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition'
						>
							<div>
								<p className='font-medium text-gray-800'>
									{p.name}
								</p>
								<p className='text-xs text-gray-400'>
									{p.article}
								</p>
							</div>

							<span className='px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium'>
								{p.count} Осталось
							</span>
						</div>
					))}
					<button
						onClick={loadMoreLowStock}
						className='w-full mt-3 py-2 rounded-xl border text-sm text-gray-600 hover:bg-gray-50 transition'
					>
						Загрузить больше
					</button>
				</ActivityCard>
			</div>
		</div>
	)
}

/* ---------- UI Components ---------- */

function ActivityCard({
	title,
	icon,
	children,
}: {
	title: string
	icon: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<div className='border border-gray-100 rounded-2xl p-4'>
			<div className='flex items-center gap-2 mb-4 text-gray-700 font-semibold'>
				{icon}
				<span>{title}</span>
			</div>

			<div className='space-y-2'>{children}</div>
		</div>
	)
}

function StatusBadge({ status }: { status: string }) {
	const map: Record<string, string> = {
		SUCCEEDED: 'bg-green-100 text-green-600',
		PENDING: 'bg-yellow-100 text-yellow-600',
		CANCELLED: 'bg-red-100 text-red-600',
	}

	return (
		<span
			className={`px-2 py-1 text-xs rounded-full font-medium ${map[status] || 'bg-gray-100 text-gray-600'}`}
		>
			{status}
		</span>
	)
}

function EmptyState({ text }: { text: string }) {
	return (
		<div className='text-sm text-gray-400 italic p-3 text-center'>
			{text}
		</div>
	)
}
