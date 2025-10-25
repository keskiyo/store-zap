'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { TopKatalog } from '@/components/shared'
import Link from 'next/link'
import { useCategories } from '@/hooks/usecategories'
import { Skeleton } from '@/components/ui'
import { Product } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0
interface Props {
	className?: string
	products: Product[]
}

export const Categories: React.FC<Props> = ({ className, products }) => {
	const { categories, isLoading } = useCategories()

	if (isLoading) {
		return (
			<div className={cn('flex flex-col gap-4', className)}>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className='group block rounded-lg border border-gray-200 overflow-hidden shadow-sm'
						>
							<div className='relative h-70 bg-muted overflow-hidden flex justify-center items-center'>
								<Skeleton className='w-48 h-48 rounded' />
							</div>
							<div className='p-4 border-t-2 border-gray-200'>
								<Skeleton className='h-6 w-3/4 rounded' />
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className={cn('flex flex-col gap-4 py-10', className)}>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{categories.map(category => (
					<Link
						href={`/category/${category.id}`}
						key={category.id}
						className='group block rounded-lg border border-gray-500 overflow-hidden shadow-sm hover:shadow-md transition-all'
					>
						<div className='relative h-70 bg-white overflow-hidden flex justify-center items-center'>
							<img
								className='object-contain transition-transform group-hover:scale-80 scale-70'
								src={category.img ?? ''}
								alt={category.name}
								width='300px'
								loading='lazy'
								decoding='async'
							/>
						</div>
						<div className='flex items-center justify-between p-4 border-t-2 border-gray-400'>
							<h3 className='font-medium text-lg text-gray-600'>
								{category.name}
							</h3>
							<h3 className='font-medium text-[14px] text-gray-600'>
								{products.filter(product => product.categoryId === category.id)
									.length || 0}{' '}
								шт.
							</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
