import { prisma } from '@/prisma/prisma-client'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get('query') || ''

	const products = await prisma.product.findMany({
		where: {
			OR: [
				{ name: { contains: query, mode: 'insensitive' } },
				{ article: { contains: query, mode: 'insensitive' } },
				{ brand: { contains: query, mode: 'insensitive' } },
			],
		},
	})

	return NextResponse.json(products)
}
