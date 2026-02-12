import { create } from 'zustand'

import { CartStateItem, getCartDetails } from '@/lib/database/get-cart-details'
import { Api } from '@/services/api-client'
import { CreateCartItemValues } from '@/services/dto/cart.dto'

export interface CartState {
	loading: boolean
	error: boolean
	sum: number
	items: CartStateItem[]

	/* Получение товаров из корзины */
	fetchCartItems: () => Promise<void>

	/* Запрос на обновление количества товара */
	updateItemCount: (id: number, count: number) => Promise<void>

	/* Запрос на добавление товара в корзину */
	addCartItem: (values: CreateCartItemValues) => Promise<void>

	/* Запрос на удаление товара из корзины */
	removeCartItem: (id: number) => Promise<void>

	/* Сброс корзины к начальному состоянию */
	resetCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	loading: true,
	sum: 0,

	resetCart: () => {
		set({
			items: [],
			sum: 0,
			loading: false,
			error: false,
		})
	},

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.getCart()
			if (!data) {
				set({ items: [], sum: 0 })
				return
			}
			set(getCartDetails(data))
		} catch (error) {
			console.error('[Cart] ${methodName} error:', error)
		} finally {
			set({ loading: false })
		}
	},

	updateItemCount: async (id: number, count: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.updateItemCount(id, count)
			if (data) {
				set(getCartDetails(data))
			}
		} catch (error) {
			console.error('[Cart] ${methodName} error:', error)
		} finally {
			set({ loading: false })
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set(state => ({
				loading: true,
				error: false,
				items: state.items.map(item =>
					item.id === id ? { ...item, disabled: true } : item,
				),
			}))
			const data = await Api.cart.removeCartItem(id)
			if (data) {
				set(getCartDetails(data))
			}
		} catch (error) {
			console.error('[Cart] ${methodName} error:', error)
		} finally {
			set(state => ({
				loading: false,
				items: state.items.map(item => ({ ...item, disabled: false })),
			}))
		}
	},

	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.addCartItem(values)
			if (data) {
				set(getCartDetails(data))
			}
		} catch (error) {
			console.error('[Cart] ${methodName} error:', error)
		} finally {
			set({ loading: false })
		}
	},
}))
