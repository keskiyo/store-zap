import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import { TopKatalog } from '@/components/shared'
import { CategoryItem } from '@/components/shared'

interface Props {
	className?: string
}

export const Categories: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<TopKatalog />
			<CategoryItem
				id={1}
				name='Подвеска и рулевое управление'
				imageUrl='/tovars/forCatalog/suspension_and_steering.jpg'
			/>
		</div>
	)
}
