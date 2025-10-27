import { TovarItem } from '@/components/shared'
import { cn } from '@/lib/utils'
import React from 'react'
import { Skeleton } from '@/components/ui'
import { ProductWithRelations } from '@/@types/prisma'

interface Props {
	items: ProductWithRelations[]
	className?: string
	listClassName?: string
	loading?: boolean
	categoryId: number
}

export const ProductsGroupList: React.FC<Props> = ({
	className,
	items,
	listClassName,
	loading = false,
	categoryId,
}) => {
	if (loading) {
		return (
			<div
				className={cn(
					'flex flex-col items-center gap-4',
					listClassName,
					className
				)}
			>
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className='w-full max-w-4xl bg-gray-100 rounded-md border border-gray-300 p-4'
					>
						<div className='flex flex-col sm:flex-row gap-4'>
							{/* Изображение */}
							<div className='flex justify-center w-full sm:w-32 lg:w-40 h-32 flex-shrink-0'>
								<Skeleton className='w-full h-full rounded-md' />
							</div>

							{/* Контент */}
							<div className='flex flex-col flex-1 min-w-0 gap-3'>
								{/* Заголовок */}
								<Skeleton className='h-7 w-3/4 rounded-md' />
								<Skeleton className='h-6 w-1/2 rounded-md' />

								{/* Детали товара */}
								<div className='space-y-2 flex-1'>
									<Skeleton className='h-4 rounded-md' />
									<Skeleton className='h-4 rounded-md' />
									<Skeleton className='h-4 w-2/3 rounded-md' />
								</div>

								{/* Цена и кнопка */}
								<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-auto'>
									<Skeleton className='h-8 w-20 rounded-md' />
									<Skeleton className='h-10 w-28 rounded-md' />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}

	if (items.length === 0) {
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
		<div
			className={cn(
				'flex flex-col items-center gap-4',
				listClassName,
				className
			)}
		>
			{items.map((product, i) => (
				<TovarItem
					key={product.id}
					id={product.id}
					name={product.name}
					imageUrl={product.imageUrl ?? '/public/tovars/No img.jpg'}
					price={product.price}
					article={product.article}
					brand={product.brand}
				/>
			))}
		</div>
	)
}
