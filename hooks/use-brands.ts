'use client'

import { useEffect, useState } from 'react'

export const useBrands = (categoryId?: string) => {
	const [brands, setBrands] = useState<{ id: string; name: string }[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!categoryId) {
			setBrands([])
			setLoading(false)
			return
		}

		const fetchBrands = async () => {
			try {
				setLoading(true)

				const brands = await fetch(`/api/brands?categoryId=${categoryId}`)

				const data = await brands.json()
				setBrands(data)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		fetchBrands()
	}, [categoryId])

	return {
		brands,
		loading,
	}
}
