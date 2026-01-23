import { ColumnKey, SortConfig, User } from './types'

// Сортировка массива пользователей
export const sortUsers = (
	users: User[],
	sortConfig: SortConfig | null,
): User[] => {
	let sortableItems = [...users]
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
export const renderCellContent = (user: User, key: ColumnKey) => {
	const value = user[key]

	switch (key) {
		case 'verified':
			return value ? (
				<span className='text-green-600 flex items-center gap-1'>
					Да
				</span>
			) : (
				<span className='text-red-500 flex items-center gap-1'>
					Нет
				</span>
			)
		case 'role':
			return (
				<span
					className={`px-2 py-1 rounded text-xs ${
						value === 'ADMIN'
							? 'bg-purple-500 text-white'
							: 'bg-gray-100 text-gray-800'
					}`}
				>
					{value}
				</span>
			)
		case 'isBlocked':
			return value ? (
				<span className='text-red-600 font-bold text-xs'>Да</span>
			) : (
				<span className='text-green-600 font-bold text-xs'>Нет</span>
			)
		case 'createdAt':
		case 'updatedAt':
			if (!value) return '-'

			const date = new Date(value as string)
			return date.toLocaleDateString('ru-RU', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			})
		default:
			return String(value ?? '')
	}
}
