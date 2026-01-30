import { Button } from '@/components/ui'
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { renderCellContent } from './tableUtils'
import { ColumnDef, Product, ProductColumnKey, SortConfig } from './types'

interface Props {
	products: Product[]
	visibleColumns: ColumnDef[]
	sortConfig: SortConfig | null
	onSort: (key: ProductColumnKey) => void
	onDelete: (id: number, name: string) => void
}

export const AdminProductsTable = ({
	products,
	visibleColumns,
	sortConfig,
	onSort,
	onDelete,
}: Props) => {
	return (
		<div className='overflow-x-auto border rounded-lg'>
			<table className='w-full text-left border-collapse'>
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
											sortConfig.direction === 'asc' ? (
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
					{products.map((product, index) => (
						<tr
							key={product.id}
							className='border-b border-gray-300 hover:bg-orange-200 last:border-0'
						>
							{visibleColumns.map(col => (
								<td key={col.key} className='py-3 px-4 text-sm'>
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
	)
}
