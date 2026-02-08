export function ActivityCard({
	title,
	icon,
	children,
}: {
	title: string
	icon: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<div className='border border-gray-100 rounded-2xl p-4'>
			<div className='flex items-center gap-2 mb-4 text-gray-700 font-semibold'>
				{icon}
				<span>{title}</span>
			</div>

			<div className='space-y-2'>{children}</div>
		</div>
	)
}
