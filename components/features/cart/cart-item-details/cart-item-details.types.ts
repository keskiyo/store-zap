export interface CartItemProps {
	id: number
	name: string
	article: string
	brand: string
	price: number
	imageUrl: string
	count: number
	disabled?: boolean
}
