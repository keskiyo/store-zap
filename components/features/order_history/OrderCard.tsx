import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card-history'
import { OrderHistoryData, OrderHistoryItem } from '@/types'
import { MapPin, Package } from 'lucide-react'
import { StatusBadge } from './StatusBadge'

interface OrderCardProps {
	order: OrderHistoryData
}

export function OrderCard({ order }: OrderCardProps) {
	return (
		<Card className='border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
			<CardContent className='p-0'>
				{/* Header Card */}
				<div className='bg-white p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
					<div className='flex items-center gap-2'>
						<Package className='w-5 h-5 text-orange-500' />
						<span className='font-bold text-gray-900'>
							{order.id}
						</span>
						<StatusBadge status={order.status} />
					</div>
					<span className='text-sm text-gray-500'>{order.date}</span>
				</div>

				{/* Body Card */}
				<div className='p-4 space-y-4'>
					{/* Address */}
					<div className='flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg'>
						<MapPin className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' />
						<span className='break-words'>{order.address}</span>
					</div>

					{/* Items List */}
					<div className='space-y-2'>
						{order.items.map(
							(item: OrderHistoryItem, idx: number) => (
								<div
									key={idx}
									className='flex justify-between items-center text-sm'
								>
									{item.imageUrl && (
										<img
											src={item.imageUrl}
											alt={item.name}
											className='w-16 h-16 object-contain p-1'
										/>
									)}
									<span className='text-gray-700 font-medium pr-2'>
										{item.name}
									</span>
									<span className='text-gray-900 font-semibold whitespace-nowrap'>
										{item.price.toLocaleString()} ₽
									</span>
								</div>
							),
						)}
					</div>

					{/* Totals */}
					<div className='pt-2 border-t border-dashed border-gray-200 space-y-1'>
						{order.deliveryFee !== undefined && (
							<div className='flex justify-between text-sm text-gray-500'>
								<span>Доставка</span>
								<span>120 ₽</span>
							</div>
						)}
						<div className='flex justify-between items-center pt-2'>
							<span className='font-bold text-gray-900 text-lg'>
								Итого
							</span>
							<span className='font-bold text-gray-900 text-xl'>
								{order.total.toLocaleString()} ₽
							</span>
						</div>
					</div>
				</div>

				{/* Footer / Action */}
				<div className='p-4 bg-gray-50/50'>
					{order.status === 'completed' && (
						<Button className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-sm shadow-red-200 transition-all active:scale-[0.98]'>
							Повторить заказ
						</Button>
					)}
					{order.status === 'canceled' && (
						<div className='w-full text-gray-400 cursor-not-allowed border border-dashed rounded-lg py-3 text-center'>
							Заказ отменён
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
