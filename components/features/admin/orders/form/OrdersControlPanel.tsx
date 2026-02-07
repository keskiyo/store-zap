import React from 'react'

interface Props {
	searchQuery: string
	setSearchQuery: (val: string) => void
	statusFilter: string
	setStatusFilter: (val: string) => void
	sortBy: 'date' | 'sum'
	setSortBy: (val: 'date' | 'sum') => void
	sortOrder: 'asc' | 'desc'
	setSortOrder: (val: 'asc' | 'desc') => void
}

export const OrdersControlPanel: React.FC<Props> = ({
	searchQuery,
	setSearchQuery,
	statusFilter,
	setStatusFilter,
	sortBy,
	setSortBy,
	sortOrder,
	setSortOrder,
}) => {
	return (
		<div className='bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{/* Поиск */}
				<div className='lg:col-span-2'>
					<label className='block text-xs font-semibold text-gray-500 mb-1'>
						Поиск (#id, Имя, Email, Дата)
					</label>
					<input
						type='text'
						placeholder='Например: #123 или Иван...'
						className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
				</div>

				{/* Фильтр по статусу */}
				<div>
					<label className='block text-xs font-semibold text-gray-500 mb-1'>
						Статус
					</label>
					<select
						className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white'
						value={statusFilter}
						onChange={e => setStatusFilter(e.target.value)}
					>
						<option value='ALL'>Все статусы</option>
						<option value='PENDING'>Ожидает оплаты</option>
						<option value='SUCCEEDED'>Оплачен</option>
						<option value='CANCELLED'>Отменен</option>
					</select>
				</div>

				{/* Сортировка */}
				<div>
					<label className='block text-xs font-semibold text-gray-500 mb-1'>
						Сортировка
					</label>
					<div className='flex gap-2'>
						<select
							className='flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white'
							value={sortBy}
							onChange={e =>
								setSortBy(e.target.value as 'date' | 'sum')
							}
						>
							<option value='date'>По дате</option>
							<option value='sum'>По сумме</option>
						</select>
						<button
							onClick={() =>
								setSortOrder(
									sortOrder === 'asc' ? 'desc' : 'asc',
								)
							}
							className='p-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center min-w-[40px]'
							title='Изменить порядок'
						>
							{sortOrder === 'asc' ? '↑' : '↓'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
