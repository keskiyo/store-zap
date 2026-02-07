import { prisma } from '@/prisma/prisma-client'
import { OrderStatus } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)

		const from = searchParams.get('from')
		const to = searchParams.get('to')
		const status = searchParams.get('status') as OrderStatus | 'ALL'
		const category = searchParams.get('category')

		const orderWhere: any = {
			...(status && status !== 'ALL' && { status }),
			...(from &&
				to && {
					createdAt: {
						gte: new Date(from),
						lte: new Date(to),
					},
				}),
		}

		const orders = await prisma.order.findMany({
			where: orderWhere,
		})

		const revenue = orders.reduce((acc, o) => acc + o.totalAmount, 0)

		let usersCount
		if (from && to) {
			usersCount = await prisma.user.count({
				where: {
					createdAt: {
						gte: new Date(from),
						lte: new Date(to),
					},
				},
			})
		} else {
			usersCount = await prisma.user.count()
		}

		const carts = await prisma.cart.count()

		const aov = orders.length ? revenue / orders.length : 0

		const conversionRate = carts
			? Number(((orders.length / carts) * 100).toFixed(2))
			: 0

		const lowStock = await prisma.product.count({
			where: {
				count: { lte: 5 },
				...(category &&
					category !== 'ALL' && {
						categoryId: Number(category),
					}),
			},
		})

		return NextResponse.json({
			revenue,
			orders: orders.length,
			users: usersCount,
			newUsers: usersCount,
			carts,
			aov,
			conversionRate,
			lowStock,
		})
	} catch (e) {
		return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
	}
}
