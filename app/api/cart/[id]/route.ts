import { updateCartTotalSum } from '@/lib/update-cart-total-sum'
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
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json(
				{ error: 'Токен корзины не найден' },
				{ status: 400 },
			)
		}

		const cartProduct = await prisma.cartProduct.findFirst({
			where: {
				id: numberID,
			},
		})

		if (!cartProduct) {
			return NextResponse.json(
				{ error: 'Товар не найден' },
				{ status: 400 },
			)
		}

		await prisma.cartProduct.update({
			where: {
				id: numberID,
			},
			data: {
				count: data.count,
			},
		})

		const updateUserCart = await updateCartTotalSum(token)

		return NextResponse.json(updateUserCart)
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
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json(
				{ error: 'Токен корзины не найден' },
				{ status: 400 },
			)
		}

		const cartProduct = await prisma.cartProduct.findFirst({
			where: {
				id: numberID,
			},
		})

		if (!cartProduct) {
			return NextResponse.json(
				{ error: 'Товар не найден' },
				{ status: 400 },
			)
		}

		await prisma.cartProduct.delete({
			where: {
				id: numberID,
			},
		})

		const updateUserCart = await updateCartTotalSum(token)

		return NextResponse.json(updateUserCart)
	} catch (error) {
		console.log('CART_DELETE error', error)
		return NextResponse.json(
			{ error: 'Ошибка удаления товара из корзины' },
			{ status: 500 },
		)
	}
}
