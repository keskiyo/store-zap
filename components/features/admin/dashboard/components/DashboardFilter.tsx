import type { DashboardFilters } from '@/types/admin/dashboard'

type Props = {
	filters: DashboardFilters
	onChange: (filters: DashboardFilters) => void
}

export function DashboardFilters({ filters, onChange }: Props) {
	return (
		<div className='bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-wrap gap-3 justify-between'>
			<select
				value={filters.range}
				onChange={e =>
					onChange({
						...filters,
						range: e.target.value as DashboardFilters['range'],
					})
				}
				className='px-3 py-2 border rounded-lg text-sm'
			>
				<option value='all'>За всё время</option>
				<option value='month'>Этот месяц</option>
				<option value='week'>Эта неделя</option>
				<option value='day'>Сегодня</option>
			</select>
		</div>
	)
}
