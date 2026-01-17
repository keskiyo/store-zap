import { CartDTO } from '../services/dto/cart.dto'
import { calcCartItemTotalPrice } from './calc-cart-item-total-price'

export type CartStateItem = {
	id: number
	count: number
	name: string
	imageUrl: string
	price: number
	disabled?: boolean
	article: string
	brand: string
}

interface ReturnProps {
	items: CartStateItem[]
	sum: number
}

export const getCartDetails = (
	data: CartDTO | null | undefined,
): ReturnProps => {
	if (!data || !data.items) {
		return {
			items: [],
			sum: 0,
		}
	}

	const items = data.items.map(item => ({
		id: item.id,
		count: item.count,
		name: item.product.name,
		imageUrl: item.product.imageUrl,
		article: item.product.article,
		brand: item.product.brand,
		price: calcCartItemTotalPrice(item),
		disabled: false,
	})) as CartStateItem[]

	return {
		items,
		sum: data.sum,
	}
}
