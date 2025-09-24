import React from 'react'
import { cn } from '@/lib/utils'
import { SearchInput, CartButton } from '@/components/shared/index'

interface Props {
	className?: string
}

export const TopKatalog: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn('flex items-center justify-between mt-6 w-full', className)}
		>
			<div className='hidden md:flex flex-1 mx-2'>
				<SearchInput className='w-full' />
			</div>

			<div>
				<CartButton />
			</div>
		</div>
	)
}
