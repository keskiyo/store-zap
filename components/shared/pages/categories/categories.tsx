'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { TopKatalog } from '@/components/shared'
import Link from 'next/link'
import { useCategories } from '@/hooks/usecategories'

export const dynamic = 'force-dynamic'
export const revalidate = 0
interface Props {
	className?: string
}

export const Categories: React.FC<Props> = ({ className }) => {
	const { categories } = useCategories()

	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<TopKatalog />
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
							/>
						</div>
						<div className='p-4 border-t-2 border-gray-400'>
							<h3 className='font-medium text-lg text-gray-900'>
								{category.name}
							</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
