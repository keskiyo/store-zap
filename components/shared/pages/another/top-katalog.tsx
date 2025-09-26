import React from 'react'
import { cn } from '@/lib/utils'
import { SearchInput, CartButton } from '@/components/shared/index'

interface Props {
	className?: string
}

export const TopKatalog: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex items-center gap-2 w-full', className)}>
			<SearchInput />

			<div className='flex-shrink-0'>
				<CartButton />
			</div>
		</div>
	)
}
