'use client'

import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import React from 'react'
import toast from 'react-hot-toast'

interface Props {
	productId: number
	productName: string
	count: number
	className?: string
	children?: React.ReactNode
}

export const AddToCartButton: React.FC<Props> = ({
	productId,
	productName,
	count,
	className,
	children,
}) => {
	const addCartItem = useCartStore(state => state.addCartItem)
	const loading = useCartStore(state => state.loading)

	const isAvailable = count > 0

	const onSubmit = async () => {
		try {
			await addCartItem({
				productId: productId,
			})

			toast.success(`${productName} добавлена в корзину`)
		} catch (err) {
			toast.error('Не удалось добавить товар в корзину')
			console.error(err)
		}
	}

	return (
		<Button
			loading={loading}
			onClick={onSubmit}
			disabled={!isAvailable}
			className={cn(
				'font-bold rounded-lg transition-colors duration-200 flex items-center justify-center gap-1',
				isAvailable
					? 'bg-orange-400 text-white cursor-pointer hover:bg-orange-300'
					: 'bg-gray-300 text-gray-500 cursor-not-allowed',
				className,
			)}
		>
			{children || (isAvailable ? 'Добавить в корзину' : 'Нет в наличии')}
		</Button>
	)
}
