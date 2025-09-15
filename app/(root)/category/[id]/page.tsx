import { TovarCategory } from '@/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProductsCategoryPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const numberId = Number(id)

	const category = await prisma.category.findUnique({
		where: {
			id: numberId,
		},
	})

	if (!category) {
		return notFound()
	}

	return (
		<div className='container'>
			<TovarCategory categoryId={numberId} />
		</div>
	)
}
