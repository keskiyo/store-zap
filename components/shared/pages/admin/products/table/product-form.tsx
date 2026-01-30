'use client'

import { Button } from '@/components/ui'
import { ProductFormDTO, productFormSchema } from '@/lib/admin-product-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormField } from './form/form-field'
import { ImageUploader } from './form/image-uploader'
import { Specifications } from './form/specifications'

interface Category {
	id: number
	name: string
	img?: string | null
}

interface Props {
	productId: string
	initialData: ProductFormDTO & { imageUrl?: string | null }
	categories: Category[]
}

export const ProductForm: React.FC<Props> = ({
	productId,
	initialData,
	categories,
}) => {
	const router = useRouter()
	const [imageFile, setImageFile] = useState<File | null>(null)

	const methods = useForm<ProductFormDTO>({
		resolver: zodResolver(productFormSchema) as any,
		defaultValues: initialData,
	})

	const {
		handleSubmit,
		formState: { isSubmitting },
		watch,
	} = methods

	// Следим за характеристиками в форме
	const specs = watch('specifications') || []

	const onSubmit = async (data: ProductFormDTO) => {
		try {
			const formData = new FormData()

			// Заполняем простые поля
			Object.entries(data).forEach(([key, value]) => {
				if (key !== 'specifications' && key !== 'imageUrl') {
					formData.append(key, String(value))
				}
			})

			// Спецификации (фильтруем пустые)
			const validSpecs = specs.filter(
				(s: any) => s.key.trim() || s.value.trim(),
			)
			formData.append('specifications', JSON.stringify(validSpecs))

			// Картинка (если новая)
			if (imageFile) {
				formData.append('imageUrl', imageFile)
			}

			const res = await fetch(`/api/admin/products/${productId}`, {
				method: 'PUT',
				body: formData,
			})

			if (res.ok) {
				toast.success('Товар обновлен')
				router.push('/admin/products')
				router.refresh()
			} else {
				const err = await res.json()
				toast.error(err.error || 'Ошибка сохранения')
			}
		} catch (error) {
			console.error(error)
			toast.error('Ошибка соединения')
		}
	}

	return (
		<div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow'>
			<header className='flex items-center gap-4 mb-6'>
				<button
					onClick={() => router.back()}
					className='p-2 hover:bg-gray-100 rounded-full'
				>
					<ArrowLeft className='text-gray-600' size={20} />
				</button>
				<h1 className='text-2xl font-bold'>Редактирование товара</h1>
			</header>

			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{/* Левая колонка: Данные */}
						<div className='space-y-4'>
							<FormField
								name='name'
								label='Название товара *'
								placeholder='Например: Амортизатор'
							/>

							<div className='grid grid-cols-2 gap-4'>
								<FormField
									name='brand'
									label='Бренд *'
									placeholder='Lada'
								/>
								<FormField
									name='article'
									label='Артикул *'
									placeholder='2108-...'
								/>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<FormField
									name='price'
									type='number'
									label='Цена (₽) *'
									registerOptions={{ valueAsNumber: true }}
								/>
								<FormField
									name='count'
									type='number'
									label='Количество *'
									registerOptions={{ valueAsNumber: true }}
								/>
							</div>

							<div>
								<label className='block text-sm font-medium mb-2'>
									Категория *
								</label>
								<select
									{...methods.register('categoryId', {
										valueAsNumber: true,
									})}
									className='w-full border p-3 rounded-lg focus:border-orange-500 outline-none'
								>
									<option value=''>Выберите категорию</option>
									{categories.map(c => (
										<option key={c.id} value={c.id}>
											{c.name}
										</option>
									))}
								</select>
							</div>

							<Specifications
								value={specs}
								onChange={newSpecs =>
									methods.setValue('specifications', newSpecs)
								}
							/>
						</div>

						{/* Правая колонка: Изображение */}
						<div className='space-y-6'>
							<ImageUploader
								initialImage={initialData.imageUrl || null}
								onImageChange={setImageFile}
								disabled={isSubmitting}
							/>
						</div>
					</div>

					{/* Футер */}
					<div className='pt-6 border-t flex items-center justify-between'>
						<span className='text-sm text-gray-500'>
							Поля отмеченные * обязательны для заполнения
						</span>
						<div className='flex gap-3'>
							<Button
								type='button'
								onClick={() => router.back()}
								variant='outline'
							>
								Отмена
							</Button>
							<Button
								type='submit'
								disabled={isSubmitting}
								className='bg-orange-500 text-white hover:bg-orange-600'
							>
								{isSubmitting ? (
									'Сохранение...'
								) : (
									<>
										<Save size={18} className='mr-2' />
										Сохранить
									</>
								)}
							</Button>
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
