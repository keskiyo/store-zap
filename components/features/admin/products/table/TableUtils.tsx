import {
	Product,
	ProductColumnKey,
	SortConfig,
} from '../../../../../types/admin/products'

// Сортировка массива товаров
export const sortProducts = (
	products: Product[],
	sortConfig: SortConfig | null,
): Product[] => {
	let sortableItems = [...products]
	if (sortConfig !== null) {
		sortableItems.sort((a, b) => {
			const aValue = a[sortConfig.key]
			const bValue = b[sortConfig.key]

			if (aValue === null || aValue === undefined) return 1
			if (bValue === null || bValue === undefined) return -1

			if (aValue < bValue) {
				return sortConfig.direction === 'asc' ? -1 : 1
			}
			if (aValue > bValue) {
				return sortConfig.direction === 'asc' ? 1 : -1
			}
			return 0
		})
	}
	return sortableItems
}

// Форматирование содержимого ячейки
export const renderCellContent = (product: Product, key: ProductColumnKey) => {
	// 1. Обработка картинки (виртуальное поле 'image')
	if (key === 'imageUrl') {
		return (
			<div className='w-10 h-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden'>
				{product.imageUrl ? (
					<img
						src={product.imageUrl}
						alt={product.name}
						className='w-full h-full object-cover'
					/>
				) : (
					<span className='text-xs text-gray-400'>No img</span>
				)}
			</div>
		)
	}

	// 2. Обработка цены
	if (key === 'price') {
		return `${Number(product.price).toLocaleString('ru-RU')} ₽`
	}

	// 3. Обработка количества (используем логику из первого блока, так как count в БД - это число)
	if (key === 'count') {
		return `${product.count} шт.`
	}

	// 4. Обработка категории (объект relation)
	if (key === 'category') {
		if (product.category && typeof product.category === 'object') {
			return product.category.name
		}
		return '-'
	}

	// 5. Обработка ID категории
	if (key === 'categoryId') {
		if (product.category && typeof product.category === 'object') {
			return product.category.name
		}
		return product.categoryId
	}

	// 6. Обработка спецификаций (массив объектов)
	if (key === 'specifications') {
		if (!product.specifications || product.specifications.length === 0) {
			return <span className='text-xs text-gray-400'>Нет хар-к</span>
		}
		return (
			<div className='text-xs text-gray-600'>
				{product.specifications.slice(0, 2).map(spec => (
					<div key={spec.id}>
						{spec.key}: {spec.value}
					</div>
				))}
			</div>
		)
	}

	// 7. Обработка дат (createdAt, updatedAt) - логика из второго блока
	if (key === 'createdAt' || key === 'updatedAt') {
		const value = product[key]
		if (!value) return '-'

		const date = new Date(value)
		return date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	// 8. Обработка обычных полей (name, brand, article и др.)
	const value = product[key as keyof Product]

	// Возвращаем строковое представление или дефолтное значение
	return String(value ?? '')
}
