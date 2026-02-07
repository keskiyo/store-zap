'use client'

import { useDashboardFilters } from '@/hooks'
import { useEffect, useState } from 'react'

type Category = {
	id: number
	name: string
}

export function CategoryFilter() {
	const { filters, setFilter } = useDashboardFilters()
	const [categories, setCategories] = useState<Category[]>([])

	useEffect(() => {
		fetch('/api/categories')
			.then(r => r.json())
			.then(setCategories)
	}, [])

	return (
		<select
			value={filters.category}
			onChange={e => setFilter('category', e.target.value)}
			className='px-3 py-2 border rounded-lg text-sm'
		>
			<option value='ALL'>All categories</option>
			{categories.map(c => (
				<option key={c.id} value={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}
