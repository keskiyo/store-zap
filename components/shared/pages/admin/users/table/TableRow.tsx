'use client'

import { Button } from '@/components/ui'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { renderCellContent } from './renderCellContent'
import { ColumnDef, User } from './types'

interface Props {
	user: User
	columns: ColumnDef[]
	onBlock: (id: number, currentStatus: boolean) => void
	onDelete: (id: number, name: string) => void
}

export const AdminUsersTableRow = ({
	user,
	columns,
	onBlock,
	onDelete,
}: Props) => {
	return (
		<tr className='border-b border-gray-300 hover:bg-orange-200 last:border-0 transition-colors'>
			{columns.map(col => (
				<td
					key={col.key}
					className='py-3 px-4 text-sm overflow-hidden text-ellipsis whitespace-nowrap'
					style={{ maxWidth: '150px' }}
				>
					{renderCellContent(user, col.key)}
				</td>
			))}
			<td className='py-3 px-4 flex gap-4 items-center'>
				<label className='flex items-center gap-2 cursor-pointer select-none group'>
					<input
						type='checkbox'
						checked={user.isBlocked}
						onChange={() => onBlock(user.id, user.isBlocked)}
						className='w-5 h-5 accent-red-600 rounded border-gray-300 focus:ring-2 focus:ring-red-200 cursor-pointer transition-colors'
					/>
					<span className='text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors'>
						{user.isBlocked ? 'Заблокирован' : 'Активен'}
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
					onClick={() => onDelete(user.id, user.name)}
					className='p-1 text-red-700 hover:text-red-800 hover:bg-red-50 rounded transition-colors px-0 py-0 h-auto bg-transparent'
					title='Удалить'
				>
					<Trash2 size={18} />
				</Button>
			</td>
		</tr>
	)
}
