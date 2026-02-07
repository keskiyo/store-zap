'use client'

import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const CATEGORY_COLORS = [
	'#16a34a',
	'#2563eb',
	'#dc2626',
	'#f59e0b',
	'#8b5cf6',
	'#ec4899',
	'#0891b2',
	'#12d9e7',
	'#12e7b2',
]

type Props = {
	data?: any[]
}

export function CategoryChart({ data }: Props) {
	const formatted = data
		?.filter(d => d.count > 0)
		.map((d, index) => ({
			name: d.name,
			products: d.count,
			fill: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
		}))

	return (
		<ResponsiveContainer width='100%' height={260}>
			<BarChart data={formatted} barSize={60}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis
					dataKey='name'
					height={50}
					interval={0}
					tick={({ x, y, payload }) => {
						const parts = payload.value.split(' ')
						const firstLine = parts[0]
						const secondLine = parts.slice(1).join(' ')

						return (
							<g
								transform={`translate(${x},${y}) rotate(-45) translate(0, -40)`}
							>
								{/* Первая строка */}
								<text
									x={0}
									y={0}
									dy={30}
									textAnchor='middle'
									fontSize={12}
									fill='#292929'
								>
									{firstLine}
								</text>

								{/* Вторая строка */}
								{secondLine && (
									<text
										x={0}
										y={0}
										dy={46}
										textAnchor='middle'
										fontSize={12}
										fill='#292929'
									>
										{secondLine}
									</text>
								)}
							</g>
						)
					}}
				/>
				<YAxis />
				<Tooltip />
				<Bar dataKey='products' label={{ position: 'top' }} />
			</BarChart>
		</ResponsiveContainer>
	)
}
