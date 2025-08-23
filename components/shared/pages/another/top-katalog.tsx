import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../../../ui'
import { ArrowBigRight, Search, ShoppingCart } from 'lucide-react'
import { SearchInput } from '@/components/shared/pages/another/search-input'

interface Props {
	className?: string
}

export const TopKatalog: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex items-center justify-between', className)}>
			<SearchInput />

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
