import { Button } from '@/components/ui'
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { renderCellContent } from './tableUtils'
import { ColumnDef, ColumnKey, SortConfig, User } from './types'

interface Props {
	users: User[]
	visibleColumns: ColumnDef[]
	sortConfig: SortConfig | null
	onSort: (key: ColumnKey) => void
	onBlock: (id: number, currentStatus: boolean) => void
	onDelete: (id: number, name: string) => void
}

export const AdminUsersTable = ({
	users,
	visibleColumns,
	sortConfig,
	onSort,
	onBlock,
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
								className='py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none transition-colors group border-b border-gray-400'
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
					{users.map((user, index) => (
						<tr
							key={user.id}
							className='border-b border-gray-300 hover:bg-gray-50 last:border-0'
						>
							{visibleColumns.map(col => (
								<td key={col.key} className='py-3 px-4 text-sm'>
									{renderCellContent(user, col.key)}
								</td>
							))}
							{/* Ячейка действий */}
							<td className='py-3 px-4 flex gap-4 items-center'>
								<label className='flex items-center gap-2 cursor-pointer select-none group'>
									<input
										type='checkbox'
										checked={user.isBlocked}
										onChange={e => {
											onBlock(user.id, user.isBlocked)
										}}
										className='w-5 h-5 accent-red-600 rounded border-gray-300 focus:ring-2 focus:ring-red-200 cursor-pointer transition-colors'
									/>
									<span className='text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors'>
										{user.isBlocked
											? 'Заблокирован'
											: 'Активен'}
									</span>
								</label>
								<Link
									href={`/admin/users/${user.id}`}
									className='p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors'
									title='Редактировать'
								>
									<Pencil size={18} />
								</Link>

								<Button
									onClick={() => {
										onDelete(user.id, user.name)
									}}
									className='p-1 text-red-700 hover:text-red-800 hover:bg-red-50 rounded transition-colors px-0 py-0 h-auto bg-transparent'
									title='Удалить'
								>
									<Trash2 size={18} />
								</Button>
							</td>
						</tr>
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
	)
}
