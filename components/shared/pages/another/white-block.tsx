import React from 'react'
import { cn } from '@/lib/utils'
import { Title } from './title'

interface Props {
	className?: string
	title?: string
	contentClassName?: string
	endAdornment?: React.ReactNode
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	children,
	title,
	endAdornment,
	contentClassName,
}) => {
	return (
		<div className={cn('bg-white rounded-3xl', className)}>
			{title && (
				<div className='flex items-center justify-center p-5 px-7 border-b border-gray-100'>
					<Title text={title} size='sm' className='font-bold' />
					{endAdornment}
				</div>
			)}

			<div className={cn('px-5 py-4', contentClassName)}>{children}</div>
		</div>
	)
}
