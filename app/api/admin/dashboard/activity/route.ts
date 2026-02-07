import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)

	const ordersLimit = Number(searchParams.get('orders') || 5)
	const usersLimit = Number(searchParams.get('users') || 5)
	const lowStockLimit = Number(searchParams.get('lowStock') || 5)

	const ordersOffset = Number(searchParams.get('ordersOffset') || 0)
	const usersOffset = Number(searchParams.get('usersOffset') || 0)
	const lowStockOffset = Number(searchParams.get('lowStockOffset') || 0)

	const [orders, users, lowStock] = await Promise.all([
		prisma.order.findMany({
			orderBy: { createdAt: 'desc' },
			take: ordersLimit,
			skip: ordersOffset,
			select: {
				id: true,
				totalAmount: true,
				status: true,
				email: true,
				createdAt: true,
			},
		}),

		prisma.user.findMany({
			orderBy: { createdAt: 'desc' },
			take: usersLimit,
			skip: usersOffset,
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true,
			},
		}),

		prisma.product.findMany({
			where: {
				count: { lte: 5 },
			},
			orderBy: { count: 'asc' },
			take: lowStockLimit,
			skip: lowStockOffset,
			select: {
				id: true,
				name: true,
				article: true,
				count: true,
			},
		}),
	])

	return NextResponse.json({
		orders,
		users,
		lowStock,
	})
}
