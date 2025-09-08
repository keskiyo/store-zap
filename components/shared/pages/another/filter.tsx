'use client'

import React from 'react'
import { CheckboxFilterGroup, RangeSlider, Title } from '@/components/shared/'
import { Input } from '@/components/ui'
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
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
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
						value={String(filters.prices.priceFrom)}
						onChange={e =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						placeholder='5000'
						min={100}
						max={5000}
						value={String(filters.prices.priceTo)}
						onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={5000}
					step={10}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 5000,
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
					onClickCheckbox={filters.setSelectedBrands}
					selected={filters.selectedBrands}
				/>
			</div>
		</div>
	)
}
