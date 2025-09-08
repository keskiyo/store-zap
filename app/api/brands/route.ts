import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const categoryId = searchParams.get('categoryId')

	const where: any = {}
	if (categoryId) {
		where.categoryId = Number(categoryId)
	}

	const brands = await prisma.product.findMany({
		where,
		select: { brand: true },
		distinct: ['brand'],
	})

	const sortedBrands = brands.sort((a, b) => {
		if (a.brand.startsWith('en')) return -1
		if (b.brand.startsWith('en')) return 1
		return a.brand.localeCompare(b.brand)
	})

	const result = sortedBrands.map((brand, index) => ({
		id: String(index + 1),
		name: brand.brand,
	}))

	return NextResponse.json(result)
}
