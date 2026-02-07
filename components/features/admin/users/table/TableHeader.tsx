'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import {
	ColumnDef,
	ColumnKey,
	SortConfig,
} from '../../../../../types/admin/users'

interface Props {
	columns: ColumnDef[]
	sortConfig: SortConfig | null
	onSort: (key: ColumnKey) => void
}

export const AdminUsersTableHeader = ({
	columns,
	sortConfig,
	onSort,
}: Props) => {
	return (
		<thead className='bg-gray-50'>
			<tr>
				{columns.map(col => (
					<th
						key={col.key}
						onClick={() => onSort(col.key)}
						className='py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 select-none transition-colors group border-b border-gray-400'
					>
						<div className='flex items-center justify-between'>
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
						</div>
					</th>
				))}
				<th className='py-3 px-4 font-semibold text-gray-700 border-b border-gray-400'>
					Действия
				</th>
			</tr>
		</thead>
	)
}
