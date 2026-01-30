import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Product } from './types'

export const useAdminProducts = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)

	const fetchProducts = async () => {
		try {
			const res = await fetch('/api/admin/products')
			if (!res.ok) throw new Error('Ошибка сети')
			const data: Product[] = await res.json()
			setProducts(data)
		} catch (e) {
			console.error(e)
			toast.error('Не удалось загрузить товары')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	const handleCreateProduct = async (formData: FormData) => {
		try {
			const response = await fetch('/api/admin/products', {
				method: 'POST',
				body: formData,
				// Не устанавливаем Content-Type, браузер сам установит с boundary
			})

			if (response.ok) {
				const newProduct = await response.json()
				setProducts(prev => [...prev, newProduct])
				fetchProducts() // Обновляем список
				return true
			} else {
				const error = await response.json()
				toast.error(error.error || 'Ошибка при добавлении товара')
				return false
			}
		} catch (error) {
			console.error('Ошибка создания товара:', error)
			toast.error('Ошибка сети при добавлении товара')
			return false
		}
	}

	const handleDeleteProduct = async (
		id: number,
		name: string,
	): Promise<boolean> => {
		if (
			!confirm(
				`Вы уверены, что хотите удалить товар ${name}? Это действие необратимо.`,
			)
		) {
			return false
		}

		try {
			const res = await fetch(`/api/admin/products/${id}`, {
				method: 'DELETE',
			})

			if (res.ok) {
				fetchProducts()
				return true
			}
			return false
		} catch (error) {
			toast.error('Ошибка сети')
			return false
		}
	}

	return {
		products,
		loading,
		handleCreateProduct,
		handleDeleteProduct,
		fetchProducts,
	}
}
