'use client'

import { KpiSection } from '@/components/features/common/KpiSection'
import {
	useDashboardActivity,
	useDashboardCharts,
	useDashboardStats,
} from '@/hooks'
import type { DashboardFilters as TFilters } from '@/types/admin/dashboard'
import { lazy, Suspense, useState } from 'react'
import { ActivityFeed, QuickActions } from './components'
import { ChartCard } from './components/chart/ChartCard'
import { DashboardFilters } from './components/DashboardFilter'

const RevenueChart = lazy(() => import('./components/chart/RevenueChart'))
const OrdersChart = lazy(() => import('./components/chart/OrdersChart'))
const TopProductsChart = lazy(
	() => import('./components/chart/TopProductsChart'),
)
const CategoryChart = lazy(() => import('./components/chart/CategoryChart'))

export function AdminDashboard() {
	const [filters, setFilters] = useState<TFilters>({ range: 'all' })

	const { data: stats, loading: statsLoading } = useDashboardStats(filters)
	const { data: chartsData, loading: chartsLoading } =
		useDashboardCharts(filters)

	const { data: activity } = useDashboardActivity() as any

	return (
		<>
			{/* 1. Фильтры */}
			<DashboardFilters filters={filters} onChange={setFilters} />

			{/* 2. KPI Cards */}
			<KpiSection
				stats={stats}
				loading={statsLoading}
				lowStock={activity?.lowStock.length || 0}
			/>

			{/* 3. Графики (с ленивой загрузкой) */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<Suspense
					fallback={
						<div className='h-[260px] bg-gray-50 rounded-xl animate-pulse' />
					}
				>
					<ChartCard title='Продажи' loading={chartsLoading}>
						<RevenueChart data={chartsData?.revenue || []} />
					</ChartCard>
				</Suspense>

				<Suspense
					fallback={
						<div className='h-[260px] bg-gray-50 rounded-xl animate-pulse' />
					}
				>
					<ChartCard title='Статусы заказов' loading={chartsLoading}>
						<OrdersChart data={chartsData?.ordersStatus || []} />
					</ChartCard>
				</Suspense>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<Suspense
					fallback={
						<div className='h-[260px] bg-gray-50 rounded-xl animate-pulse' />
					}
				>
					<ChartCard
						title='Популярные товары'
						loading={chartsLoading}
					>
						<TopProductsChart
							data={chartsData?.topProducts || []}
						/>
					</ChartCard>
				</Suspense>

				<Suspense
					fallback={
						<div className='h-[260px] bg-gray-50 rounded-xl animate-pulse' />
					}
				>
					<ChartCard
						title='Категории товаров'
						loading={chartsLoading}
					>
						<CategoryChart data={chartsData?.categories || []} />
					</ChartCard>
				</Suspense>
			</div>

			{/* 4. Активность */}
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
