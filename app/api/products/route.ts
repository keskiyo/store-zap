import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const categoryId = searchParams.get('categoryId')
		const brands = searchParams.get('brands') // фильтр по брендам числовые ID (1, 2 , 3 ...)
		const priceFrom = searchParams.get('priceFrom') // цена от
		const priceTo = searchParams.get('priceTo') // цена до

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
		//получаем бренды выбранной категории
		const brandResults = await prisma.product.findMany({
			where: { categoryId: categoryIdNum },
			select: { brand: true },
			distinct: ['brand'],
			orderBy: { brand: 'asc' },
		})

		// создаем индекс -> название бренда
		const brandMapping = brandResults.map(item => item.brand)
		console.log('Доступные бренды:', brandMapping)

		// Создаем объект для условий фильтрации
		const where: any = {
			categoryId: categoryIdNum,
		}

		// Добавляем фильтр по брендам если указан
		if (brands) {
			const brandIds = brands.split(',').filter(name => name.trim() !== '')
			const brandNames = brandIds
				.map(id => {
					const index = parseInt(id) - 1 // ID начинаются с 1, индексы с 0
					return brandMapping[index]
				})
				.filter(name => name !== undefined)

			console.log('Фильтрация по бренд ID:', brandNames)

			if (brandNames.length > 0) {
				where.brand = { in: brandNames }
			}
		}

		// Добавляем фильтр по цене если указан
		if (priceFrom || priceTo) {
			where.price = {}

			if (priceFrom) {
				const priceFromNum = parseFloat(priceFrom)
				if (!isNaN(priceFromNum)) {
					where.price.gte = priceFromNum
				}
			}

			if (priceTo) {
				const priceToNum = parseFloat(priceTo)
				if (!isNaN(priceToNum)) {
					where.price.lte = priceToNum
				}
			}
		}

		const products = await prisma.product.findMany({
			where,
			orderBy: {
				name: 'asc',
			},
		})
		console.log(`Найдено ${products.length} товаров`)
		return NextResponse.json(products)
	} catch (error) {
		console.error('Database error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
