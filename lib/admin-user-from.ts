import { z } from 'zod'

/**
 * Общие поля пользователя
 */
const baseUserSchema = {
	name: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
	email: z.string().refine(
		str => {
			return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str)
		},
		{
			message: 'Введите корректную почту ( example@email.com )',
		},
	),
	role: z.enum(['USER', 'ADMIN']),
}

/**
 * Создание пользователя
 */
export const createUserSchema = z.object({
	...baseUserSchema,
	password: z
		.string()
		.refine(
			val => !val || val.length >= 6,
			'Пароль должен содержать не менее 6 символов',
		),
	verified: z.boolean().optional(),
	isBlocked: z.boolean().optional(),
})

export type CreateUserDTO = z.infer<typeof createUserSchema>

/**
 * Обновление пользователя
 * Все поля опциональны
 */
export const updateUserSchema = z.object({
	name: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
	email: z.string().refine(
		str => {
			return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str)
		},
		{
			message: 'Введите корректную почту ( example@email.com )',
		},
	),
	role: z.enum(['USER', 'ADMIN']),
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

export type UpdateUserDTO = z.infer<typeof updateUserSchema>

/**
 * Блокировка / разблокировка
 */
export const blockUserSchema = z.object({
	isBlocked: z.boolean(),
})

export type BlockUserDTO = z.infer<typeof blockUserSchema>
