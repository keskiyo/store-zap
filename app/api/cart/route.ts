import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { findOrCreateCart } from '@/lib/find-or-create-cart'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { updateCartTotalSum } from '@/lib/update-cart-total-sum'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ items: [], sum: 0 })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [{ token }],
			},
			include: {
				items: {
					orderBy: { createdAt: 'desc' },
					include: { product: true },
				},
			},
		})

		return NextResponse.json({ userCart })
	} catch (error) {
		console.error('GET_CART error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)

		const data = (await req.json()) as CreateCartItemValues

		const product = await prisma.product.findUnique({
			where: { id: data.productId },
		})

		if (!product) {
			return NextResponse.json({ message: 'Товар не найден' }, { status: 404 })
		}

		const findCartProduct = await prisma.cartProduct.findFirst({
			where: {
				cartId: userCart.id,
				productId: data.productId,
			},
		})

		// Если товар есть в корзине увеличиваем количество
		if (findCartProduct) {
			await prisma.cartProduct.update({
				where: {
					id: findCartProduct.id,
				},
				data: {
					count: findCartProduct.count + 1,
				},
			})
		} else {
			// Если товара в корзине нет создаем его
			await prisma.cartProduct.create({
				data: {
					cartId: userCart.id,
					productId: data.productId,
					count: 1,
				},
			})
		}

		const updateUserCart = await updateCartTotalSum(token)
		const resp = NextResponse.json(updateUserCart)
		resp.cookies.set('cartToken', token)
		return resp
	} catch (error) {
		console.error('POST_CART error', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		)
	}
}
