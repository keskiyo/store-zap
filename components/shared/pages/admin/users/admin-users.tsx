'use client'

import { Button } from '@/components/ui'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { Settings } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SearchBar } from '../../another/search-admin-input'
import { AdminUsersTable } from './table/AdminUsersTable'
import { CreateUserModal } from './table/CreateUserModal'
import { SettingsModal } from './table/SettingModal'
import { useAdminUsers } from './table/useAdminTableHook'
import { useColumnSettings } from './table/useColumnSettings'
import { useUsersFilter } from './table/useUserFilters'

interface Props {
	className?: string
}

export const AdminUsers = ({ className }: Props) => {
	const { users, loading, handleCreateUser, toggleBlock, handleDeleteUser } =
		useAdminUsers()
	const { columns, toggleColumnVisibility, resetToDefault } =
		useColumnSettings()
	const {
		searchTerm,
		setSearchTerm,
		processedUsers,
		sortConfig,
		requestSort,
	} = useUsersFilter(users)
	const { confirmDialog, showDialog, hideDialog } = useConfirmDialog()

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

	// Фильтруем только видимые колонки
	const visibleColumns = useMemo(() => {
		return columns.filter(col => col.isVisible)
	}, [columns])

	const openBlockModal = (id: number, currentStatus: boolean) => {
		showDialog({
			title: 'Блокировка пользователя',
			description: currentStatus
				? 'Вы уверены, что хотите разблокировать пользователя?'
				: 'Вы уверены, что хотите заблокировать пользователя?',
			variant: 'warning',
			onConfirm: async () => {
				await toggleBlock(id, currentStatus)
				hideDialog()
			},
		})
	}

	const openDeleteModal = (id: number, name: string) => {
		showDialog({
			title: 'Удаление пользователя',
			description: `Вы уверены, что хотите удалить пользователя "${name}"? Это действие необратимо.`,
			variant: 'danger',
			onConfirm: async () => {
				await handleDeleteUser(id, name)
				hideDialog()
			},
		})
	}

	if (loading) return <div className='p-6'>Загрузка...</div>

	return (
		<div
			className={`bg-white p-6 rounded-lg shadow flex flex-col h-full ${className || ''}`}
		>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
				<h1 className='text-2xl font-bold text-gray-800'>
					Управление пользователями
				</h1>

				<SearchBar
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder='Поиск по имени или email...'
				/>

				<div className='flex gap-3 w-full md:w-auto items-center'>
					<Button
						onClick={() => setIsSettingsModalOpen(true)}
						variant='outline'
						className='flex items-center gap-2'
						title='Настроить колонки'
					>
						<Settings size={18} />
						Колонки
					</Button>
					<Button
						onClick={() => setIsCreateModalOpen(true)}
						className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
					>
						+ Добавить пользователя
					</Button>
				</div>
			</div>

			{/* Основной контейнер для таблицы с flexbox */}
			<div className='flex-1 min-h-0 overflow-hidden relative border border-gray-200 rounded-lg'>
				<AdminUsersTable
					users={processedUsers}
					visibleColumns={visibleColumns}
					sortConfig={sortConfig}
					onSort={requestSort}
					onBlock={openBlockModal}
					onDelete={openDeleteModal}
				/>
			</div>

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
				onReset={resetToDefault}
			/>

			{confirmDialog && (
				<ConfirmDialog
					isOpen={confirmDialog.isOpen}
					onClose={hideDialog}
					onConfirm={confirmDialog.onConfirm}
					title={confirmDialog.title}
					description={confirmDialog.description}
					variant={confirmDialog.variant}
				/>
			)}
		</div>
	)
}
