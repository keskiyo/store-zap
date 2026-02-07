'use client'

import { useDashboardFilters } from '@/hooks'

const presets = [
	{ label: 'Today', value: 'today' },
	{ label: '7 days', value: '7' },
	{ label: '30 days', value: '30' },
]

export function DateRangeFilter() {
	const { setFilter } = useDashboardFilters()

	function applyPreset(days: string) {
		const to = new Date()
		const from = new Date()

		if (days === 'today') {
			from.setHours(0, 0, 0, 0)
		} else {
			from.setDate(to.getDate() - Number(days))
		}

		setFilter('from', from.toISOString())
		setFilter('to', to.toISOString())
	}

	return (
		<div className='flex gap-2'>
			{presets.map(p => (
				<button
					key={p.value}
					onClick={() => applyPreset(p.value)}
					className='px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-100'
				>
					{p.label}
				</button>
			))}
		</div>
	)
}
