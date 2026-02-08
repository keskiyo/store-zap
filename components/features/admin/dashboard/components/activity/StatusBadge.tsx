export function StatusBadge({ status }: { status: string }) {
	const map: Record<string, string> = {
		SUCCEEDED: 'bg-green-100 text-green-600',
		PENDING: 'bg-yellow-100 text-yellow-600',
		CANCELLED: 'bg-red-100 text-red-600',
	}

	return (
		<span
			className={`px-2 py-1 text-xs rounded-full font-medium ${
				map[status] || 'bg-gray-100 text-gray-600'
			}`}
		>
			{status}
		</span>
	)
}
