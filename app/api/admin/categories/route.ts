import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
				img: true,
			},
			orderBy: {
				name: 'asc',
			},
		})

		return NextResponse.json(categories)
	} catch (error) {
		console.error('GET /api/admin/categories Error:', error)
		return NextResponse.json(
			{ error: 'Ошибка получения категорий' },
			{ status: 500 },
		)
	}
}
