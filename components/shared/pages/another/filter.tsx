'use client'

import React from 'react'
import { CheckboxFilterGroup, RangeSlider, Title } from '@/components/shared/'
import { Button, Input } from '@/components/ui'
import {
	useQueryFilters,
	useBrands,
	useFilters,
	useCategoryId,
} from '@/hooks/index'

interface Props {
	className?: string
}

export const Filter: React.FC<Props> = ({ className }) => {
	const categoryId = useCategoryId()
	const { brands, loading } = useBrands(categoryId)
	const filters = useFilters()

	useQueryFilters(filters)

	const items = brands.map(item => ({
		value: String(item.id),
		text: item.name,
	}))
	const updatePrices = (prices: number[]) => {
		filters.setTempPrices('priceFrom', prices[0])
		filters.setTempPrices('priceTo', prices[1])
	}

	const handleApply = () => {
		filters.applyFilters()
	}

	const handleReset = () => {
		filters.resetFilters()
	}

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bolt' />

			<div className='mt-5 border-y border-y-neutral-300 py-6 pd-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={5000}
						value={String(filters.tempPrices.priceFrom || '')}
						onChange={e =>
							filters.setTempPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						placeholder='5000'
						min={100}
						max={5000}
						value={String(filters.tempPrices.priceTo || '')}
						onChange={e =>
							filters.setTempPrices('priceTo', Number(e.target.value))
						}
					/>
				</div>
				<RangeSlider
					min={0}
					max={5000}
					step={10}
					value={[
						filters.tempPrices.priceFrom || 0,
						filters.tempPrices.priceTo || 5000,
					]}
					onValueChange={updatePrices}
				/>
			</div>

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
			<div className='mt-5 border-t border-y-neutral-300 py-6 pd-7'>
				<div className='flex justify-center gap-4 px-4'>
					<Button
						onClick={handleApply}
						className='bg-orange-500 hover:bg-orange-400 text-white border-orange-500 hover:border-orange-400 transition-colors cursor-pointer px-6 py-2'
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
