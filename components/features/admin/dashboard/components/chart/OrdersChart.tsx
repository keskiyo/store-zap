'use client'

import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const STATUS_COLORS: Record<string, string> = {
	SUCCEEDED: '#22c55e',
	PENDING: '#f59e0b',
	CANCELLED: '#ef4444',
}

const STATUS_LABELS: Record<string, string> = {
	SUCCEEDED: 'Оплачен',
	PENDING: 'Ожидает оплаты',
	CANCELLED: 'Отменен',
}

type Props = {
	data?: any[]
}

export function OrdersChart({ data }: Props) {
	const formatted = data?.map(d => ({
		name: STATUS_LABELS[d.status] || d.status,
		value: d.count,
		fill: STATUS_COLORS[d.status] || '#6b7280',
	}))

	return (
		<ResponsiveContainer width='100%' height={260}>
			<PieChart>
				<Pie
					data={formatted}
					dataKey='value'
					nameKey='name'
					cx='50%'
					cy='50%'
					outerRadius={90}
				></Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	)
}
