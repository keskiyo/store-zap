import React from 'react'
import { cn } from '@/lib/utils'
import { TopKatalog } from '@/components/shared'
import { CategoriesGroupList } from '@/components/shared/pages/categories/categories-group-list'

interface Props {
	className?: string
}

export const Categories: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<TopKatalog />
			<CategoriesGroupList
				categories={[
					{
						id: 8,
						name: 'Аксессуары',
						imageUrl: '/tovars/forCatalog/trinket.jpg',
					},
				]}
			/>
		</div>
	)
}
