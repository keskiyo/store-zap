import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)

		const query = searchParams.get('query') || ''
		const brands = searchParams.get('brands')
		const priceFrom = Number(searchParams.get('priceFrom'))
		const priceTo = Number(searchParams.get('priceTo'))

		const categoryId = searchParams.get('categoryId')
			? Number(searchParams.get('categoryId'))
			: undefined

		interface ProductWhereClause {
			categoryId?: number
			OR?: Array<{
				name?: { contains: string; mode: 'insensitive' }
				article?: { contains: string; mode: 'insensitive' }
				brand?: { contains: string; mode: 'insensitive' }
			}>
			brand?: { in: string[] }
			price?: {
				gte?: number
				lte?: number
			}
		}

		const where: ProductWhereClause = {}

		if (categoryId) {
			where.categoryId = categoryId
		}

		if (query) {
			where.OR = [
				{ name: { contains: query, mode: 'insensitive' } },
				{ article: { contains: query, mode: 'insensitive' } },
				{ brand: { contains: query, mode: 'insensitive' } },
			]
		}

		if (brands) {
			where.brand = {
				in: brands.split(',').map(b => b.trim()),
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
			{ status: 500 },
		)
	}
}
