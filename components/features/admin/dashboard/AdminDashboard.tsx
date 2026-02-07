'use client'

import {
	useDashboardActivity,
	useDashboardCharts,
	useDashboardStats,
} from '@/hooks'
import { useState } from 'react'
import {
	ActivityFeed,
	CategoryChart,
	MetricCard,
	OrdersChart,
	QuickActions,
	RevenueChart,
	TopProductsChart,
} from './components'

type DashboardFilters = {
	range: 'all' | 'month' | 'week' | 'day'
	categoryId?: string
	status?: 'SUCCEEDED' | 'PENDING' | 'CANCELLED'
}

export function AdminDashboard() {
	const [filters, setFilters] = useState<DashboardFilters>({
		range: 'all',
	})
	const { data: stats, loading: statsLoading } = useDashboardStats(filters)
	const { data: chartsData, loading: chartsLoading } =
		useDashboardCharts(filters)
	const { data: activity, data } = useDashboardActivity(filters)

	return (
		<>
			{/* Filters */}
			<div className='bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-wrap gap-3'>
				<select
					value={filters.range}
					onChange={e =>
						setFilters(prev => ({
							...prev,
							range: e.target.value as any,
						}))
					}
					className='px-3 py-2 border rounded-lg text-sm'
				>
					<option value='all'>За всё время</option>
					<option value='month'>Этот месяц</option>
					<option value='week'>Эта неделя</option>
					<option value='day'>Сегодня</option>
				</select>
			</div>

			{/* KPI CARDS */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4'>
				<MetricCard
					title='Заработок'
					value={stats ? `₽${stats.revenue.toLocaleString()}` : '—'}
					subtitle='Весь заработок'
					loading={statsLoading}
				/>
				<MetricCard
					title='Заказы'
					value={stats?.orders || '—'}
					subtitle='Заказы за все время'
					loading={statsLoading}
				/>
				<MetricCard
					title='Зарегистрированные пользователи'
					value={stats?.users || '—'}
					subtitle='Пользователи за все время'
					loading={statsLoading}
				/>
				<MetricCard
					title='Конверсия'
					value={stats ? `${stats.conversionRate.toFixed(1)}%` : '—'}
					subtitle='Корзина → Заказ'
					loading={statsLoading}
				/>
				<MetricCard
					title='Средний чек'
					value={stats ? `₽${stats.aov.toFixed(2)}` : '—'}
					subtitle='Средник чек за заказ'
					loading={statsLoading}
				/>
				<MetricCard
					title='Мало товаров'
					value={data?.lowStock.length || 0}
					subtitle='Количество товаров которых мало'
					loading={statsLoading}
				/>
			</div>

			{/* Charts */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
					<h3 className='font-medium text-gray-800 mb-4'>Продажи</h3>
					{chartsLoading ? (
						<div className='h-[260px] flex items-center justify-center text-gray-400'>
							Loading...
						</div>
					) : (
						<RevenueChart data={chartsData?.revenue || []} />
					)}
				</div>

				<div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
					<h3 className='font-medium text-gray-800 mb-4'>
						Статусы заказов
					</h3>
					{chartsLoading ? (
						<div className='h-[260px] flex items-center justify-center text-gray-400'>
							Loading...
						</div>
					) : (
						<OrdersChart data={chartsData?.ordersStatus || []} />
					)}
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
					<h3 className='font-medium text-gray-800 mb-4'>
						Популярные товары
					</h3>
					{chartsLoading ? (
						<div className='h-[260px] flex items-center justify-center text-gray-400'>
							Loading...
						</div>
					) : (
						<TopProductsChart
							data={chartsData?.topProducts || []}
						/>
					)}
				</div>

				<div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
					<h3 className='font-medium text-gray-800 mb-4'>
						Категории товаров
					</h3>
					{chartsLoading ? (
						<div className='h-[260px] flex items-center justify-center text-gray-400'>
							Loading...
						</div>
					) : (
						<CategoryChart data={chartsData?.categories || []} />
					)}
				</div>
			</div>

			{/* ACTIVITY + ACTIONS */}
			<div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4'>
				<div className='flex justify-between items-center'>
					<h3 className='font-medium text-gray-800'>Активность</h3>
					<QuickActions />
				</div>

				{activity && <ActivityFeed />}
			</div>
		</>
	)
}
