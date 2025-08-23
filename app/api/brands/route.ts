import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET() {
	const brands = await prisma.product.findMany({
		select: {
			brand: true,
		},
		distinct: ['brand'],
	})

	const sortedBrands = brands.sort((a, b) => {
		if (a.brand.startsWith('en')) return -1
		if (b.brand.startsWith('en')) return 1
		return a.brand.localeCompare(b.brand)
	})

	const englishBrands = sortedBrands.filter(
		brand => brand.brand.localeCompare('en') === 0
	)
	const russianBrands = sortedBrands.filter(
		brand => brand.brand.localeCompare('ru') === 0
	)

	const result = [
		...englishBrands.map(brand => brand.brand),
		...russianBrands.map(brand => brand.brand),
	]

	return NextResponse.json(result)
}
