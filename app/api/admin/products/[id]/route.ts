import { parseProductFormData } from '@/lib/admin-product-form'
import { processProductImage } from '@/lib/admin-product-image'
import { prisma } from '@/prisma/prisma-client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unlink } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

// 1. ПОЛУЧИТЬ ТОВАР ПО ID
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params
		const productId = parseInt(id)

		if (isNaN(productId)) {
			return NextResponse.json(
				{ error: 'Некорректный ID товара' },
				{ status: 400 },
			)
		}

		const product = await prisma.product.findUnique({
			where: { id: productId },
			include: {
				category: true,
				// Загружаем характеристики
				specifications: {
					orderBy: {
						id: 'asc',
					},
				},
			},
		})

		if (!product) {
			return NextResponse.json(
				{ error: 'Товар не найден' },
				{ status: 404 },
			)
		}

		return NextResponse.json(product)
	} catch (error) {
		console.error('GET /api/admin/products/[id] Error:', error)
		return NextResponse.json(
			{ error: 'Ошибка получения товара' },
			{ status: 500 },
		)
	}
}

// 2. ОБНОВИТЬ ТОВАР
export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		// Извлекаем id из Promise
		const { id } = await params
		const productId = parseInt(id)

		if (isNaN(productId)) {
			return NextResponse.json(
				{ error: 'Некорректный ID товара' },
				{ status: 400 },
			)
		}

		// Проверяем существование товара
		const existingProduct = await prisma.product.findUnique({
			where: { id: productId },
		})

		if (!existingProduct) {
			return NextResponse.json(
				{ error: 'Товар не найден' },
				{ status: 404 },
			)
		}

		const formData = await request.formData()
		const imageFile = formData.get('imageUrl') as File | null

		const dto = parseProductFormData(formData)

		const imageUrl = await processProductImage({
			file: imageFile,
			oldImage: existingProduct.imageUrl,
		})

		const { specifications, ...productData } = dto

		await prisma.$transaction(async tx => {
			await tx.product.update({
				where: { id: productId },
				data: {
					...productData,
					imageUrl,
				},
			})

			await tx.productSpecification.deleteMany({
				where: { productId },
			})

			if (dto.specifications.length) {
				await tx.productSpecification.createMany({
					data: dto.specifications.map(s => ({
						...s,
						productId,
					})),
				})
			}
		})

		return NextResponse.json({ success: true })
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message ?? 'Ошибка обновления товара' },
			{ status: 400 },
		)
	}
}

// 3. УДАЛИТЬ ТОВАР
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		// Извлекаем id из Promise
		const { id } = await params
		const productId = parseInt(id)

		if (isNaN(productId)) {
			return NextResponse.json(
				{ error: 'Некорректный ID товара' },
				{ status: 400 },
			)
		}

		// Проверяем существование товара
		const existingProduct = await prisma.product.findUnique({
			where: { id: productId },
		})

		if (!existingProduct) {
			return NextResponse.json(
				{ error: 'Товар не найден' },
				{ status: 404 },
			)
		}

		// Удаляем изображение (если оно не дефолтное)
		if (
			existingProduct.imageUrl &&
			existingProduct.imageUrl !== '/tovars/Noimg.jpg'
		) {
			try {
				const imagePath = path.join(
					process.cwd(),
					'public',
					existingProduct.imageUrl,
				)
				await unlink(imagePath)
			} catch (error) {
				console.warn('Не удалось удалить изображение товара:', error)
			}
		}

		// Удаляем товар из БД
		// В текущей схеме для надежности можно удалить и характеристики, если не настроен cascade.
		await prisma.productSpecification.deleteMany({
			where: { productId: productId },
		})

		await prisma.product.delete({
			where: { id: productId },
		})

		return NextResponse.json(
			{ message: 'Товар успешно удален' },
			{ status: 200 },
		)
	} catch (error) {
		console.error('DELETE /api/admin/products/[id] Error:', error)

		// Проверяем, связан ли товар с другими записями
		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === 'P2003'
		) {
			return NextResponse.json(
				{
					error: 'Невозможно удалить товар, так как он связан с другими записями (корзины, заказы)',
				},
				{ status: 400 },
			)
		}

		return NextResponse.json(
			{ error: 'Ошибка при удалении товара' },
			{ status: 500 },
		)
	}
}
