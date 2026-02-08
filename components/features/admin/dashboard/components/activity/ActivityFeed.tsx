'use client'

import { useDashboardActivity } from '@/hooks'
import { LowStockFeed } from './feed/LowStockFeed'
import { OrdersFeed } from './feed/OrdersFeed'
import { UsersFeed } from './feed/UsersFeed'

export function ActivityFeed() {
	const { data, loading, loadMoreOrders, loadMoreUsers, loadMoreLowStock } =
		useDashboardActivity()

	// Skeleton (Скелетон загрузки)
	if (loading) {
		return (
			<div className='bg-white rounded-2xl p-6 shadow-sm animate-pulse space-y-4'>
				<div className='h-6 w-40 bg-gray-200 rounded' />
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className='h-64 bg-gray-100 rounded-xl' />
					))}
				</div>
			</div>
		)
	}

	if (!data) return null

	return (
		<div className='bg-white rounded-2xl p-6 shadow-sm'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<OrdersFeed orders={data.orders} onLoadMore={loadMoreOrders} />
				<UsersFeed users={data.users} onLoadMore={loadMoreUsers} />
				<LowStockFeed
					lowStock={data.lowStock}
					onLoadMore={loadMoreLowStock}
				/>
			</div>
		</div>
	)
}
