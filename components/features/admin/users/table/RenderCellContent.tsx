import { ColumnKey, User } from '../../../../../types/admin/users'

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
				<span className='text-red-600 font-bold text-xs'>
					Заблокирован
				</span>
			) : (
				<span className='text-green-600 font-bold text-xs'>
					Активен
				</span>
			)
		case 'createdAt':
		case 'updatedAt':
			// Безопасная проверка на строку перед созданием даты
			if (!value || typeof value !== 'string') return '-'

			const date = new Date(value)
			// Проверка валидности даты
			if (isNaN(date.getTime())) return '-'

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
