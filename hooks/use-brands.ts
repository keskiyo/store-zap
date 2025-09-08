import { useEffect, useState } from 'react'

export const useBrands = (categoryId?: string) => {
	const [brands, setBrands] = useState<{ id: string; name: string }[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!categoryId) {
			setBrands([])
			setLoading(false)
			return
		}

		const fetchBrands = async () => {
			try {
				setLoading(true)
				setError(null)

				const response = await fetch(`/api/brands?categoryId=${categoryId}`)

				if (!response.ok) {
					throw new Error('Ошибка загрузки брендов')
				}

				const data = await response.json()
				setBrands(data)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Произошла ошибка')
				setBrands([])
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
