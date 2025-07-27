import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import { Input } from '../ui'
import { Button } from '../ui'
import { ArrowBigRight, Search, ShoppingCart } from 'lucide-react'

interface Props {
	className?: string
}

export const TopKatalog: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex items-center justify-between gap-8', className)}>
			<Input
				className='w-225 font-style: italic'
				type='text'
				placeholder='Искать на сайте ...'
			></Input>

			<Button
				variant='outline'
				className='flex items-center gap-1 border hover:border-[#ff9100] group transition-colors duration-200 cursor-pointer'
			>
				<Search
					size={16}
					className='group-hover:text-[#ff9100] transition-colors'
				/>
				<span className='group-hover:text-[#ff9100] transition-colors'>
					Поиск
				</span>
			</Button>

			<div>
				<Button
					className='
      group 
      relative 
      flex items-center 
      bg-[#ff9100] text-white 
      px-4 py-2 
      rounded-md 
			cursor-pointer
      overflow-hidden 
      transition-all duration-300
      hover:bg-[#ff9100]/90
      hover:shadow-md
    '
					variant='outline'
				>
					<span className='font-semibold'>520 ₽</span>
					<span className='h-full w-[1px] bg-white/30 mx-3' />
					<div className='flex items-center gap-2 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-4'>
						<ShoppingCart size={16} strokeWidth={2} />
						<span className='font-semibold'>3</span>
					</div>

					<ArrowBigRight
						size={23}
						className='
        absolute right-4
        transition-all duration-300 
        opacity-0 group-hover:opacity-100
        translate-x-4 group-hover:translate-x-0
      '
					/>
				</Button>
			</div>
		</div>
	)
}
