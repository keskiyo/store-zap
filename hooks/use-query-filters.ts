import { useRouter } from 'next/navigation'
import qs from 'qs'
import React from 'react'
import { Filters } from './use-filters'

interface QueryFiltersProps {
	filters: Filters
	categoryId?: string | number
}

export const useQueryFilters = ({ filters, categoryId }: QueryFiltersProps) => {
	const router = useRouter()

	const isMounted = React.useRef(false)

	React.useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true
			return
		}

		const newParams = {
			...(categoryId && { categoryId }),
			...filters.prices,
			brands:
				Array.from(filters.selectedBrands).length > 0
					? Array.from(filters.selectedBrands)
					: undefined,
		}

		const queryStr = qs.stringify(newParams, {
			arrayFormat: 'comma',
			skipNulls: true,
		})

		router.push(queryStr ? `?${queryStr}` : '', {
			scroll: false,
		})
	}, [filters, categoryId, router])
}
