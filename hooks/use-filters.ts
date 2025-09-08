import { useSearchParams } from 'next/navigation'
import { useSet } from 'react-use'
import React from 'react'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	brands: string
}

export interface Filters {
	selectedBrands: Set<string>
	prices: PriceProps
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void
	setSelectedBrands: (value: string) => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>

	const [selectedBrands, { toggle: toggleBrands }] = useSet(
		new Set<string>(searchParams.get('brands')?.split(','))
	)

	const [prices, setPrices] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices(prev => ({
			...prev,
			[name]: value === 0 ? undefined : value,
		}))
	}

	return React.useMemo(
		() => ({
			selectedBrands,
			prices,
			setPrices: updatePrice,
			setSelectedBrands: toggleBrands,
		}),
		[selectedBrands, prices]
	)
}
