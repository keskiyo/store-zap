import { Title, CategoryItem } from '@/components/shared'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
	categories: any[]
	className?: string
	listClassName?: string
}

export const CategoriesGroupList: React.FC<Props> = ({
	className,
	categories,
	listClassName,
}) => {
	return (
		<div className={className}>
			<div className={cn('flex flex-col gap-16', listClassName)}>
				{categories.map((category, i) => (
					<CategoryItem
						key={category.id}
						id={category.id}
						name={category.name}
						imageUrl={category.imageUrl}
					/>
				))}
			</div>
		</div>
	)
}
