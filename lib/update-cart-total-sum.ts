import { calcCartItemTotalPrice } from '@/lib/calc-cart-item-total-price'
import { prisma } from '@/prisma/prisma-client'

export const updateCartTotalSum = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			items: {
				orderBy: { createdAt: 'desc' },
				include: { product: true },
			},
		},
	})

	const sum = userCart?.items.reduce(
		(acc, item) => acc + calcCartItemTotalPrice(item),
		0
	)

	return await prisma.cart.update({
		where: {
			id: userCart?.id,
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
