import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const categoryId = Number(searchParams.get('categoryId'))
		const brands = searchParams.get('brands')
		const priceFrom = Number(searchParams.get('priceFrom'))
		const priceTo = Number(searchParams.get('priceTo'))

		if (!categoryId) {
			return NextResponse.json(
				{ error: 'Category ID is required' },
				{ status: 400 }
			)
		}

		// Получаем бренды выбранной категории
		const brandResults = await prisma.product.findMany({
			where: { categoryId },
			select: { brand: true },
			distinct: ['brand'],
			orderBy: { brand: 'asc' },
		})
		const brandMapping = brandResults.map(item => item.brand)

		// Условия для фильтрации
		const where: any = { categoryId }

		if (brands) {
			const brandNames = brands
				.split(',')
				.map(id => brandMapping[Number(id) - 1])
				.filter(Boolean)

			if (brandNames.length) {
				where.brand = { in: brandNames }
			}
		}

		if (priceFrom || priceTo) {
			where.price = {
				...(priceFrom && !isNaN(priceFrom) ? { gte: priceFrom } : {}),
				...(priceTo && !isNaN(priceTo) ? { lte: priceTo } : {}),
			}
		}

		const products = await prisma.product.findMany({
			where,
			orderBy: { name: 'asc' },
		})

		return NextResponse.json(products)
	} catch (error) {
		console.error('Database error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
