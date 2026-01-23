'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

type Product = {
	id: number
	name: string
	brand: string
	article: string
	price: number
	count: number
	imageUrl?: string
}

export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([
		{
			id: 1,
			name: 'Масляный фильтр',
			brand: 'Mann',
			article: 'W719/45',
			price: 450,
			count: 10,
			imageUrl: '/forSite/logoauto.jpg',
		},
		{
			id: 2,
			name: 'Свеча зажигания',
			brand: 'NGK',
			article: '22401-AA000',
			price: 120,
			count: 50,
		},
	])

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingProduct, setEditingProduct] = useState<Product | null>(null)
	const [imagePreview, setImagePreview] = useState<string>('')

	// --- Handlers ---

	const handleDelete = (id: number) => {
		if (confirm('Вы уверены, что хотите удалить товар?')) {
			setProducts(products.filter(p => p.id !== id))
			// TODO: API call to delete
		}
	}

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)

		// TODO: Здесь отправить formData на API (включая файл)
		alert('Товар сохранен')
		setIsModalOpen(false)
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setImagePreview(URL.createObjectURL(file))
		}
	}

	const openEditModal = (product: Product) => {
		setEditingProduct(product)
		setImagePreview(product.imageUrl || '')
		setIsModalOpen(true)
	}

	const openAddModal = () => {
		setEditingProduct(null)
		setImagePreview('')
		setIsModalOpen(true)
	}

	return (
		<div className='container bg-white p-6 rounded-lg shadow'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>Управление товарами</h1>
				<button
					onClick={openAddModal}
					className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
				>
					+ Добавить товар
				</button>
			</div>

			<div className='overflow-x-auto'>
				<table className='w-full text-left border-collapse'>
					<thead>
						<tr className='border-b border-gray-200'>
							<th className='py-3 px-2'>Фото</th>
							<th className='py-3 px-2'>Артикул</th>
							<th className='py-3 px-2'>Название</th>
							<th className='py-3 px-2'>Бренд</th>
							<th className='py-3 px-2'>Цена</th>
							<th className='py-3 px-2'>Остаток</th>
							<th className='py-3 px-2'>Действия</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr
								key={product.id}
								className='border-b border-gray-100 hover:bg-gray-50'
							>
								<td className='py-3 px-2'>
									{product.imageUrl ? (
										<img
											src={product.imageUrl}
											alt={product.name}
											className='w-10 h-10 object-cover rounded'
										/>
									) : (
										<div className='w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400'>
											No img
										</div>
									)}
								</td>
								<td className='py-3 px-2 font-mono text-sm'>
									{product.article}
								</td>
								<td className='py-3 px-2'>{product.name}</td>
								<td className='py-3 px-2'>{product.brand}</td>
								<td className='py-3 px-2'>{product.price} ₽</td>
								<td className='py-3 px-2'>
									{product.count} шт.
								</td>
								<td className='py-3 px-2 flex gap-4'>
									<button
										onClick={() => openEditModal(product)}
										className='text-blue-600 hover:underline'
									>
										<Pencil size={20} />
									</button>
									<button
										onClick={() => handleDelete(product.id)}
										className='text-red-600 hover:underline'
									>
										<Trash2 size={20} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto'>
					<div className='bg-white p-6 rounded-lg w-full max-w-lg my-8'>
						<h2 className='text-xl font-bold mb-4'>
							{editingProduct ? 'Редактировать' : 'Добавить'}{' '}
							товар
						</h2>
						<form onSubmit={handleSave} className='space-y-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium mb-1'>
										Название
									</label>
									<input
										name='name'
										type='text'
										defaultValue={editingProduct?.name}
										className='w-full border p-2 rounded'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium mb-1'>
										Бренд
									</label>
									<input
										name='brand'
										type='text'
										defaultValue={editingProduct?.brand}
										className='w-full border p-2 rounded'
										required
									/>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium mb-1'>
										Артикул
									</label>
									<input
										name='article'
										type='text'
										defaultValue={editingProduct?.article}
										className='w-full border p-2 rounded'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium mb-1'>
										Категория ID
									</label>
									<input
										name='categoryId'
										type='number'
										defaultValue={1}
										className='w-full border p-2 rounded'
									/>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium mb-1'>
										Цена
									</label>
									<input
										name='price'
										type='number'
										step='0.01'
										defaultValue={editingProduct?.price}
										className='w-full border p-2 rounded'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium mb-1'>
										Количество
									</label>
									<input
										name='count'
										type='number'
										defaultValue={
											editingProduct?.count || 1
										}
										className='w-full border p-2 rounded'
										required
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium mb-1'>
									Изображение
								</label>
								<input
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									className='w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
								/>
								{imagePreview && (
									<div className='mt-2'>
										<img
											src={imagePreview}
											alt='Preview'
											className='h-24 object-contain border rounded'
										/>
									</div>
								)}
							</div>

							<div className='flex justify-end gap-2 mt-4'>
								<button
									type='button'
									onClick={() => setIsModalOpen(false)}
									className='px-4 py-2 text-gray-600'
								>
									Отмена
								</button>
								<button
									type='submit'
									className='px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600'
								>
									Сохранить
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
