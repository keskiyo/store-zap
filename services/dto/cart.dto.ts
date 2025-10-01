import { Cart, CartProduct, Category, Product } from '@prisma/client'

export type CartItemDTO = CartProduct & {
	product: Product
	category: Category
}

export interface CartDTO extends Cart {
	items: CartItemDTO[]
}

export interface CreateCartItemValues {
	productItemId: number
}
