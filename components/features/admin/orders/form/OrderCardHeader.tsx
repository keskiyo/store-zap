import { Order } from './types'
import { formatDate, getStatusColor, getStatusLabel } from './utils'

interface Props {
	order: Order
	isExpanded: boolean
	onToggle: () => void
}

export const OrderCardHeader = ({ order, isExpanded, onToggle }: Props) => {
	return (
		<div
			className='bg-gray-50 p-4 flex flex-col md:flex-row justify-between md:items-center cursor-pointer hover:bg-gray-100 transition gap-4'
			onClick={onToggle}
		>
			<div className='flex flex-col'>
				<div className='flex items-center gap-2 mb-1'>
					<span className='font-bold text-lg'>Заказ #{order.id}</span>
					<span
						className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(
							order.status,
						)}`}
					>
						{getStatusLabel(order.status)}
					</span>
				</div>
				<span className='text-sm text-gray-600'>
					{order.name} ({order.email})
				</span>
				<span className='text-xs text-gray-400 mt-1'>
					{formatDate(order.createdAt)}
				</span>
			</div>

			<div className='flex items-center gap-6 self-end md:self-auto'>
				<div className='text-right'>
					<div className='text-sm text-gray-500'>Сумма</div>
					<div className='font-bold text-lg'>
						{order.totalAmount} ₽
					</div>
				</div>
				<span className='text-gray-400 text-2xl font-light ml-2'>
					{isExpanded ? '−' : '+'}
				</span>
			</div>
		</div>
	)
}
