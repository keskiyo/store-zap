import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/components/shared/lib/utils'
import { CategoryCard } from '@/components/data/categories'

interface CategoryItemProps {
	category: CategoryCard
	className?: string
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	className,
}) => {
	return (
		<Link
			href={`/category/${category.id}`}
			className={cn(
				'group block rounded-lg border border-gray-200',
				'overflow-hidden shadow-sm hover:shadow-md',
				'transition-all',
				className
			)}
		>
			<div className='relative h-70 bg-white-100 overflow-hidden'>
				<Image
					src={category.imageSrc}
					alt={category.title}
					fill
					className='object-contain transition-transform group-hover:scale-85 scale-70'
					sizes='(max-width: 768px) 100vw, 50vw'
					style={{ right: 0, left: '2em' }}
				/>
			</div>
			<div className='p-4 border-t-2 border-gray-200'>
				<h3 className='font-medium text-lg text-gray-900'>{category.title}</h3>
				<p className='text-sm text-[#8d9191] mt-1'>
					{category.productCount} товаров
				</p>
			</div>
		</Link>
	)
}
