'use client'

import React, { Suspense } from 'react'
import { cn } from '@/lib/utils'
import { Filter, ProductsGroupList } from '@/components/shared'
import { useSearchParams } from 'next/navigation'

interface Props {
	className?: string
	categoryId: number
}

export const TovarCategory: React.FC<Props> = ({ className, categoryId }) => {
	const searchParams = useSearchParams()
	const [products, setProducts] = React.useState<any[]>([])
	const [loading, setLoading] = React.useState(true)

	// Функция для загрузки товаров с учетом фильтров
	const fetchProducts = React.useCallback(async () => {
		setLoading(true)
		try {
			// Формируем URL с параметрами
			const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/products`)
			url.searchParams.set('categoryId', categoryId.toString())

			const brands = searchParams.get('brands')
			const priceFrom = searchParams.get('priceFrom')
			const priceTo = searchParams.get('priceTo')

			if (brands) {
				url.searchParams.set('brands', brands)
			}
			if (priceFrom) {
				url.searchParams.set('priceFrom', priceFrom)
			}
			if (priceTo) {
				url.searchParams.set('priceTo', priceTo)
			}

			const response = await fetch(url.toString(), {
				cache: 'no-store',
			})
			const data = await response.json()
			setProducts(data)
		} catch (error) {
			console.error('Ошибка поиска товаров:', error)
			setProducts([])
		} finally {
			setLoading(false)
		}
	}, [categoryId, searchParams])

	// Загружаем товары только при изменении параметров URL
	React.useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	return (
		<>
			<div className={cn('flex flex-col', className)}>
				<div className='mt-10 pb-14'>
					<div className='flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-[80px]'>
						<div className='hidden lg:block flex-shrink-0 w-[250px]'>
							<Suspense>
								<Filter />
							</Suspense>
						</div>
						<div className='flex-1 min-w-0'>
							<ProductsGroupList
								categoryId={categoryId}
								products={products}
								loading={loading}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
