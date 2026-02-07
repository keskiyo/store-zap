'use client'

import { OrderStatus } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'

export type DashboardFilters = {
	from: string | null
	to: string | null
	status: OrderStatus | 'ALL'
	category: string | 'ALL'
}

export function useDashboardFilters() {
	const router = useRouter()
	const params = useSearchParams()

	const filters: DashboardFilters = {
		from: params.get('from'),
		to: params.get('to'),
		status: (params.get('status') as OrderStatus) || 'ALL',
		category: params.get('category') || 'ALL',
	}

	function setFilter(key: keyof DashboardFilters, value: string | null) {
		const newParams = new URLSearchParams(params.toString())

		if (!value || value === 'ALL') {
			newParams.delete(key)
		} else {
			newParams.set(key, value)
		}

		router.push(`?${newParams.toString()}`)
	}

	function resetFilters() {
		router.push(`/admin/dashboard`)
	}

	return {
		filters,
		setFilter,
		resetFilters,
	}
}
