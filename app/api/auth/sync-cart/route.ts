import { authOptions } from '@/components/shared/constants/auth-options'
import { prisma } from '@/prisma/prisma-client'
import { getServerSession } from 'next-auth/next'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const cookieStore = await cookies()
		const cartToken = cookieStore.get('cartToken')?.value

		if (!cartToken) {
			return NextResponse.json(
				{ message: 'No cart token found' },
				{ status: 200 },
			)
		}

		const anonymousCart = await prisma.cart.findFirst({
			where: {
				token: cartToken,
			},
			include: {
				items: true, // Получаем товары, чтобы перенести их
			},
		})

		if (anonymousCart) {
			const userId = Number(session.user.id)
			const existingUserCart = await prisma.cart.findFirst({
				where: {
					userId: userId,
				},
			})

			if (existingUserCart) {
				// ЕСЛИ КОРЗИНА У ПОЛЬЗОВАТЕЛЯ УЖЕ ЕСТЬ:
				// Переносим товары из анонимной корзины в пользовательскую
				for (const anonItem of anonymousCart.items) {
					const existingItem = await prisma.cartProduct.findFirst({
						where: {
							cartId: existingUserCart.id,
							productId: anonItem.productId,
						},
					})

					if (existingItem) {
						// Товар уже есть у юзера — обновляем количество
						await prisma.cartProduct.update({
							where: { id: existingItem.id },
							data: {
								count: existingItem.count + anonItem.count,
							},
						})
					} else {
						// Товара нет у юзера — меняем корзину товара на юзерскую
						await prisma.cartProduct.update({
							where: { id: anonItem.id },
							data: { cartId: existingUserCart.id },
						})
					}
				}

				// После переноса товаров анонимная корзина пуста, теперь можно безопасно её удалить
				await prisma.cart.delete({
					where: {
						id: anonymousCart.id,
					},
				})
				console.log('[CART_SYNC] Items merged, anonymous cart deleted')
			} else {
				// ЕСЛИ КОРЗИНЫ У ПОЛЬЗОВАТЕЛЯ НЕТ:
				// Просто присваиваем ID пользователя анонимной корзине
				await prisma.cart.update({
					where: {
						id: anonymousCart.id,
					},
					data: {
						userId: userId,
					},
				})
				console.log('[CART_SYNC] Cart attached to user')
			}
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('[CART_SYNC] Error:', error)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
