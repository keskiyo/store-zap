import { TovarList } from '@/components/shared'
import { cn } from '@/lib/utils'
import React from 'react'
import { Skeleton } from '@/components/ui'

interface Props {
	products: any[]
	className?: string
	listClassName?: string
	categoryId: number
	loading?: boolean
}

export const ProductsGroupList: React.FC<Props> = ({
	className,
	products,
	listClassName,
	categoryId,
	loading = false,
}) => {
	if (loading) {
		return (
			<div className={cn('w-full max-w-4xl mx-auto space-y-4', className)}>
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className='
							flex flex-col sm:flex-row gap-4 
							w-full 
							h-auto 
							bg-gray-100 rounded-md border border-gray-300 
							p-3 sm:p-4 
							shadow-sm 
						'
					>
						{/* Изображение */}
						<div
							className='
								flex justify-center 
								w-full sm:w-32 lg:w-40 
								h-32 sm:h-auto
								flex-shrink-0
							'
						>
							<Skeleton
								className='
									w-full h-full 
									border border-gray-200 rounded-md 
									bg-gray-200
								'
							/>
						</div>

						{/* Контент */}
						<div className='flex flex-col flex-1 min-w-0 gap-4'>
							{/* Заголовок */}
							<div className='min-w-0'>
								<Skeleton className='h-7 w-3/4 mb-2 rounded-md' />
								<Skeleton className='h-6 w-1/2 rounded-md' />
							</div>

							{/* Детали и цена */}
							<div className='flex flex-col lg:flex-row justify-between gap-3 flex-1 mt-auto'>
								{/* Детали товара */}
								<div className='space-y-2 flex-1 min-w-0'>
									<div className='flex items-center gap-2'>
										<Skeleton className='w-12 h-4 rounded-md' />
										<Skeleton className='h-4 flex-1 rounded-md' />
									</div>
									<div className='flex items-center gap-2'>
										<Skeleton className='w-12 h-4 rounded-md' />
										<Skeleton className='h-4 flex-1 rounded-md' />
									</div>
									<div className='flex items-center gap-2'>
										<Skeleton className='w-12 h-4 rounded-md' />
										<Skeleton className='h-4 flex-1 rounded-md' />
									</div>
								</div>

								{/* Цена и кнопка */}
								<div
									className='
										flex flex-col xs:flex-row sm:flex-col lg:flex-row 
										justify-between items-start xs:items-center sm:items-end lg:items-center 
										gap-2 
										mt-auto
									'
								>
									<Skeleton className='h-8 w-20 rounded-md' />
									<Skeleton className='h-9 w-28 rounded-md' />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}

	if (products.length === 0) {
		return (
			<div className={cn('text-center py-12', className)}>
				<h3 className='text-lg font-medium text-gray-900 mb-2'>
					Товары не найдены
				</h3>
				<p className='text-gray-500'>Попробуйте изменить параметры фильтров</p>
			</div>
		)
	}

	return (
		<div className={className}>
			<TovarList
				items={products}
				className={cn('gap-4 md:gap-6', listClassName)}
			/>
		</div>
	)
}
