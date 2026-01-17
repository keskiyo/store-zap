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
		})

		if (anonymousCart) {
			const userId = Number(session.user.id)

			const existingUserCart = await prisma.cart.findFirst({
				where: {
					userId: userId,
				},
			})

			if (existingUserCart) {
				await prisma.cart.delete({
					where: {
						id: anonymousCart.id,
					},
				})
				console.log('[CART_SYNC] User had cart, deleted anonymous cart')
			} else {
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
