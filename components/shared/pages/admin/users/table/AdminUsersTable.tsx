'use client'

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
import { useMemo, useState } from 'react'
import { AdminUsersTableHeader } from './TableHeader'
import { AdminUsersTableRow } from './TableRow'
import { ColumnDef, ColumnKey, SortConfig, User } from './types'

interface Props {
	users: User[]
	visibleColumns: ColumnDef[]
	sortConfig: SortConfig | null
	onSort: (key: ColumnKey) => void
	onBlock: (id: number, currentStatus: boolean) => void
	onDelete: (id: number, name: string) => void
}

const ITEMS_PER_PAGE = 20

export const AdminUsersTable = ({
	users,
	visibleColumns,
	sortConfig,
	onSort,
	onBlock,
	onDelete,
}: Props) => {
	const [currentPage, setCurrentPage] = useState(1)

	// Вычисляем общее количество страниц
	const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE)

	// Получаем массив пользователей только для текущей страницы
	const currentUsers = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		const endIndex = startIndex + ITEMS_PER_PAGE
		return users.slice(startIndex, endIndex)
	}, [users, currentPage])

	const pageNumbers = getPageNumbers(currentPage, totalPages)

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

					<AdminUsersTableHeader
						columns={visibleColumns}
						sortConfig={sortConfig}
						onSort={onSort}
					/>

					<tbody>
						{currentUsers.map(user => (
							<AdminUsersTableRow
								key={user.id}
								user={user}
								columns={visibleColumns}
								onBlock={onBlock}
								onDelete={onDelete}
							/>
						))}

						{users.length === 0 && (
							<tr>
								<td
									colSpan={visibleColumns.length + 1}
									className='text-center py-8 text-gray-500'
								>
									Нет пользователей
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
