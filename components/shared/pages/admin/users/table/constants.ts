import { ColumnDef } from './types'

export const INITIAL_COLUMNS: ColumnDef[] = [
	{ key: 'id', label: 'Id', isVisible: true },
	{ key: 'name', label: 'Имя и Фамилия', isVisible: true },
	{ key: 'email', label: 'Email', isVisible: true },
	{ key: 'verified', label: 'Подтверждение аккаунта', isVisible: true },
	{ key: 'role', label: 'Роль пользователя', isVisible: true },
	{ key: 'isBlocked', label: 'Статус аккаунта', isVisible: true },
	{
		key: 'createdAt',
		label: 'Дата создания',
		isVisible: false,
	},
	{
		key: 'updatedAt',
		label: 'Дата редактирования',
		isVisible: false,
	},
]
