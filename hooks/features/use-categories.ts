import { Api } from '@/services/api-client'
import { Category } from '@prisma/client'
import React from 'react'

interface ReturnProps {
	categories: Category[]
	isLoading: boolean
}

export const useCategories = (): ReturnProps => {
	const [categories, setcategories] = React.useState<Category[]>([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		const fetchCategories = async () => {
			try {
				setIsLoading(true)
				const categories = await Api.categories.getAll()
				setcategories(categories)
			} finally {
				setIsLoading(false)
			}
		}
		fetchCategories()
	}, [])

	return { categories, isLoading }
}
