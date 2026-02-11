import { OrderStatus } from '@/types'

interface StatusBadgeProps {
	status: OrderStatus
}

const statusColors: Record<OrderStatus, string> = {
	completed: 'bg-green-100 text-green-700',
	processing: 'bg-yellow-100 text-yellow-700',
	canceled: 'bg-red-100 text-red-700',
}

const statusLabels: Record<OrderStatus, string> = {
	completed: 'Завершён',
	processing: 'В процессе',
	canceled: 'Отменён',
}

export function StatusBadge({ status }: StatusBadgeProps) {
	return (
		<span
			className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColors[status]}`}
		>
			{statusLabels[status]}
		</span>
	)
}
