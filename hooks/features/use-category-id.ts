'use client'

import { useParams } from 'next/navigation'

export const useCategoryId = (): string | undefined => {
	const params = useParams()

	// Получаем categoryId из path параметров
	// Для URL: /category/7 → params.id = "7"
	const categoryId = params.id as string

	return categoryId || undefined
}
