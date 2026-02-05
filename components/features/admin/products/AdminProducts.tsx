'use client'

import { SearchBar } from '@/components/layout/header/search-admin-input'
import { Button } from '@/components/ui'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useConfirmDialog } from '@/hooks/ui/use-confirm-dialog'
import { Settings } from 'lucide-react'
import React, { useState } from 'react'
import { AdminProductsTable } from './table/AdminProductTable'
import { CreateProductModal } from './table/CreateProductModal'
import { ProductsSettingsModal } from './table/SettingsModal'
import { useAdminProducts } from './table/useAdminTableHook'
import { useColumnSettings } from './table/useColumnSettings'
import { useProductFilter } from './table/useProductFilters'

interface Props {
	className?: string
}

export const AdminProducts: React.FC<Props> = ({ className }) => {
	const { columns, toggleColumnVisibility, resetToDefault } =
		useColumnSettings()
	const { products, loading, handleCreateProduct, handleDeleteProduct } =
		useAdminProducts()
	const {
		searchTerm,
		setSearchTerm,
		sortConfig,
		requestSort,
		processedProducts,
	} = useProductFilter(products)
	const { confirmDialog, showDialog, hideDialog } = useConfirmDialog()

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

	const visibleColumns = columns.filter(c => c.isVisible)

	const openDeleteModal = (id: number, name: string) => {
		showDialog({
			title: 'Удаление товара',
			description: `Вы уверены, что хотите удалить "${name}"? Это действие необратимо.`,
			variant: 'danger',
			onConfirm: async () => {
				await handleDeleteProduct(id, name)
				hideDialog()
			},
		})
	}

	if (loading) return <div className='p-6'>Загрузка...</div>

	return (
		<div className={`bg-white p-6 rounded-lg shadow ${className || ''}`}>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
				<h1 className='text-2xl font-bold text-gray-800'>
					Управление товарами
				</h1>

				<SearchBar
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder='Строка для поиска...'
				/>

				<div className='flex gap-3 w-full md:w-auto'>
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
						+ Добавить товар
					</Button>
				</div>
			</div>

			<AdminProductsTable
				products={processedProducts}
				visibleColumns={visibleColumns}
				sortConfig={sortConfig}
				onSort={requestSort}
				onDelete={openDeleteModal}
			/>
			<CreateProductModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSubmit={handleCreateProduct}
			/>

			<ProductsSettingsModal
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
