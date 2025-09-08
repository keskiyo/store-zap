import { Api } from '@/services/api-client'
import { Category } from '@prisma/client'
import React from 'react'

// Выводит данные по категориям
interface ReturnProps {
	categories: Category[]
}

export const useCategories = (): ReturnProps => {
	const [categories, setcategories] = React.useState<Category[]>([])

	React.useEffect(() => {
		async function fetchCategories() {
			try {
				const categories = await Api.categories.getAll()
				setcategories(categories)
			} catch (error) {
				console.log(error)
			}
		}
		fetchCategories()
	}, [])

	return { categories }
}
