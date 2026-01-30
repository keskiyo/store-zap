'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui'
import { ProductFormDTO, productFormSchema } from '@/lib/admin-product-form'
import { FormField } from './form/form-field'
import { ImageUploader } from './form/image-uploader'
import { Specifications } from './form/specifications'

interface Category {
	id: number
	name: string
	img?: string | null
}

interface SpecificationState {
	key: string
	value: string
}

interface Props {
	isOpen: boolean
	onClose: () => void
	onSubmit: (formData: FormData) => Promise<boolean>
}

export const CreateProductModal = ({ isOpen, onClose, onSubmit }: Props) => {
	// --- Логика формы ---
	const methods = useForm<ProductFormDTO>({
		resolver: zodResolver(productFormSchema) as any,
		defaultValues: {
			name: '',
			brand: '',
			article: '',
			price: 0,
			count: 1,
			categoryId: 0,
			specifications: [],
		},
	})

	// --- Локальные стейты ---
	const [categories, setCategories] = useState<Category[]>([])
	const [categoriesLoading, setCategoriesLoading] = useState(false)

	const [specifications, setSpecifications] = useState<SpecificationState[]>(
		[],
	)

	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)

	// --- Эффекты ---
	useEffect(() => {
		if (isOpen) {
			fetchCategories()
		} else {
			// Сброс при закрытии
			methods.reset()
			setSpecifications([])
			setImageFile(null)
			setImagePreview(null)
		}
	}, [isOpen, methods])

	// Освобождаем object URL при размонтировании
	useEffect(() => {
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview)
			}
		}
	}, [imagePreview])

	// --- Действия ---
	const fetchCategories = async () => {
		try {
			setCategoriesLoading(true)
			const response = await fetch('/api/admin/categories')
			if (response.ok) {
				setCategories(await response.json())
			}
		} catch (error) {
			console.error('Ошибка загрузки категорий:', error)
		} finally {
			setCategoriesLoading(false)
		}
	}

	const handleImageChange = (file: File | null) => {
		// Освобождаем предыдущий URL при замене изображения
		if (imagePreview) {
			URL.revokeObjectURL(imagePreview)
		}

		setImageFile(file)
		if (file) {
			setImagePreview(URL.createObjectURL(file))
		} else {
			setImagePreview(null)
		}
	}

	const handleFormSubmit = async (data: ProductFormDTO) => {
		const formData = new FormData()

		// Основные поля
		Object.entries(data).forEach(([key, value]) => {
			if (key !== 'specifications') {
				formData.append(key, String(value))
			}
		})

		// Характеристики
		const validSpecs = specifications.filter(
			s => s.key.trim() !== '' || s.value.trim() !== '',
		)
		formData.append('specifications', JSON.stringify(validSpecs))

		// Изображение
		if (imageFile) {
			formData.append('imageUrl', imageFile)
		}

		const success = await onSubmit(formData)
		if (success) {
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto py-4'>
			<div className='bg-white p-6 rounded-lg w-full max-w-4xl my-auto relative'>
				{/* Заголовок */}
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-bold'>Добавить новый товар</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-800 transition-colors'
					>
						<X size={24} />
					</button>
				</div>

				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(handleFormSubmit)}
						className='space-y-6'
					>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{/* Левая колонка: Поля ввода */}
							<div className='space-y-4'>
								<FormField
									name='name'
									label='Название товара *'
									placeholder='Например: Амортизатор задний'
								/>
								<FormField
									name='brand'
									label='Бренд *'
									placeholder='Например: Lada, Bosch'
								/>
								<FormField
									name='article'
									label='Артикул *'
									placeholder='Например: 2108-6863855'
								/>
								<div className='grid grid-cols-2 gap-4'>
									<FormField
										name='price'
										type='number'
										label='Цена (₽) *'
										step='0.01'
										min='0'
										placeholder='0.00'
									/>
									<FormField
										name='count'
										type='number'
										label='Количество *'
										min='0'
									/>
								</div>

								{/* Выбор категории */}
								<div>
									<label className='block text-sm font-medium mb-2'>
										Категория *
									</label>
									<select
										{...methods.register('categoryId', {
											valueAsNumber: true,
										})}
										className='w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors disabled:bg-gray-100'
										disabled={categoriesLoading}
									>
										<option value=''>
											Выберите категорию
										</option>
										{categories.map(category => (
											<option
												key={category.id}
												value={category.id}
											>
												{category.name}
											</option>
										))}
									</select>
									{methods.formState.errors.categoryId && (
										<p className='text-red-500 text-xs mt-1'>
											{
												methods.formState.errors
													.categoryId.message
											}
										</p>
									)}
								</div>

								{/* Характеристики */}
								<Specifications
									value={specifications}
									onChange={setSpecifications}
								/>
							</div>

							{/* Правая колонка: Изображение */}
							<div className='space-y-6'>
								<ImageUploader
									initialImage={imagePreview}
									onImageChange={handleImageChange}
									disabled={methods.formState.isSubmitting}
								/>
							</div>
						</div>

						{/* Футер формы */}
						<div className='pt-6 border-t flex justify-between items-center'>
							<p className='text-sm text-gray-500'>
								Поля отмеченные * обязательны
							</p>
							<div className='flex gap-3'>
								<Button
									type='button'
									onClick={onClose}
									variant='outline'
								>
									Отмена
								</Button>
								<Button
									type='submit'
									disabled={methods.formState.isSubmitting}
									className='bg-orange-500 text-white hover:bg-orange-600'
								>
									{methods.formState.isSubmitting
										? 'Создание...'
										: 'Добавить товар'}
								</Button>
							</div>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
