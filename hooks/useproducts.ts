import { Api } from '@/services/api-client'
import { Product } from '@prisma/client'
import React from 'react'

interface ReturnProps {
	products: Product[]
	isLoading: boolean
}

export const useProducts = (): ReturnProps => {
	const [products, setproducts] = React.useState<Product[]>([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		async function fetchCategories() {
			try {
				setIsLoading(true)
				const products = await Api.products.getAll()
				setproducts(products)
			} finally {
				setIsLoading(false)
			}
		}
		fetchCategories()
	}, [])

	return { products, isLoading }
}
