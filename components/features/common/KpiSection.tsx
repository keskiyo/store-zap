import { MetricCard } from '@/components/features/admin/dashboard/components/MetricCard'

type Stats = {
	revenue: number
	orders: number
	users: number
	conversionRate: number
	aov: number
}

type Props = {
	stats: Stats | null
	loading: boolean
	lowStock: number
}

export function KpiSection({ stats, loading, lowStock }: Props) {
	const metricsConfig = [
		{
			title: 'Заработок',
			value: stats ? `₽${stats.revenue.toLocaleString()}` : '—',
			subtitle: 'Весь заработок',
		},
		{
			title: 'Заказы',
			value: stats?.orders || '—',
			subtitle: 'Заказы за все время',
		},
		{
			title: 'Зарегистрированные пользователи',
			value: stats?.users || '—',
			subtitle: 'Пользователи за все время',
		},
		{
			title: 'Конверсия',
			value: stats ? `${stats.conversionRate.toFixed(1)}%` : '—',
			subtitle: 'Корзина → Заказ',
		},
		{
			title: 'Средний чек',
			value: stats ? `₽${stats.aov.toFixed(2)}` : '—',
			subtitle: 'Средник чек за заказ',
		},
		{
			title: 'Мало товаров',
			value: lowStock,
			subtitle: 'Количество товаров которых мало',
		},
	]

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4'>
			{metricsConfig.map((metric, index) => (
				<MetricCard key={index} {...metric} loading={loading} />
			))}
		</div>
	)
}
