import { Order } from '../../../../../types/admin/orders'

interface Props {
	order: Order
	onSave: (orderId: number, text: string) => void
	isUpdating: boolean
}

export const AdminCommentArea = ({ order, onSave, isUpdating }: Props) => {
	return (
		<div className='bg-yellow-200 p-4 rounded border border-yellow-100 h-full flex flex-col'>
			<label className='block font-bold text-sm text-yellow-800 mb-2'>
				Заметки администратора:
			</label>
			<textarea
				className='w-full p-2 border border-yellow-800 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-grow'
				defaultValue={order.comment || ''}
				onBlur={e => onSave(order.id, e.target.value)}
				placeholder='Внутренние заметки к заказу...'
				disabled={isUpdating}
			></textarea>
			<p className='text-xs text-yellow-600 mt-2 text-right'>
				* Сохраняется при потере фокуса
			</p>
		</div>
	)
}
