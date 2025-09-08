import { Api } from '@/services/api-client'
import { Product } from '@prisma/client'
import React from 'react'

// Выводит данные по категориям
interface ReturnProps {
	products: Product[]
}

export const useProducts = (): ReturnProps => {
	const [products, setproducts] = React.useState<Product[]>([])

	React.useEffect(() => {
		async function fetchCategories() {
			try {
				const products = await Api.products.getAll()
				setproducts(products)
			} catch (error) {
				console.log(error)
			}
		}
		fetchCategories()
	}, [])

	return { products }
}
