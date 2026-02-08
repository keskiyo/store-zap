'use client'

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

type Props = {
	data?: { date: string; value: number }[]
}

export function RevenueChart({ data }: Props) {
	if (!data || data.length === 0) return null
	let total = 0

	const formatted = data.map(d => {
		total += d.value || 0

		return {
			date: new Date(d.date).toLocaleDateString(),
			revenue: total,
		}
	})

	return (
		<ResponsiveContainer width='100%' height={260}>
			<LineChart data={formatted}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' />
				<YAxis />
				<Tooltip
					formatter={(value?: number) => {
						if (typeof value !== 'number') return ''
						return `${value.toLocaleString()} ₽`
					}}
				/>
				<Line
					type='monotone'
					dataKey='revenue'
					stroke='#eb9c25'
					strokeWidth={3}
					dot={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default RevenueChart
