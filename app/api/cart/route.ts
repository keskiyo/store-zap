import { authOptions } from '@/components/shared/constants/auth-options'
import { findOrCreateCart } from '@/lib/find-or-create-cart'
import { updateCartTotalSum } from '@/lib/update-cart-total-sum'
import { prisma } from '@/prisma/prisma-client'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import crypto from 'crypto'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value
		const session = await getServerSession(authOptions)

		const conditions: any[] = []

		if (token) {
			conditions.push({ token })
		}

		if (session?.user?.id) {
			conditions.push({ userId: Number(session.user.id) })
		}

		if (conditions.length === 0) {
			return NextResponse.json({ items: [], sum: 0 })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: conditions,
			},
			include: {
				items: {
					orderBy: { createdAt: 'desc' },
					include: { product: true },
				},
			},
		})

		const response = NextResponse.json(userCart)

		if (userCart && userCart.token) {
			response.cookies.set('cartToken', userCart.token)
		}

		return response
	} catch (error) {
		console.error('GET_CART error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 },
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
			return NextResponse.json(
				{ message: 'Товар не найден' },
				{ status: 404 },
			)
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
			{ status: 500 },
		)
	}
}
