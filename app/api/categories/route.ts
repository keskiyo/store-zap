import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
				img: true,
			},
		})
		return NextResponse.json(categories)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Database error' }, { status: 500 })
	}
}
