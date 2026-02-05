import { updateCartTotalSum } from '@/lib/database/update-cart-total-sum'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params
		const numberID = Number(id)
		const data = (await req.json()) as { count: number }

		// Находим товар в корзине
		const cartProduct = await prisma.cartProduct.findUnique({
			where: {
				id: numberID,
			},
		})

		if (!cartProduct) {
			return NextResponse.json(
				{ error: 'Товар не найден' },
				{ status: 404 },
			)
		}

		if (data.count <= 0) {
			// Если количество 0 или меньше - удаляем товар
			await prisma.cartProduct.delete({
				where: { id: numberID },
			})
		} else {
			// Иначе обновляем количество
			await prisma.cartProduct.update({
				where: {
					id: numberID,
				},
				data: {
					count: data.count,
				},
			})
		}

		// ВАЖНО: Передаем cartProduct.cartId (ЧИСЛО), а не token (СТРОКА)
		const updatedCart = await updateCartTotalSum(cartProduct.cartId)

		return NextResponse.json(updatedCart)
	} catch (error) {
		console.log('CART_PATCH error', error)
		return NextResponse.json(
			{ error: 'Ошибка обновления корзины' },
			{ status: 500 },
		)
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params
		const numberID = Number(id)

		// Находим товар, чтобы знать, в какой корзине его пересчитывать
		const cartProduct = await prisma.cartProduct.findUnique({
			where: {
				id: numberID,
			},
		})

		if (!cartProduct) {
			return NextResponse.json(
				{ error: 'Товар не найден' },
				{ status: 404 },
			)
		}

		const cartId = cartProduct.cartId

		// Удаляем товар
		await prisma.cartProduct.delete({
			where: {
				id: numberID,
			},
		})

		// ВАЖНО: Передаем cartId (ЧИСЛО) для пересчета суммы
		const updatedCart = await updateCartTotalSum(cartId)

		return NextResponse.json(updatedCart)
	} catch (error) {
		console.log('CART_DELETE error', error)
		return NextResponse.json(
			{ error: 'Ошибка удаления товара из корзины' },
			{ status: 500 },
		)
	}
}
