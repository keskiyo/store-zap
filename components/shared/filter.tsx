import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import { FilterCheckbox, Title } from '@/components/shared/'

interface Props {
	className?: string
}

export const Filter: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bolt' />

			<div className='flex flex-col gap-4'>
				<FilterCheckbox text='Текст' value='1' />
				<FilterCheckbox text='Текст два' value='2' />
			</div>
		</div>
	)
}
