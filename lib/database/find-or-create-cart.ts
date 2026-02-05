import { prisma } from '@/prisma/prisma-client'

export const findOrCreateCart = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: { token },
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	})

	if (userCart) {
		return userCart
	}

	return await prisma.cart.create({
		data: {
			token,
		},
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	})
}
