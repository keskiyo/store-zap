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

		let cart

		// Сценарий 1: Пользователь авторизован
		if (session?.user?.id) {
			cart = await prisma.cart.findFirst({
				where: {
					userId: Number(session.user.id),
				},
				include: {
					items: {
						include: { product: true },
					},
				},
			})

			// Если корзины нет, создаем новую
			if (!cart) {
				const newToken = crypto.randomUUID()
				cart = await prisma.cart.create({
					data: {
						userId: Number(session.user.id),
						token: newToken,
					},
					include: {
						items: {
							include: { product: true },
						},
					},
				})
			} else if (!cart.token) {
				// Если токен пропал, обновляем
				await prisma.cart.update({
					where: { id: cart.id },
					data: { token: crypto.randomUUID() },
				})
			}

			// ОБЪЕДИНЕНИЕ КОРЗИН
			if (token) {
				const oldCart = await prisma.cart.findFirst({
					where: { token },
					include: {
						items: { include: { product: true } },
					},
				})

				if (
					oldCart &&
					oldCart.id !== cart.id &&
					oldCart.items.length > 0
				) {
					// Переносим товары
					for (const oldItem of oldCart.items) {
						const existingItem = cart.items.find(
							item => item.productId === oldItem.productId,
						)

						if (existingItem) {
							await prisma.cartProduct.update({
								where: { id: existingItem.id },
								data: {
									count: existingItem.count + oldItem.count,
								},
							})
						} else {
							await prisma.cartProduct.update({
								where: { id: oldItem.id },
								data: { cartId: cart.id },
							})
						}
					}

					// Удаляем старую корзину
					await prisma.cart.delete({ where: { id: oldCart.id } })

					// Пересчитываем сумму через нашу функцию и обновляем переменную cart
					cart = await updateCartTotalSum(cart.id)
				}
			}
		}
		// Сценарий 2: Гость
		else {
			if (!token) {
				return NextResponse.json({ items: [], sum: 0 })
			}

			cart = await prisma.cart.findFirst({
				where: { token },
				include: {
					items: {
						orderBy: { createdAt: 'desc' },
						include: { product: true },
					},
				},
			})
		}

		const response = NextResponse.json(cart)

		if (cart?.token) {
			response.cookies.set('cartToken', cart.token)
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
		const session = await getServerSession(authOptions)
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

		let cart

		// ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН
		if (session?.user?.id) {
			cart = await prisma.cart.findFirst({
				where: { userId: Number(session.user.id) },
			})

			if (!cart) {
				const newToken = crypto.randomUUID()
				cart = await prisma.cart.create({
					data: {
						userId: Number(session.user.id),
						token: newToken,
					},
				})
				token = newToken
			}
		}
		// ЕСЛИ ПОЛЬЗОВАТЕЛЬ ГОСТЬ (Упрощаем код через findOrCreateCart)
		else {
			if (!token) {
				token = crypto.randomUUID()
			}

			// Используем вашу функцию для поиска или создания корзины гостя
			cart = await findOrCreateCart(token)
		}

		const findCartProduct = await prisma.cartProduct.findFirst({
			where: {
				cartId: cart.id,
				productId: data.productId,
			},
		})

		if (findCartProduct) {
			await prisma.cartProduct.update({
				where: { id: findCartProduct.id },
				data: { count: findCartProduct.count + 1 },
			})
		} else {
			await prisma.cartProduct.create({
				data: {
					cartId: cart.id,
					productId: data.productId,
					count: 1,
				},
			})
		}

		// Пересчитываем сумму и получаем обновленную корзину
		const updatedCart = await updateCartTotalSum(cart.id)

		const response = NextResponse.json(updatedCart)
		response.cookies.set('cartToken', token || updatedCart.token)
		return response
	} catch (error) {
		console.error('POST_CART error', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 },
		)
	}
}
