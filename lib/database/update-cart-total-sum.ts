import { calcCartItemTotalPrice } from '@/lib/calculations/calc-cart-item-total-price'
import { prisma } from '@/prisma/prisma-client'

export const updateCartTotalSum = async (cartId: number) => {
	const cartItems = await prisma.cartProduct.findMany({
		where: {
			cartId: cartId,
		},
		include: {
			product: true,
		},
	})

	const sum = cartItems.reduce(
		(acc, item) => acc + calcCartItemTotalPrice(item),
		0,
	)

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
