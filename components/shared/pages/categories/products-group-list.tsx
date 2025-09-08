import { Title, TovarItem, TovarList } from '@/components/shared'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
	products: any[]
	className?: string
	listClassName?: string
	categoryId: number
}

export const ProductsGroupList: React.FC<Props> = ({
	className,
	products,
	listClassName,
	categoryId,
}) => {
	return (
		<div className={className}>
			<TovarList
				items={products}
				className={cn('gap-4 md:gap-6', listClassName)}
			/>
		</div>
	)
}
