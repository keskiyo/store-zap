import { z } from 'zod'

// Общая базовая схема для общих полей
const baseUserSchema = z.object({
	name: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
	email: z.string().refine(str => {
		return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str)
	}),
	role: z.enum(['USER', 'ADMIN']),
	verified: z.boolean().optional(),
	isBlocked: z.boolean().optional(),
})

// 1. Схема для СОЗДАНИЯ (пароль обязателен)
export const createUserSchema = baseUserSchema.extend({
	password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
})

// 2. Схема для РЕДАКТИРОВАНИЯ (пароль опционален, но если есть — проверяем длину)
export const editUserSchema = baseUserSchema.extend({
	password: z
		.string()
		.optional()
		.refine(
			val => !val || val.length >= 6,
			'Пароль должен содержать не менее 6 символов',
		),
	verified: z.boolean().optional(),
	isBlocked: z.boolean().optional(),
})

export type CreateUserValues = z.infer<typeof createUserSchema>
export type EditUserValues = z.infer<typeof editUserSchema>
