'use client'

import { useDashboardFilters } from '@/hooks'
import { OrderStatus } from '@prisma/client'

export function StatusFilter() {
	const { filters, setFilter } = useDashboardFilters()

	return (
		<select
			value={filters.status}
			onChange={e => setFilter('status', e.target.value)}
			className='px-3 py-2 border rounded-lg text-sm'
		>
			<option value='ALL'>All statuses</option>
			<option value={OrderStatus.PENDING}>Pending</option>
			<option value={OrderStatus.SUCCEEDED}>Succeeded</option>
			<option value={OrderStatus.CANCELLED}>Cancelled</option>
		</select>
	)
}
