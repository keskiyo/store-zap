type Props = {
	title: string
	loading: boolean
	children: React.ReactNode
}

export function ChartCard({ title, loading, children }: Props) {
	return (
		<div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
			<h3 className='font-medium text-gray-800 mb-4'>{title}</h3>
			{loading ? (
				<div className='h-[260px] flex items-center justify-center text-gray-400'>
					Loading...
				</div>
			) : (
				children
			)}
		</div>
	)
}
