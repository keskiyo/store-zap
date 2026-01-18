import { calcCartItemTotalPrice } from '@/lib/calc-cart-item-total-price'
import { prisma } from '@/prisma/prisma-client'

export const updateCartTotalSum = async (cartId: number) => {
	// 1. Получаем товары корзины по ID (универсально для любого типа юзера)
	const cartItems = await prisma.cartProduct.findMany({
		where: {
			cartId: cartId,
		},
		include: {
			product: true,
		},
	})

	// 2. Считаем сумму
	const sum = cartItems.reduce(
		(acc, item) => acc + calcCartItemTotalPrice(item),
		0,
	)

	// 3. Обновляем корзину и сразу возвращаем обновленный объект
	return await prisma.cart.update({
		where: {
			id: cartId,
		},
		data: {
			sum,
		},
		include: {
			items: {
				orderBy: { createdAt: 'desc' },
				include: { product: true },
			},
		},
	})
}
