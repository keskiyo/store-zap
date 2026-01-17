import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import React from 'react'
import { Filters } from './use-filters'

interface QueryFiltersProps {
	filters: Filters
	categoryId?: string | number
}

export const useQueryFilters = ({ filters, categoryId }: QueryFiltersProps) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	// Реф, чтобы избежать лишних обновлений при первом рендере
	const isMounted = React.useRef(false)

	React.useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true
			return
		}

		// Подготавливаем новые параметры
		const newParams = {
			...(categoryId && { categoryId }), // Добавляем categoryId, если он есть
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

		// Обновляем URL без перезагрузки страницы
		router.push(queryStr ? `?${queryStr}` : '', {
			scroll: false,
		})
	}, [filters, categoryId, router])
}
