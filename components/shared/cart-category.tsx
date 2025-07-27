import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import { Title } from '@/components/shared'
import { CategoryItem } from '@/components/shared'
import { categoriesData, CategoryCard } from '@/components/data/categories'

interface Props {
	className?: string
	categories?: CategoryCard[]
}

export const CartCategory: React.FC<Props> = ({
	className,
	categories = categoriesData,
}) => {
	return (
		<div className={cn('container mx-auto px-4 py-8', className)}>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{categories.map(category => (
					<CategoryItem key={category.id} category={category} />
				))}
			</div>
		</div>
	)
}
