'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const CartSyncer = () => {
	const { status } = useSession()

	useEffect(() => {
		if (status === 'authenticated') {
			fetch('/api/auth/sync-cart', {
				method: 'POST',
			}).catch(err => console.error('Ошибка синхронизации корзины:', err))
		}
	}, [status])

	return null
}
