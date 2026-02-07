type MetricCardProps = {
	title: string
	value: string | number
	subtitle?: string
	loading?: boolean
}

export function MetricCard({
	title,
	value,
	subtitle,
	loading,
}: MetricCardProps) {
	return (
		<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-2'>
			<span className='text-sm text-gray-500'>{title}</span>

			{loading ? (
				<div className='h-8 w-24 bg-gray-200 rounded animate-pulse' />
			) : (
				<span className='text-2xl font-semibold text-gray-900'>
					{value}
				</span>
			)}

			{subtitle && (
				<span className='text-xs text-gray-400'>{subtitle}</span>
			)}
		</div>
	)
}
