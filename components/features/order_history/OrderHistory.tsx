'use client'

import { useOrders } from '@/hooks'
import { OrderHistoryData, OrderStatus } from '@/types'
import { ChevronDown, Filter, Package, Search } from 'lucide-react'
import React, { useState } from 'react'
import { OrderCard } from './OrderCard'

const statusLabels: Record<OrderStatus, string> = {
	completed: 'Завершён',
	processing: 'В процессе',
	canceled: 'Отменён',
}

export function OrderHistory(): React.JSX.Element {
	const [search, setSearch] = useState<string>('')
	const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
	const [filterOpen, setFilterOpen] = useState(false)

	const { orders, loading, error } = useOrders()

	const filteredOrders: OrderHistoryData[] = orders.filter(
		(order: OrderHistoryData) => {
			const matchesSearch =
				order.id.toLowerCase().includes(search.toLowerCase()) ||
				order.address.toLowerCase().includes(search.toLowerCase())
			const matchesFilter = filter === 'all' || order.status === filter
			return matchesSearch && matchesFilter
		},
	)

	if (error) {
		return (
			<div className=' bg-gray-50 flex items-center justify-center'>
				<p className='text-red-500'>Ошибка: {error}</p>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50 p-4 md:p-6'>
			<div className=' mx-auto'>
				{/* Header */}
				<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4'>
					<div>
						<h1 className='text-2xl font-bold'>История заказов</h1>
						<p className='text-gray-500 text-sm'>
							Управляйте своими прошлыми заказами
						</p>
					</div>

					<div className='flex gap-2'>
						{/* Search */}
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
							<input
								value={search}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>,
								) => setSearch(e.target.value)}
								placeholder='Поиск по номеру или адресу'
								className='pl-9 pr-4 py-2 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm w-full md:w-64'
							/>
						</div>

						{/* Filter */}
						<div className='relative'>
							<button
								className='flex items-center gap-2 h-10 px-3 border rounded-lg bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500'
								onClick={() => setFilterOpen(prev => !prev)}
							>
								<Filter className='w-4 h-4' />
								<span className='hidden sm:inline'>Фильтр</span>
								<ChevronDown
									className={`w-4 h-4 transition-transform ${
										filterOpen ? 'rotate-180' : ''
									}`}
								/>
							</button>

							{filterOpen && (
								<div className='absolute right-0 mt-2 bg-white shadow-lg rounded-xl overflow-hidden z-50 min-w-[180px] border border-gray-100'>
									{(
										[
											'all',
											'completed',
											'processing',
											'canceled',
										] as const
									).map(status => (
										<button
											key={status}
											onClick={() => {
												setFilter(status)
												setFilterOpen(false)
											}}
											className={`block w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm ${
												filter === status
													? 'bg-orange-50 text-orange-600 font-medium'
													: 'text-gray-700'
											}`}
										>
											{status === 'all'
												? 'Все'
												: statusLabels[
														status as OrderStatus
													]}
										</button>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Loading State */}
				{loading && (
					<div className='text-center py-20'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto'></div>
						<p className='mt-2 text-gray-500'>
							Загрузка заказов...
						</p>
					</div>
				)}

				{/* Orders List */}
				{!loading && (
					<div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
						{filteredOrders.map((order: OrderHistoryData) => (
							<OrderCard key={order.id} order={order} />
						))}
					</div>
				)}

				{/* Empty State */}
				{!loading && filteredOrders.length === 0 && (
					<div className='text-center text-gray-400 mt-20 flex flex-col items-center'>
						<div className='bg-gray-100 p-4 rounded-full mb-4'>
							<Package className='w-8 h-8 text-gray-400' />
						</div>
						<p className='font-medium text-gray-600'>
							Ничего не найдено
						</p>
						<p className='text-sm'>
							Попробуйте изменить параметры поиска
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
