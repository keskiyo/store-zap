import { authOptions } from '@/components/shared/constants/auth-options'
import { prisma } from '@/prisma/prisma-client'
import { randomUUID } from 'crypto'
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

		const userId = Number(session.user.id)

		// Находим анонимную корзину
		const anonymousCart = await prisma.cart.findFirst({
			where: {
				token: cartToken,
				userId: null,
			},
			include: {
				items: true,
			},
		})

		// Если анонимной корзины нет
		if (!anonymousCart) {
			// Удаляем cookie, так как корзина не найдена
			cookieStore.delete('cartToken')
			return NextResponse.json({ success: true })
		}

		// Проверяем, есть ли у пользователя корзина с этим же token (что означает, она уже была привязана)
		const alreadyAttachedCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						id: anonymousCart.id,
						userId: userId, // Если корзина уже привязана к этому пользователю
					},
					{
						token: cartToken,
						userId: userId, // Если другая корзина с таким же токеном уже привязана
					},
				],
			},
		})

		if (alreadyAttachedCart) {
			// Уже синхронизировано - удаляем cookie
			cookieStore.delete('cartToken')
			return NextResponse.json({
				success: true,
				message: 'Cart already synchronized',
			})
		}

		// Находим корзину пользователя
		let userCart = await prisma.cart.findFirst({
			where: {
				userId: userId,
			},
			include: {
				items: true,
			},
		})

		// Если корзины пользователя нет, просто привязываем анонимную корзину к пользователю
		if (!userCart) {
			await prisma.cart.update({
				where: {
					id: anonymousCart.id,
				},
				data: {
					userId: userId,
					token: randomUUID(), // Генерируем новый токен для привязанной корзины
				},
			})

			// Удаляем cookie после успешной синхронизации
			cookieStore.delete('cartToken')

			console.log('[CART_SYNC] Anonymous cart attached to user')

			return NextResponse.json({
				success: true,
				message: 'Cart attached to user',
			})
		}

		// Проверяем, есть ли уже такие товары в пользовательской корзине
		const existingCommonItems = anonymousCart.items.filter(anonItem =>
			userCart!.items.some(
				userItem =>
					userItem.productId === anonItem.productId &&
					userItem.count >= anonItem.count, // Если количество уже равно или больше
			),
		)

		// Если большинство товаров уже есть в корзине пользователя, считаем что синхронизация уже была
		if (
			existingCommonItems.length > 0 &&
			existingCommonItems.length === anonymousCart.items.length
		) {
			// Все товары уже есть - удаляем анонимную корзину
			await prisma.$transaction(async tx => {
				// Удаляем товары из анонимной корзины
				await tx.cartProduct.deleteMany({
					where: {
						cartId: anonymousCart.id,
					},
				})

				// Удаляем саму анонимную корзину
				await tx.cart.delete({
					where: {
						id: anonymousCart.id,
					},
				})
			})

			// Удаляем cookie
			cookieStore.delete('cartToken')

			return NextResponse.json({
				success: true,
				message: 'Items already synchronized',
			})
		}

		// Используем транзакцию
		await prisma.$transaction(async tx => {
			// Переносим товары из анонимной корзины
			for (const anonItem of anonymousCart.items) {
				const existingItem = userCart!.items.find(
					item => item.productId === anonItem.productId,
				)

				if (existingItem) {
					// Обновляем количество существующего товара
					await tx.cartProduct.update({
						where: { id: existingItem.id },
						data: {
							count: existingItem.count + anonItem.count,
						},
					})
				} else {
					// Создаем новую запись в корзине пользователя
					await tx.cartProduct.create({
						data: {
							cartId: userCart!.id,
							productId: anonItem.productId,
							count: anonItem.count,
						},
					})
				}
			}

			// Удаляем товары из анонимной корзины
			await tx.cartProduct.deleteMany({
				where: {
					cartId: anonymousCart.id,
				},
			})

			// Удаляем саму анонимную корзину
			await tx.cart.delete({
				where: {
					id: anonymousCart.id,
				},
			})
		})

		// Удаляем cookie после успешной синхронизации
		cookieStore.delete('cartToken')

		console.log('[CART_SYNC] Items merged, anonymous cart deleted')

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('[CART_SYNC] Error:', error)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
