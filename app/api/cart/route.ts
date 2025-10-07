import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { findOrCreateCart } from '@/lib/find-or-create-cart'
import { CreateCartItemValues } from '@/services/dto/cart.dto'

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

		const newCart = await findOrCreateCart(token)

		const data = (await req.json()) as CreateCartItemValues

		const findCartProduct = await prisma.cartProduct.findFirst({
			where: {
				cartId: newCart.id,
				productId: data.productId,
			},
		})
	} catch (error) {
		console.error('POST_CART error', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		)
	}
}
