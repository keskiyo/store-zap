'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
	setTempPrices: (name: keyof PriceProps, value: number | undefined) => void
	setTempSelectedBrands: (value: string) => void
	applyFilters: (categoryId?: number) => void
	resetFilters: (categoryId?: number) => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	// Инициализация фильтров из URL (только при монтировании)
	const getInitialValues = React.useCallback(() => {
		const brands =
			searchParams.get('brands')?.split(',').filter(Boolean) || []
		return {
			brands: new Set(brands),
			prices: {
				priceFrom: Number(searchParams.get('priceFrom')) || undefined,
				priceTo: Number(searchParams.get('priceTo')) || undefined,
			},
		}
	}, [searchParams])

	// Состояния для формы (то, что сейчас выбрано, но еще не применено)
	const [tempSelectedBrands, setTempSelectedBrands] = React.useState<
		Set<string>
	>(getInitialValues().brands)
	const [tempPrices, setTempPrices] = React.useState<PriceProps>(
		getInitialValues().prices,
	)

	// Синхронизация с URL при изменении URL извне (например, при переходе "назад")
	React.useEffect(() => {
		const { brands, prices } = getInitialValues()
		setTempSelectedBrands(brands)
		setTempPrices(prices)
	}, [searchParams.toString()]) // Срабатывает только при реальном изменении URL

	// Обработчик чекбоксов
	const handleSetTempSelectedBrands = React.useCallback((value: string) => {
		setTempSelectedBrands(prev => {
			const newSet = new Set(prev)
			if (newSet.has(value)) {
				newSet.delete(value)
			} else {
				newSet.add(value)
			}
			return newSet
		})
	}, [])

	// Применить фильтры (отправка запроса)
	const applyFilters = React.useCallback(
		(categoryId?: number) => {
			const params = new URLSearchParams(searchParams.toString())

			// 1. Обработка брендов
			if (tempSelectedBrands.size > 0) {
				params.set('brands', Array.from(tempSelectedBrands).join(','))
			} else {
				params.delete('brands')
			}

			// 2. Обработка цен
			if (tempPrices.priceFrom)
				params.set('priceFrom', String(tempPrices.priceFrom))
			else params.delete('priceFrom')

			if (tempPrices.priceTo)
				params.set('priceTo', String(tempPrices.priceTo))
			else params.delete('priceTo')

			// 3. Обязательно добавляем categoryId, если он есть
			if (categoryId) {
				params.set('categoryId', String(categoryId))
			}

			// Обновляем URL
			router.push(`${pathname}?${params.toString()}`)
		},
		[tempSelectedBrands, tempPrices, pathname, router, searchParams],
	)

	// Сбросить фильтры
	const resetFilters = React.useCallback(
		(categoryId?: number) => {
			const params = new URLSearchParams()

			// При сбросе мы сохраняем только категорию, чтобы не улететь на главную
			if (categoryId) {
				params.set('categoryId', String(categoryId))
			}

			router.push(`${pathname}?${params.toString()}`)
		},
		[pathname, router],
	)

	return {
		selectedBrands: tempSelectedBrands, // Для совместимости с UI
		prices: tempPrices,
		tempSelectedBrands,
		tempPrices,
		setTempSelectedBrands: handleSetTempSelectedBrands,
		setTempPrices: (name, value) =>
			setTempPrices(prev => ({
				...prev,
				[name]: value === 0 ? undefined : value,
			})),
		applyFilters,
		resetFilters,
	}
}
