import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import React from 'react'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

export interface Filters {
	selectedBrands: Set<string>
	prices: PriceProps
}

interface ReturnProps extends Filters {
	tempSelectedBrands: Set<string>
	tempPrices: PriceProps
	setTempPrices: (name: keyof PriceProps, value: number) => void
	setTempSelectedBrands: (value: string) => void
	applyFilters: () => void
	resetFilters: () => void
	syncFiltersFromUrl: () => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	// Примененные фильтры (из URL)
	const [appliedSelectedBrands, setAppliedSelectedBrands] = React.useState<
		Set<string>
	>(new Set(searchParams.get('brands')?.split(',')))
	const [appliedPrices, setAppliedPrices] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	// Временные фильтры (для формы)
	const [tempSelectedBrands, setTempSelectedBrands] = React.useState<
		Set<string>
	>(new Set(searchParams.get('brands')?.split(',')))
	const [tempPrices, setTempPrices] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	// Функция для переключения брендов во временном состоянии
	const setTempSelectedBrandsHandler = (value: string) => {
		setTempSelectedBrands(prev => {
			const newSet = new Set(prev)
			if (newSet.has(value)) {
				newSet.delete(value)
			} else {
				newSet.add(value)
			}
			return newSet
		})
	}

	// Синхронизация при изменении URL
	const syncFiltersFromUrl = React.useCallback(() => {
		const brandsFromUrl =
			searchParams.get('brands')?.split(',').filter(Boolean) || []
		const priceFromFromUrl = Number(searchParams.get('priceFrom')) || undefined
		const priceToFromUrl = Number(searchParams.get('priceTo')) || undefined

		setAppliedSelectedBrands(new Set(brandsFromUrl))
		setAppliedPrices({
			priceFrom: priceFromFromUrl,
			priceTo: priceToFromUrl,
		})

		setTempPrices({
			priceFrom: priceFromFromUrl,
			priceTo: priceToFromUrl,
		})
		setTempSelectedBrands(new Set(brandsFromUrl))
	}, [searchParams])

	React.useEffect(() => {
		syncFiltersFromUrl()
	}, [searchParams])

	const updateTempPrice = (name: keyof PriceProps, value: number) => {
		setTempPrices(prev => ({
			...prev,
			[name]: value === 0 ? undefined : value,
		}))
	}

	const applyFilters = () => {
		const params = new URLSearchParams()

		// Добавляем бренды
		if (tempSelectedBrands.size > 0) {
			params.set('brands', Array.from(tempSelectedBrands).join(','))
		}

		// Добавляем цены
		if (tempPrices.priceFrom && tempPrices.priceFrom > 0) {
			params.set('priceFrom', tempPrices.priceFrom.toString())
		}

		if (tempPrices.priceTo && tempPrices.priceTo > 0) {
			params.set('priceTo', tempPrices.priceTo.toString())
		}

		// Обновляем URL
		router.push(`${pathname}?${params.toString()}`)
	}

	const resetFilters = () => {
		// Сбрасываем временные фильтры
		setTempPrices({
			priceFrom: undefined,
			priceTo: undefined,
		})
		setTempSelectedBrands(new Set())

		// Очищаем URL
		router.push(pathname)
		router.refresh()
	}

	return React.useMemo(
		() => ({
			selectedBrands: appliedSelectedBrands,
			setTempSelectedBrands: setTempSelectedBrandsHandler,
			prices: appliedPrices,
			setTempPrices: updateTempPrice,
			tempSelectedBrands,
			tempPrices,
			applyFilters,
			resetFilters,
			syncFiltersFromUrl,
		}),
		[
			appliedSelectedBrands,
			appliedPrices,
			tempSelectedBrands,
			tempPrices,
			pathname,
		]
	)
}
