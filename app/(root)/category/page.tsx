import React from 'react'
import { Categories } from '@/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function Home() {
	const product = await prisma.product.findMany()

	if (!product) {
		return notFound()
	}

	return (
		<div className='container'>
			<Categories products={product} />
		</div>
	)
}
