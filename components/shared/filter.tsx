import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import {
	CheckboxFilterGroup,
	FilterCheckbox,
	RangeSlider,
	Title,
} from '@/components/shared/'
import { Input } from '@/components/ui'

interface Props {
	className?: string
}

export const Filter: React.FC<Props> = ({ className }) => {
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
						max={10000}
						defaultValue={0}
					/>
					<Input type='number' placeholder='10000' min={100} max={10000} />
				</div>
				<RangeSlider min={0} max={10000} step={1} value={[0, 10000]} />
			</div>

			<div className='flex flex-col gap-4'>
				<CheckboxFilterGroup
					title='По производителю:'
					className='mt-3'
					items={[
						{ value: '1', text: 'Trial' },
						{ value: '2', text: 'Лада Деталь' },
						{ value: '3', text: 'GSP' },
						{ value: '4', text: 'Luzar' },
					]}
					limit={3}
					defaultItems={[
						{ value: '1', text: 'Trial' },
						{ value: '2', text: 'Лада Деталь' },
						{ value: '3', text: 'GSP' },
						{ value: '4', text: 'Luzar' },
					]}
				/>
				{/* <FilterCheckbox text='Trial' value='1' />
				<FilterCheckbox text='Лада Деталь' value='2' /> */}
			</div>
		</div>
	)
}
