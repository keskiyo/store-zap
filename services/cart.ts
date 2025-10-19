import { axiosInstance } from './instance'
import { CartDTO, CreateCartItemValues } from './dto/cart.dto'

export const getCart = async (): Promise<CartDTO> => {
	return (await axiosInstance.get<CartDTO>('/cart')).data
}

export const updateItemCount = async (
	productId: number,
	count: number
): Promise<CartDTO> => {
	return (await axiosInstance.patch<CartDTO>('/cart/' + productId, { count }))
		.data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
	return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data
}

export const addCartItem = async (
	values: CreateCartItemValues
): Promise<CartDTO> => {
	return (await axiosInstance.post<CartDTO>('/cart', values)).data
}
