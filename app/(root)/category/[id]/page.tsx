import { TovarCategory } from '@/components/shared'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	// Можно сразу деструктурировать после await
	const { id } = await params

	return (
		<div className='container'>
			<TovarCategory categoryId={+id} />
		</div>
	)
}
