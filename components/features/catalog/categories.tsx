'use client'

import { Skeleton } from '@/components/ui'
import { useCategories } from '@/hooks/features/use-categories'
import { cn } from '@/lib/utils'
import { Product } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

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
			<div className={cn('flex flex-col gap-4 py-10', className)}>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{Array.from({ length: 9 }).map((_, index) => (
						<div
							key={index}
							className='group block rounded-lg border border-gray-500 overflow-hidden shadow-sm hover:shadow-md transition-all'
						>
							<div className='relative h-70 bg-white overflow-hidden flex justify-center items-center'>
								<Skeleton className='w-[230px] h-[230px]' />
							</div>
							<div className='flex items-center justify-between p-4 border-t-2 border-gray-400'>
								<Skeleton className='h-8 w-[400px]' />
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
				{categories.map(category => {
					const productCount = products.filter(
						product => product.categoryId === category.id,
					).length

					return (
						<Link
							href={`/category/${category.id}`}
							key={category.id}
							className='group block rounded-lg border border-gray-500 overflow-hidden shadow-sm hover:shadow-md transition-all'
						>
							<div className='relative h-64 bg-white overflow-hidden flex justify-center items-center p-4'>
								<img
									className='object-contain transition-transform duration-300 group-hover:scale-105 w-full h-full'
									src={category.img ?? ''}
									alt={category.name}
									width={50}
									height={50}
									loading='lazy'
									decoding='async'
								/>
							</div>
							<div className='flex items-center justify-between p-4 border-t-2 border-gray-400 bg-gray-50 group-hover:bg-orange-50 transition-colors'>
								<h3 className='font-medium text-lg text-gray-800 line-clamp-1'>
									{category.name}
								</h3>
								<span className='font-medium text-sm text-gray-800'>
									{productCount} шт.
								</span>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
