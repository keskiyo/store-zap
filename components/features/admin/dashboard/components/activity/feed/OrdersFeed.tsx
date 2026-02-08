import { ShoppingCart } from 'lucide-react'
import { ActivityCard } from '../ActivityCard'
import { EmptyState } from '../EmptyState'
import { StatusBadge } from '../StatusBadge'

type Props = {
	orders: any[]
	onLoadMore: () => void
}

export function OrdersFeed({ orders, onLoadMore }: Props) {
	return (
		<ActivityCard
			title='Новые заказы'
			icon={<ShoppingCart className='w-5 h-5' />}
		>
			{orders.length === 0 && <EmptyState text='Нет новых заказов' />}

			{orders.map(order => (
				<div
					key={order.id}
					className='flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition'
				>
					<div>
						<p className='font-medium text-gray-800'>
							#{order.id} · {order.totalAmount}₽
						</p>
						<p className='text-xs text-gray-400'>{order.email}</p>
					</div>
					<StatusBadge status={order.status} />
				</div>
			))}

			<button
				onClick={onLoadMore}
				className='w-full mt-3 py-2 rounded-xl border text-sm text-gray-600 hover:bg-gray-50 transition'
			>
				Загрузить больше
			</button>
		</ActivityCard>
	)
}
