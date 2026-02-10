'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card-history'
import { useOrders } from '@/hooks'
import { OrderHistoryData, OrderHistoryItem, OrderStatus } from '@/types'
import { motion } from 'framer-motion'
import { ChevronDown, Filter, MapPin, Package, Search } from 'lucide-react'
import React, { JSX, useState } from 'react'

const statusColors: Record<OrderStatus, string> = {
	completed: 'bg-green-100 text-green-700',
	processing: 'bg-yellow-100 text-yellow-700',
	canceled: 'bg-red-100 text-red-700',
}

const statusLabels: Record<OrderStatus, string> = {
	completed: 'Доставлен',
	processing: 'Готовится',
	canceled: 'Отменён',
}

export function OrderHistory(): JSX.Element {
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
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<p className='text-red-500'>Ошибка: {error}</p>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50 p-4 md:p-6'>
			<div className='max-w-4xl mx-auto'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4'
				>
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
							<Button
								variant='outline'
								className='flex gap-2 h-10 px-3'
								onClick={() => setFilterOpen(prev => !prev)}
							>
								<Filter className='w-4 h-4' />
								<span className='hidden sm:inline'>Фильтр</span>
								<ChevronDown
									className={`w-4 h-4 transition-transform ${
										filterOpen ? 'rotate-180' : ''
									}`}
								/>
							</Button>

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
				</motion.div>

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
					<div className='space-y-4'>
						{filteredOrders.map(
							(order: OrderHistoryData, index: number) => (
								<motion.div
									key={order.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.3,
										delay: index * 0.05,
									}}
								>
									<Card className='border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
										<CardContent className='p-0'>
											{/* Header Card */}
											<div className='bg-white p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
												<div className='flex items-center gap-2'>
													<Package className='w-5 h-5 text-orange-500' />
													<span className='font-bold text-gray-900'>
														{order.id}
													</span>
													<span
														className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}
													>
														{
															statusLabels[
																order.status
															]
														}
													</span>
												</div>
												<span className='text-sm text-gray-500'>
													{order.date}
												</span>
											</div>

											{/* Body Card */}
											<div className='p-4 space-y-4'>
												{/* Address */}
												<div className='flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg'>
													<MapPin className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' />
													<span className='break-words'>
														{order.address}
													</span>
												</div>

												{/* Items List */}
												<div className='space-y-2'>
													{order.items.map(
														(
															item: OrderHistoryItem,
															idx: number,
														) => (
															<div
																key={idx}
																className='flex justify-between items-center text-sm'
															>
																<span className='text-gray-700 font-medium pr-2'>
																	{item.name}
																</span>
																<span className='text-gray-900 font-semibold whitespace-nowrap'>
																	{item.price.toLocaleString()}{' '}
																	₽
																</span>
															</div>
														),
													)}
												</div>

												{/* Totals */}
												<div className='pt-2 border-t border-dashed border-gray-200 space-y-1'>
													{order.deliveryFee !==
														undefined && (
														<div className='flex justify-between text-sm text-gray-500'>
															<span>
																Доставка
															</span>
															<span>120 ₽</span>
														</div>
													)}
													<div className='flex justify-between items-center pt-2'>
														<span className='font-bold text-gray-900 text-lg'>
															Итого
														</span>
														<span className='font-bold text-gray-900 text-xl'>
															{order.total.toLocaleString()}{' '}
															₽
														</span>
													</div>
												</div>
											</div>

											{/* Footer / Action */}
											<div className='p-4 bg-gray-50/50'>
												{order.status ===
													'completed' && (
													<Button className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-sm shadow-red-200 transition-all active:scale-[0.98]'>
														Повторить заказ
													</Button>
												)}
												{order.status ===
													'canceled' && (
													<Button
														variant='outline'
														className='w-full text-gray-400 cursor-not-allowed border-dashed'
														disabled
													>
														Заказ отменён
													</Button>
												)}
											</div>
										</CardContent>
									</Card>
								</motion.div>
							),
						)}
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
