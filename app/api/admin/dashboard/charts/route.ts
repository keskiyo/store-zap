import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)

		const from = searchParams.get('from')
		const to = searchParams.get('to')

		/* ---------------- DATE FILTER ---------------- */

		const dateFilter: any = {}
		if (from && to) {
			dateFilter.createdAt = {
				gte: new Date(from),
				lte: new Date(to),
			}
		}

		/* ---------------- REVENUE (CUMULATIVE) ---------------- */

		const revenueRaw = await prisma.order.findMany({
			where: {
				status: 'SUCCEEDED',
				...dateFilter,
			},
			select: {
				createdAt: true,
				totalAmount: true,
			},
			orderBy: { createdAt: 'asc' },
		})

		const dailyRevenueMap = new Map<string, number>()

		revenueRaw.forEach(order => {
			const dateKey = order.createdAt.toISOString().slice(0, 10)
			const amount = Number(order.totalAmount || 0)

			dailyRevenueMap.set(
				dateKey,
				(dailyRevenueMap.get(dateKey) || 0) + amount,
			)
		})

		const revenue = Array.from(dailyRevenueMap, ([date, value]) => ({
			date,
			value,
		})).sort((a, b) => a.date.localeCompare(b.date))

		/* ---------------- USERS ---------------- */

		const users = await prisma.user.findMany({
			where: dateFilter, // Фильтруем пользователей по дате регистрации
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
			},
			orderBy: { createdAt: 'asc' },
		})

		/* ---------------- ORDERS STATUS ---------------- */

		const ordersStatusRaw = await prisma.order.groupBy({
			by: ['status'],
			where: dateFilter, // Фильтруем заказы
			_count: { status: true },
		})

		const ordersStatus = ordersStatusRaw.map(o => ({
			status: o.status,
			count: o._count.status,
		}))

		/* ---------------- TOP PRODUCTS ---------------- */

		const orders = await prisma.order.findMany({
			where: {
				status: 'SUCCEEDED',
				...dateFilter,
			},
			select: { items: true },
		})

		const productMap: Record<string, number> = {}

		for (const order of orders) {
			if (!order.items) continue

			let items: any[] = []
			try {
				if (typeof order.items === 'string') {
					items = JSON.parse(order.items)
				} else {
					items = Array.isArray(order.items)
						? order.items
						: JSON.parse(JSON.stringify(order.items))
				}
			} catch {
				continue
			}

			for (const item of items) {
				const name = item?.name || item?.product?.name
				if (!name) continue

				const qty = item.quantity || item.count || 1
				productMap[name] = (productMap[name] || 0) + qty
			}
		}

		const topProductsBase = Object.entries(productMap)
			.map(([name, sold]) => ({ name, sold }))
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10)

		const topProducts = await Promise.all(
			topProductsBase.map(async p => {
				const product = await prisma.product.findFirst({
					where: { name: p.name },
					select: {
						id: true,
						name: true,
						price: true,
						categoryId: true, // Не забываем добавить ID категории для цвета
					},
				})

				return {
					id: product?.id || 0,
					name: p.name,
					sold: p.sold,
					revenue: p.sold * Number(product?.price || 0),
					categoryId: product?.categoryId || null,
				}
			}),
		)

		/* ---------------- CATEGORIES ---------------- */

		const categoriesRaw = await prisma.category.findMany({
			include: { products: true },
		})

		const categories = categoriesRaw.map(cat => ({
			name: cat.name,
			count: cat.products.length,
		}))

		/* ---------------- RESPONSE ---------------- */

		return NextResponse.json({
			revenue,
			ordersStatus,
			topProducts,
			categories,
			users,
		})
	} catch (error) {
		console.error('DASHBOARD CHARTS ERROR:', error)
		return NextResponse.json(
			{ error: 'Dashboard charts error' },
			{ status: 500 },
		)
	}
}
