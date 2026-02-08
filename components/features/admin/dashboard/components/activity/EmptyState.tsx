export function EmptyState({ text }: { text: string }) {
	return (
		<div className='text-sm text-gray-400 italic p-3 text-center'>
			{text}
		</div>
	)
}
