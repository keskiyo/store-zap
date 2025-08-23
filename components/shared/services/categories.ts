import { axiosInstance } from './instance'
import { ApiRoutes } from './constants'
import { Category } from '@prisma/client'

export const getAll = async (): Promise<Category[]> => {
	return (await axiosInstance.get<Category[]>(ApiRoutes.CATEGORIES)).data
}
