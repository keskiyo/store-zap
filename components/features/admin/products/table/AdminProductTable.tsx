'use client'

import { Button } from '@/components/ui'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { getPageNumbers } from '@/hooks/ui/use-pagination'
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
	ColumnDef,
	Product,
	ProductColumnKey,
	SortConfig,
} from '../../../../../types/admin/products'
import { renderCellContent } from './TableUtils'

interface Props {
	products: Product[]
	visibleColumns: ColumnDef[]
	sortConfig: SortConfig | null
	onSort: (key: ProductColumnKey) => void
	onDelete: (id: number, name: string) => void
}

const ITEMS_PER_PAGE = 20

export const AdminProductsTable = ({
	products,
	visibleColumns,
	sortConfig,
	onSort,
	onDelete,
}: Props) => {
	const [currentPage, setCurrentPage] = useState(1)

	// Общее количество страниц
	const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

	// Получаем товары только для текущей страницы
	const currentProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		const endIndex = startIndex + ITEMS_PER_PAGE
		return products.slice(startIndex, endIndex)
	}, [products, currentPage])

	// Получаем массив номеров страниц (1, ..., 4, 5, 6, ..., 10)
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

	return (
		<div className='flex flex-col gap-4'>
			<div className='overflow-x-auto border rounded-lg'>
				<table className='w-full text-left border-collapse'>
					<colgroup>
						{visibleColumns.map(col => (
							<col
								key={col.key}
								style={{
									width: '150px',
									minWidth: '100px',
									maxWidth: '400px',
								}}
							/>
						))}
						<col style={{ width: '200px' }} />
					</colgroup>

					<thead className='bg-gray-50'>
						<tr>
							{visibleColumns.map(col => (
								<th
									key={col.key}
									onClick={() => onSort(col.key)}
									className='py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 select-none transition-colors group border-b border-gray-400 whitespace-nowrap'
								>
									<div className='flex items-center gap-1'>
										{col.label}
										<span className='text-gray-400 group-hover:text-gray-600 flex flex-col'>
											{sortConfig?.key === col.key ? (
												sortConfig.direction ===
												'asc' ? (
													<ChevronUp
														size={16}
														className='text-orange-500'
													/>
												) : (
													<ChevronDown
														size={16}
														className='text-orange-500'
													/>
												)
											) : (
												<>
													<ChevronUp size={12} />
													<ChevronDown size={12} />
												</>
											)}
										</span>
									</div>
								</th>
							))}
							<th className='py-3 px-4 font-semibold text-gray-700 border-b border-gray-400'>
								Действия
							</th>
						</tr>
					</thead>
					<tbody>
						{currentProducts.map(product => (
							<tr
								key={product.id}
								className='border-b border-gray-300 hover:bg-orange-200 last:border-0'
							>
								{visibleColumns.map(col => (
									<td
										key={col.key}
										className='py-3 px-4 text-sm'
									>
										{renderCellContent(product, col.key)}
									</td>
								))}
								{/* Ячейка действий */}
								<td className='py-3 px-4 flex gap-3 items-center'>
									<Link
										href={`/admin/products/${product.id}`}
										className='p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors'
										title='Редактировать'
									>
										<Pencil size={18} />
									</Link>

									<Button
										onClick={() => {
											onDelete(product.id, product.name)
										}}
										className='p-1 text-red-700 hover:text-red-800 hover:bg-red-50 rounded transition-colors px-0 py-0 h-auto bg-transparent'
										title='Удалить'
									>
										<Trash2 size={18} />
									</Button>
								</td>
							</tr>
						))}
						{products.length === 0 && (
							<tr>
								<td
									colSpan={visibleColumns.length + 1}
									className='text-center py-8 text-gray-500'
								>
									Нет товаров
								</td>
							</tr>
						)}
					</tbody>
				</table>
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
											className='hover:text-orange-400'
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
