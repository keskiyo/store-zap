import { EditProductPage } from '@/components/shared/pages'

export default async function ProductsPageForAdmin({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<div className='container py-10'>
			<EditProductPage productId={id} />
		</div>
	)
}
