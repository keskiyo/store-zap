'use client'

import { CheckboxFilterGroup, SliderSum, Title } from '@/components/shared/'
import { Button } from '@/components/ui'
import { useBrands, useCategoryId, useFilters } from '@/hooks/index'
import React from 'react'

type PriceKeys = 'priceFrom' | 'priceTo'

interface Props {
	className?: string
}

export const Filter: React.FC<Props> = ({ className }) => {
	const categoryId = useCategoryId()
	const { brands, loading } = useBrands(categoryId)
	const filters = useFilters()

	const numericCategoryId = categoryId ? Number(categoryId) : undefined

	const items = brands.map(item => ({
		value: item.name,
		text: item.name,
	}))

	// Обработчик для кнопки "Применить"
	const handleApply = () => {
		filters.applyFilters(numericCategoryId)
	}

	// Обработчик для кнопки "Сбросить"
	const handleReset = () => {
		filters.resetFilters(numericCategoryId)
	}

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<SliderSum
				className='mt-5 border-y border-y-neutral-300 py-6 pb-7'
				priceFrom={filters.tempPrices.priceFrom}
				priceTo={filters.tempPrices.priceTo}
				onChangePrice={(name: PriceKeys, value: number | undefined) =>
					filters.setTempPrices(name, value)
				}
			/>

			<div className='flex flex-col gap-4'>
				<CheckboxFilterGroup
					title='По производителю:'
					className='mt-3'
					items={items}
					limit={5}
					defaultItems={items.slice(0, 5)}
					name='brands'
					loading={loading}
					onClickCheckbox={filters.setTempSelectedBrands}
					selected={filters.tempSelectedBrands}
				/>
			</div>

			<div className='mt-5 border-t border-y-neutral-300 py-6 pb-7'>
				<div className='flex justify-center gap-4 px-4'>
					<Button
						onClick={handleApply}
						className='bg-orange-500 hover:bg-orange-400 border-orange-500 hover:border-orange-400 text-white transition-colors cursor-pointer px-6 py-2'
					>
						Применить
					</Button>
					<Button
						onClick={handleReset}
						variant='outline'
						className='border-gray-300 hover:border-orange-500 hover:text-orange-500 text-gray-700 transition-colors cursor-pointer px-6 py-2'
					>
						Сбросить
					</Button>
				</div>
			</div>
		</div>
	)
}
