import { ColumnDef } from '@/components/features/admin/products/table/types'

export const INITIAL_COLUMNSS: ColumnDef[] = [
	{ key: 'id', label: 'ID', isVisible: true },
	{ key: 'imageUrl', label: 'Фото', isVisible: true },
	{ key: 'article', label: 'Артикул', isVisible: true },
	{ key: 'name', label: 'Название', isVisible: true },
	{ key: 'brand', label: 'Бренд', isVisible: true },
	{ key: 'price', label: 'Цена', isVisible: true },
	{ key: 'count', label: 'Остаток', isVisible: true },
	{ key: 'categoryId', label: 'ID Категории', isVisible: false },
	{ key: 'createdAt', label: 'Дата создания', isVisible: false },
	{ key: 'updatedAt', label: 'Дата обновления', isVisible: false },
]
