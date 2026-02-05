'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const CartSyncer = () => {
	const { status } = useSession()
	const [hasSynced, setHasSynced] = useState(false)

	useEffect(() => {
		// Синхронизируем только один раз при аутентификации
		if (status === 'authenticated' && !hasSynced) {
			fetch('/api/auth/sync-cart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(response => {
					if (response.ok) {
						setHasSynced(true) // Помечаем как синхронизированное
						console.log('Корзина успешно синхронизирована')
					}
				})
				.catch(err =>
					console.error('Ошибка синхронизации корзины:', err),
				)
		}

		// Сбрасываем флаг при разлогине
		if (status === 'unauthenticated') {
			setHasSynced(false)
		}
	}, [status, hasSynced])

	return null
}
