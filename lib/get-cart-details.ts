import { CartDTO } from '../services/dto/cart.dto'
import { calcCartItemTotalPrice } from './calc-cart-item-total-price'

export type CartStateItem = {
	id: number
	count: number
	name: string
	imageUrl: string
	price: number
	disabled?: boolean
}

interface ReturnProps {
	items: CartStateItem[]
	sum: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.items.map(item => ({
		id: item.id,
		count: item.count,
		name: item.product.name,
		imageUrl: item.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		disabled: false,
	})) as CartStateItem[]

	return {
		items,
		sum: data.sum,
	}
}
