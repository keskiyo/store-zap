import { ProductDescriptions, ProductImage } from '@/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const numberId = Number(id)

	const product = await prisma.product.findFirst({
		where: {
			id: numberId,
		},
		include: {
			specifications: true,
		},
	})

	if (!product) {
		return notFound()
	}

	return (
		<div className='container'>
			<div className='flex items-center flex-1'>
				<ProductImage className='w-80' imageUrl={product.imageUrl} />
				<div className='w-full p-7 ml-10'>
					<ProductDescriptions product={product} />
				</div>
			</div>
		</div>
	)
}
