import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(4, { message: 'Пароль должен быть минимум 4 символов' })

export const formLoginSchema = z.object({
	email: z
		.string()
		.regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Введите корректный email'),
	password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
	.extend({
		name: z.string().min(2, { message: 'Введите имя и фамилию' }),
		confirmPassword: passwordSchema,
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export type TLoginSchema = z.infer<typeof formLoginSchema>
export type TRegisterSchema = z.infer<typeof formRegisterSchema>
