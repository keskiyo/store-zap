'use client'

import { Button, Input } from '@/components/ui'
import { Search, Settings } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { AdminUsersTable } from './table/AdminUsersTable'
import { INITIAL_COLUMNS } from './table/constants'
import { CreateUserModal } from './table/CreateUserModal'
import { SettingsModal } from './table/SettingModal'
import { sortUsers } from './table/tableUtils'
import { ColumnDef, ColumnKey } from './table/types'
import { useAdminUsers } from './table/useAdminTableHook'

interface Props {
	className?: string
}

export const AdminUsers: React.FC<Props> = ({ className }) => {
	const { data: session } = useSession()
	const { users, loading, handleCreateUser, toggleBlock, handleDeleteUser } =
		useAdminUsers()

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [columns, setColumns] = useState<ColumnDef[]>(INITIAL_COLUMNS)
	const [sortConfig, setSortConfig] = useState<{
		key: ColumnKey
		direction: 'asc' | 'desc'
	} | null>(null)

	// Загрузка настроек из localStorage при монтировании (привязка к ID пользователя)
	useEffect(() => {
		// Если админ авторизован, используем его ID для ключа, иначе 'default'
		const userId = session?.user?.id || 'default'
		const storageKey = `admin-users-columns-${userId}`

		const savedColumns = localStorage.getItem(storageKey)
		if (savedColumns) {
			try {
				setColumns(JSON.parse(savedColumns))
			} catch (e) {
				console.error('Ошибка загрузки настроек колонок', e)
			}
		}
	}, [session?.user?.id])

	// Сохранение настроек в localStorage при их изменении
	useEffect(() => {
		const userId = session?.user?.id || 'default'
		const storageKey = `admin-users-columns-${userId}`

		// Сохраняем только если список колонок изменился от первоначального
		localStorage.setItem(storageKey, JSON.stringify(columns))
	}, [columns, session?.user?.id])

	// Фильтрация + Сортировка
	const processedUsers = useMemo(() => {
		let items = [...users]

		if (searchTerm) {
			const lowerTerm = searchTerm.toLowerCase()
			items = items.filter(
				user =>
					user.name.toLowerCase().includes(lowerTerm) ||
					user.email.toLowerCase().includes(lowerTerm),
			)
		}

		return sortUsers(items, sortConfig)
	}, [users, searchTerm, sortConfig])

	// Вычисляем видимые колонки
	const visibleColumns = columns.filter(c => c.isVisible)

	const requestSort = (key: ColumnKey) => {
		let direction: 'asc' | 'desc' = 'asc'
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'asc'
		) {
			direction = 'desc'
		}
		setSortConfig({ key, direction })
	}

	const toggleColumnVisibility = (key: ColumnKey) => {
		setColumns(prev =>
			prev.map(col =>
				col.key === key ? { ...col, isVisible: !col.isVisible } : col,
			),
		)
	}

	if (loading) return <div className='p-6'>Загрузка...</div>

	return (
		<div className={`bg-white p-6 rounded-lg shadow ${className || ''}`}>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
				<h1 className='text-2xl font-bold'>
					Управление пользователями
				</h1>
				{/* Строка поиска */}
				<div className='relative mt-2 md:mt-0'>
					<Search
						className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
						size={18}
					/>
					<Input
						type='text'
						placeholder='Поиск по имени или email'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='w-full md:w-[500px] pl-10 pr-4 py-2 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
					/>
				</div>

				<div className='flex gap-3 w-full md:w-auto'>
					<Button
						onClick={() => setIsSettingsModalOpen(true)}
						className='bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-500'
						title='Настроить колонки'
					>
						<Settings size={20} />
					</Button>

					<Button
						onClick={() => setIsCreateModalOpen(true)}
						className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
					>
						+ Добавить пользователя
					</Button>
				</div>
			</div>

			<AdminUsersTable
				users={processedUsers}
				visibleColumns={visibleColumns}
				sortConfig={sortConfig}
				onSort={requestSort}
				onBlock={toggleBlock}
				onDelete={handleDeleteUser}
			/>

			<CreateUserModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSubmit={handleCreateUser}
			/>

			<SettingsModal
				isOpen={isSettingsModalOpen}
				columns={columns}
				onClose={() => setIsSettingsModalOpen(false)}
				onToggle={toggleColumnVisibility}
			/>
		</div>
	)
}
