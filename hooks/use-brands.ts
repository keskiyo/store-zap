'use client'

import { useEffect, useState } from 'react'

interface Brand {
	id: string
	name: string
}

interface UseBrandsResult {
	brands: Brand[]
	loading: boolean
	error: string | null
}

export const useBrands = (categoryId?: string): UseBrandsResult => {
	const [brands, setBrands] = useState<Brand[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!categoryId) {
			setBrands([])
			setLoading(false)
			setError(null)
			return
		}

		const fetchBrands = async () => {
			try {
				setLoading(true)
				setError(null)

				const response = await fetch(
					`/api/brands?categoryId=${categoryId}`,
				)

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const data = await response.json()
				setBrands(data)
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Unknown error'
				setError(errorMessage)
				console.log('Error fetching brands:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchBrands()
	}, [categoryId])

	return {
		brands,
		loading,
		error,
	}
}
