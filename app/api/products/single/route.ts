import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const id = searchParams.get('id')

		if (!id) {
			return NextResponse.json(
				{ error: 'Product name or ID is required' },
				{ status: 400 }
			)
		}

		let whereCondition = {}
		if (id) {
			whereCondition = { id: parseInt(id) }
		}

		const product = await prisma.product.findFirst({
			where: whereCondition,
			include: {
				category: true,
			},
		})

		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 })
		}

		return NextResponse.json(product)
	} catch (error) {
		console.error('Database error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
