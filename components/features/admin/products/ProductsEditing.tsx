'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ProductForm } from './table/ProductForm'
import { Product } from './table/types'

interface Category {
	id: number
	name: string
	img?: string | null
}

interface Props {
	productId: string
}

export const EditProductPage: React.FC<Props> = ({ productId }) => {
	const router = useRouter()

	const [loading, setLoading] = useState(true)
	const [data, setData] = useState<any>(null)
	const [categories, setCategories] = useState<Category[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Параллельная загрузка
				const [productRes, catRes] = await Promise.all([
					fetch(`/api/admin/products/${productId}`),
					fetch('/api/admin/categories'),
				])

				if (!productRes.ok) throw new Error('Ошибка загрузки товара')
				if (!catRes.ok) throw new Error('Ошибка загрузки категорий')

				const productData: Product = await productRes.json()
				const categoriesData: Category[] = await catRes.json()

				// Формируем начальные данные для формы
				setData({
					...productData,
					categoryId: productData.categoryId || 0, // приведение типов
					specifications: productData.specifications || [],
				})

				setCategories(categoriesData)
			} catch (err) {
				console.error(err)
				toast.error('Не удалось загрузить данные')
				router.push('/admin/products')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [productId, router])

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>Загрузка...</div>
			</div>
		)
	}

	if (!data) return null

	return (
		<ProductForm
			productId={productId}
			initialData={data}
			categories={categories}
		/>
	)
}
