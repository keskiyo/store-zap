import { z } from 'zod'

const specificationSchema = z.object({
	key: z.string().min(1, 'Название характеристики обязательно'),
	value: z.string().min(1, 'Значение характеристики обязательно'),
})

export const productFormSchema = z.object({
	name: z.string().min(1, 'Название товара обязательно'),
	brand: z.string().min(1, 'Бренд обязателен'),
	article: z.string().min(1, 'Артикул обязателен'),
	price: z.coerce
		.number({ message: 'Укажите цену числом' })
		.nonnegative('Цена не может быть отрицательной')
		.default(0),
	count: z.coerce
		.number({ message: 'Укажите количество числом' })
		.int('Количество должно быть целым числом')
		.nonnegative('Количество не может быть отрицательным')
		.default(1),
	categoryId: z.coerce
		.number({ message: 'Выберите категорию' })
		.int('ID категории должен быть целым числом')
		.positive('Выберите категорию')
		.default(0),
	specifications: z.array(specificationSchema).default([]),
})

export type ProductFormDTO = z.infer<typeof productFormSchema>

export function parseProductFormData(formData: FormData): ProductFormDTO {
	const rawSpecs = formData.get('specifications')

	let specifications: ProductFormDTO['specifications'] = []

	if (typeof rawSpecs === 'string' && rawSpecs.trim() !== '') {
		try {
			const parsed = JSON.parse(rawSpecs)

			if (!Array.isArray(parsed)) {
				throw new Error()
			}

			specifications = parsed
		} catch {
			throw new Error('Некорректный JSON характеристик')
		}
	}

	const dto = {
		name: String(formData.get('name') ?? ''),
		brand: String(formData.get('brand') ?? ''),
		article: String(formData.get('article') ?? ''),
		price: Number(formData.get('price')),
		count: Number(formData.get('count') ?? 0),
		categoryId: Number(formData.get('categoryId')),
		specifications,
	}

	return productFormSchema.parse(dto)
}
