'use client'

import { useMemo, useState } from 'react'
import { sortProducts } from './TableUtils'
import { Product, ProductColumnKey } from './types'

export const useProductFilter = (products: Product[]) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [sortConfig, setSortConfig] = useState<{
		key: ProductColumnKey
		direction: 'asc' | 'desc'
	} | null>(null)

	const processedProducts = useMemo(() => {
		let items = [...products]

		if (searchTerm) {
			const lowerTerm = searchTerm.toLowerCase()
			items = items.filter(
				product =>
					product.name.toLowerCase().includes(lowerTerm) ||
					product.brand.toLowerCase().includes(lowerTerm) ||
					product.article.toLowerCase().includes(lowerTerm) ||
					product.price.toString().includes(lowerTerm) ||
					product.categoryId.toString().includes(lowerTerm) ||
					product.id.toString().includes(lowerTerm),
			)
		}

		return sortProducts(items, sortConfig)
	}, [products, searchTerm, sortConfig])

	const requestSort = (key: ProductColumnKey) => {
		let direction: 'asc' | 'desc' = 'asc'
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'asc'
		) {
			direction = 'desc'
		}
		setSortConfig({ key, direction })
	}

	return {
		searchTerm,
		setSearchTerm,
		sortConfig,
		requestSort,
		processedProducts,
	}
}
