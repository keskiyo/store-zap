'use client'

import { useDashboardFilters } from '@/hooks'

export function ResetFilters() {
	const { resetFilters } = useDashboardFilters()

	return (
		<button
			onClick={resetFilters}
			className='px-4 py-2 rounded-lg border text-sm hover:bg-red-50 hover:border-red-300'
		>
			Reset
		</button>
	)
}
