// app/api/admin/products/route.ts
import { prisma } from '@/prisma/prisma-client'
import { mkdir, writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

// 1. ПОЛУЧИТЬ СПИСОК ВСЕХ ТОВАРОВ
export async function GET() {
	try {
		const products = await prisma.product.findMany({
			include: {
				category: true,
				specifications: true,
			},
			orderBy: {
				id: 'asc',
			},
		})

		return NextResponse.json(products)
	} catch (error) {
		console.error('GET /api/admin/products Error:', error)
		return NextResponse.json(
			{ error: 'Ошибка получения товаров' },
			{ status: 500 },
		)
	}
}

// 2. СОЗДАТЬ НОВЫЙ ТОВАР
export async function POST(request: Request) {
	try {
		const formData = await request.formData()

		// Получение полей
		const name = formData.get('name') as string
		const brand = formData.get('brand') as string
		const article = formData.get('article') as string
		const price = parseFloat(formData.get('price') as string)
		const count = parseInt(formData.get('count') as string)
		const categoryId = parseInt(formData.get('categoryId') as string)
		const imageFile = formData.get('imageUrl') as File | null

		// Валидация
		if (!name || !brand || !article) {
			return NextResponse.json(
				{ error: 'Поля название, бренд и артикул обязательны' },
				{ status: 400 },
			)
		}

		if (isNaN(price) || price < 0) {
			return NextResponse.json(
				{ error: 'Некорректная цена' },
				{ status: 400 },
			)
		}

		if (isNaN(categoryId) || categoryId <= 0) {
			return NextResponse.json(
				{ error: 'Некорректная категория' },
				{ status: 400 },
			)
		}

		// Проверка существования категории
		const categoryExists = await prisma.category.findUnique({
			where: { id: categoryId },
		})

		if (!categoryExists) {
			return NextResponse.json(
				{ error: 'Указанная категория не существует' },
				{ status: 400 },
			)
		}

		// Проверка уникальности артикула
		const existingProduct = await prisma.product.findUnique({
			where: { article },
		})

		if (existingProduct) {
			return NextResponse.json(
				{ error: 'Товар с таким артикулом уже существует' },
				{ status: 409 },
			)
		}

		// Обработка изображения
		let imageUrl = '/tovars/Noimg.jpg'

		if (imageFile && imageFile.size > 0) {
			// Проверка типа файла
			if (!imageFile.type.startsWith('image/')) {
				return NextResponse.json(
					{ error: 'Файл должен быть изображением' },
					{ status: 400 },
				)
			}

			// Проверка размера (5MB)
			if (imageFile.size > 5 * 1024 * 1024) {
				return NextResponse.json(
					{ error: 'Размер изображения не должен превышать 5MB' },
					{ status: 400 },
				)
			}

			// Создание директории если нет
			const uploadDir = path.join(process.cwd(), 'public', 'tovars')
			await mkdir(uploadDir, { recursive: true })

			// Генерация уникального имени
			const fileExtension = imageFile.name.split('.').pop()
			const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExtension}`

			// Сохранение файла
			const bytes = await imageFile.arrayBuffer()
			const buffer = Buffer.from(bytes)
			const uploadPath = path.join(uploadDir, fileName)

			await writeFile(uploadPath, buffer)

			imageUrl = `/tovars/${fileName}`
		}

		// Создание товара в БД
		const product = await prisma.product.create({
			data: {
				name,
				brand,
				article,
				price,
				count: isNaN(count) ? 0 : Math.max(0, count),
				categoryId,
				imageUrl,
			},
		})

		return NextResponse.json(product, { status: 201 })
	} catch (error: any) {
		console.error('POST /api/admin/products Error:', error)

		if (error.code === 'P2002') {
			return NextResponse.json(
				{ error: 'Товар с таким артикулом уже существует' },
				{ status: 409 },
			)
		}

		return NextResponse.json(
			{ error: 'Ошибка при создании товара' },
			{ status: 500 },
		)
	}
}
