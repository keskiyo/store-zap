'use client'

import { CategoryFilter } from './CategoryFilter'
import { DateRangeFilter } from './DateRangeFilter'
import { ResetFilters } from './ResetFilters'
import { StatusFilter } from './StatusFilter'

export function DashboardFilterBar() {
	return (
		<div className='flex flex-wrap gap-3 items-center p-4 bg-white rounded-xl shadow-sm border'>
			<DateRangeFilter />
			<StatusFilter />
			<CategoryFilter />
			<div className='ml-auto'>
				<ResetFilters />
			</div>
		</div>
	)
}
