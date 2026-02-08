import { AlertTriangle } from 'lucide-react'
import { ActivityCard } from '../ActivityCard'
import { EmptyState } from '../EmptyState'

type Props = {
	lowStock: any[]
	onLoadMore: () => void
}

export function LowStockFeed({ lowStock, onLoadMore }: Props) {
	return (
		<ActivityCard
			title='Товаров меньше 5'
			icon={<AlertTriangle className='w-5 h-5 text-red-500' />}
		>
			{lowStock.length === 0 && (
				<EmptyState text='Всех товаров больше 5 ✅' />
			)}

			{lowStock.map(p => (
				<div
					key={p.id}
					className='flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition'
				>
					<div>
						<p className='font-medium text-gray-800'>{p.name}</p>
						<p className='text-xs text-gray-400'>{p.article}</p>
					</div>

					<span className='px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium'>
						{p.count} Осталось
					</span>
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
