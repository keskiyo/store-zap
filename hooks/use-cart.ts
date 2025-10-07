import React from 'react'
import { useCartStore } from '@/store/cart'
import { CreateCartItemValues } from '../services/dto/cart.dto'
import { CartStateItem } from '@/lib/get-cart-details'

type ReturnProps = {
	sum: number
	items: CartStateItem[]
	loading: boolean
	updateItemCount: (id: number, count: number) => void
	removeCartItem: (id: number) => void
	addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (): ReturnProps => {
	const cartState = useCartStore(state => state)

	React.useEffect(() => {
		cartState.fetchCartItems()
	}, [])

	return cartState
}
