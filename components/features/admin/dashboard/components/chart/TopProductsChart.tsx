'use client'

import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'

const CATEGORY_COLOR_MAP: Record<number, string> = {
	1: '#16a34a',
	2: '#2563eb',
	3: '#dc2626',
	4: '#f59e0b',
	5: '#8b5cf6',
	6: '#ec4899',
	7: '#0891b2',
	8: '#12d9e7',
	9: '#12e7b2',
}

type Props = {
	data?: any[]
}

export function TopProductsChart({ data }: Props) {
	const getCategoryColor = (categoryid: number) => {
		return CATEGORY_COLOR_MAP[categoryid] || '#cbd5e1'
	}

	const formatted = data?.map(p => {
		const categoryIdNested = p.category?.id
		const categoryIdDirect = p.categoryId

		const categoryId = categoryIdNested || categoryIdDirect

		const idNumber = Number(categoryId)

		return {
			name: p.name.length > 25 ? p.name.substring(0, 25) + '...' : p.name,
			fullName: p.name,
			revenue: p.sold,
			fill: getCategoryColor(idNumber),
		}
	})

	const cellsColors = formatted?.map(entry => ({
		fill: entry.fill,
	}))

	return (
		<ResponsiveContainer width='100%' height={260}>
			<BarChart data={formatted} layout='vertical' barSize={20}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis type='number' tick={{ fontSize: 14 }} />
				<YAxis
					type='category'
					dataKey='name'
					width={150}
					tick={{ fontSize: 14 }}
				/>
				<Bar dataKey='revenue' {...({ cells: cellsColors } as any)} />
			</BarChart>
		</ResponsiveContainer>
	)
}
