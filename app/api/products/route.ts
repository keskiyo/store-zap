import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const categoryId = searchParams.get('categoryId')

		if (!categoryId) {
			return NextResponse.json(
				{ error: 'Category ID is required' },
				{ status: 400 }
			)
		}

		const categoryIdNum = parseInt(categoryId, 10)

		if (isNaN(categoryIdNum)) {
			return NextResponse.json(
				{ error: 'Invalid category ID' },
				{ status: 400 }
			)
		}

		const products = await prisma.product.findMany({
			where: {
				categoryId: categoryIdNum,
			},
			orderBy: {
				name: 'asc', // сортировка
			},
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
