'use client'

import {
	FilterCheckbox,
	FilterCheckboxProps,
} from '@/components/shared/filter-checkbox'
import React from 'react'

type Item = FilterCheckboxProps

type Props = {
	title: string
	items: Item[]
	defaultItems: Item[]
	limit?: number
	searchInputPlaceholder?: string
	onChange?: (values: string[]) => void
	defaultValue?: string[]
	className?: string
}

export const CheckboxFilterGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 3,
	searchInputPlaceholder = 'Поиск...',
	onChange,
	defaultValue,
	className,
}) => {
	const [showALL, setShowAll] = React.useState(false)

	const list = showALL ? items : defaultItems?.slice(0, limit)

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox
						onCheckedChange={asd => console.log(asd)}
						checked={false}
						key={index}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
					/>
				))}
			</div>
			{items.length > limit && (
				<div className={showALL ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						className='text-[#ff9100] text-sm mt-4'
						onClick={() => setShowAll(!showALL)}
					>
						{showALL ? '⯅ Скрыть' : '⯆ Показать еще'}
					</button>
				</div>
			)}
		</div>
	)
}
