import { CartStateItem } from '@/lib/get-cart-details'
import { useCartStore } from '@/store/cart'
import React from 'react'
import { CreateCartItemValues } from '../services/dto/cart.dto'

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
