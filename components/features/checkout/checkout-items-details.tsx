import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
	className?: string
	title?: React.ReactNode
	value?: React.ReactNode
}

export const CheckoutItemsDetails: React.FC<Props> = ({
	className,
	title,
	value,
}) => {
	return (
		<div className={cn('flex mp-4', className)}>
			<span className='flex flex-1 text-base text-neutral-500 '>
				{title}
				<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
			</span>

			<span className='font-bold text-base'> {value} </span>
		</div>
	)
}
