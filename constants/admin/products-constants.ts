import { ColumnDef } from '../../types/admin/products'

export const INITIAL_COLUMNS: ColumnDef[] = [
	{ key: 'id', label: 'ID', isVisible: true },
	{ key: 'imageUrl', label: 'Изображение', isVisible: true },
	{ key: 'name', label: 'Название', isVisible: true },
	{ key: 'price', label: 'Цена', isVisible: true },
	{ key: 'article', label: 'Артикул', isVisible: true },
	{ key: 'brand', label: 'Бренд', isVisible: true },
	{ key: 'categoryId', label: 'Категория', isVisible: true },
	{ key: 'count', label: 'Количество', isVisible: true },
	{ key: 'createdAt', label: 'Дата создания', isVisible: false },
	{ key: 'updatedAt', label: 'Дата обновления', isVisible: false },
]
