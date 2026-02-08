import React from 'react'

import { CartStateItem } from '@/lib/database/get-cart-details'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { useCartStore } from '@/store/cart'

type ReturnProps = {
	sum: number
	items: CartStateItem[]
	loading: boolean
	updateItemCount: (id: number, count: number) => void
	removeCartItem: (id: number) => void
	addCartItem: (values: CreateCartItemValues) => void
	error: boolean
}

export const useCart = (): ReturnProps => {
	const cartState = useCartStore(state => state)

	React.useEffect(() => {
		cartState.fetchCartItems()
	}, [])

	return cartState
}
