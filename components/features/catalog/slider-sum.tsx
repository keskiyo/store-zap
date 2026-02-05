'use client'

import { RangeSlider } from '@/components/shared/'
import { Input } from '@/components/ui'
import React from 'react'

// 1. Добавляем интерфейс Props, который мы передаем из Filter.tsx
interface Props {
	className?: string
	priceFrom?: number
	priceTo?: number
	onChangePrice: (
		name: 'priceFrom' | 'priceTo',
		value: number | undefined,
	) => void
}

export const SliderSum: React.FC<Props> = ({
	className,
	priceFrom,
	priceTo,
	onChangePrice,
}) => {
	// 2. УБРАЛИ useFilters и useQueryFilters, чтобы избежать циклов и конфликтов
	// const filters = useFilters()
	// useQueryFilters(filters)

	const DEFAULT_MIN = 0
	const DEFAULT_MAX = 50000

	// 3. Используем пропсы вместо filters.tempPrices
	const displayPriceFrom =
		priceFrom !== undefined && priceFrom !== DEFAULT_MIN
			? String(priceFrom)
			: ''

	const displayPriceTo =
		priceTo !== undefined && priceTo !== DEFAULT_MAX ? String(priceTo) : ''

	const updatePrices = (prices: number[]) => {
		const [from, to] = prices
		// Передаем изменения наверх через пропс-функцию
		onChangePrice('priceFrom', from)
		onChangePrice('priceTo', to)
	}

	const handlePriceFromChange = (value: string) => {
		if (value === '') {
			// Если стерли значение - сбрасываем
			onChangePrice('priceFrom', undefined)
		} else {
			const numValue = Number(value)
			if (!isNaN(numValue)) {
				// Ограничиваем ввод максимальным значением
				const limitedValue = Math.min(numValue, DEFAULT_MAX)
				onChangePrice('priceFrom', limitedValue)
			}
		}
	}

	const handlePriceToChange = (value: string) => {
		if (value === '') {
			onChangePrice('priceTo', undefined)
		} else {
			const numValue = Number(value)
			if (!isNaN(numValue)) {
				const limitedValue = Math.min(numValue, DEFAULT_MAX)
				onChangePrice('priceTo', limitedValue)
			}
		}
	}

	const getSliderValues = (): [number, number] => {
		// Берем значения из пропсов, если их нет - используем дефолтные
		const from = priceFrom ?? DEFAULT_MIN
		const to = priceTo ?? DEFAULT_MAX
		return [from, to]
	}

	return (
		<div className={className}>
			<p className='font-bold mb-3'>Цена от и до:</p>
			<div className='flex gap-3 mb-5'>
				<div className='relative w-full'>
					<Input
						type='number'
						min={DEFAULT_MIN}
						max={DEFAULT_MAX}
						value={displayPriceFrom}
						onChange={e => handlePriceFromChange(e.target.value)}
						className='peer'
					/>
					{displayPriceFrom === '' && (
						<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none peer-focus:hidden'>
							{priceFrom?.toString() || '0'}
						</span>
					)}
				</div>

				<div className='relative w-full'>
					<Input
						type='number'
						min={DEFAULT_MIN}
						max={DEFAULT_MAX}
						value={displayPriceTo}
						onChange={e => handlePriceToChange(e.target.value)}
						className='peer'
					/>
					{displayPriceTo === '' && (
						<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none peer-focus:hidden'>
							{priceTo?.toString() || '50000'}
						</span>
					)}
				</div>
			</div>
			<RangeSlider
				min={DEFAULT_MIN}
				max={DEFAULT_MAX}
				step={10}
				value={getSliderValues()}
				onValueChange={updatePrices}
			/>
		</div>
	)
}
