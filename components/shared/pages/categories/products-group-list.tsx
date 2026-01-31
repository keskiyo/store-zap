'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { TovarItem } from '@/components/shared'
import { Skeleton } from '@/components/ui'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { getPageNumbers } from '@/hooks/pagination'
import { cn } from '@/lib/utils'
import React, { useMemo, useState } from 'react'

interface Props {
	items: ProductWithRelations[]
	className?: string
	listClassName?: string
	loading?: boolean
	categoryId: number
}

const ITEMS_PER_PAGE = 12

export const ProductsGroupList: React.FC<Props> = ({
	className,
	items,
	listClassName,
	loading = false,
	categoryId,
}) => {
	const [currentPage, setCurrentPage] = useState(1)

	// Вычисляем общее количество страниц
	const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

	// Получаем товары только для текущей страницы
	const currentItems = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		const endIndex = startIndex + ITEMS_PER_PAGE
		return items.slice(startIndex, endIndex)
	}, [items, currentPage])

	// Получаем массив номеров страниц для отображения
	const pageNumbers = getPageNumbers(currentPage, totalPages)

	// Обработчики событий
	const handlePrevPage = (e: React.MouseEvent) => {
		e.preventDefault()
		if (currentPage > 1) setCurrentPage(p => p - 1)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleNextPage = (e: React.MouseEvent) => {
		e.preventDefault()
		if (currentPage < totalPages) setCurrentPage(p => p + 1)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handlePageClick = (e: React.MouseEvent, page: number) => {
		e.preventDefault()
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	if (loading) {
		return (
			<div
				className={cn(
					'flex flex-col items-center gap-4',
					listClassName,
					className,
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
				<p className='text-gray-500'>
					Попробуйте изменить параметры фильтров
				</p>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-6'>
			{/* Список товаров */}
			<div
				className={cn(
					'flex flex-col items-center gap-4',
					listClassName,
					className,
				)}
			>
				{currentItems.map(product => (
					<TovarItem
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={
							product.imageUrl ?? '/public/tovars/Noimg.jpg'
						}
						price={product.price}
						article={product.article}
						brand={product.brand}
						count={product.count}
					/>
				))}
			</div>

			{/* Блок пагинации */}
			{totalPages > 1 && (
				<div className='flex justify-center py-2'>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href='#'
									onClick={handlePrevPage}
									className={
										currentPage === 1
											? 'pointer-events-none opacity-50'
											: ''
									}
								/>
							</PaginationItem>

							{pageNumbers.map((page, index) => (
								<PaginationItem key={`${page}-${index}`}>
									{page === '...' ? (
										<PaginationEllipsis />
									) : (
										<PaginationLink
											href='#'
											isActive={currentPage === page}
											className='hover:text-orange-500'
											onClick={e =>
												handlePageClick(
													e,
													page as number,
												)
											}
										>
											{page}
										</PaginationLink>
									)}
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									href='#'
									onClick={handleNextPage}
									className={
										currentPage === totalPages
											? 'pointer-events-none opacity-50'
											: ''
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	)
}
