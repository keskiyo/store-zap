'use client'

import {
	FilterCheckbox,
	FilterCheckboxProps,
} from '@/components/features/catalog/filters/filter-checkbox'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Skeleton } from '@/components/ui'

type Item = FilterCheckboxProps

type Props = {
	title: string
	items: Item[]
	defaultItems: Item[]
	limit?: number
	searchInputPlaceholder?: string
	defaultValue?: string[]
	onClickCheckbox?: (id: string) => void
	className?: string
	selected?: Set<string>
	name?: string
	loading?: boolean
}

export const CheckboxFilterGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	selected,
	onClickCheckbox,
	className,
	name,
	loading,
}) => {
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')

	const list = showAll
		? items.filter(item =>
				item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
		  )
		: (defaultItems || items).slice(0, limit)

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
					))}

				<Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
			</div>
		)
	}

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						onChange={onChangeSearchInput}
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-none'
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						checked={selected?.has(item.value)}
						name={name}
					/>
				))}
			</div>
			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						className='text-[#ff9100] text-sm mt-3'
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? '⯅ Скрыть' : '⯆ Показать еще'}
					</button>
				</div>
			)}
		</div>
	)
}
