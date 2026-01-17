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
		captchaToken: z
			.string()
			.min(1, 'Пожалуйста, пройдите проверку безопасности'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export const fromUpdateSchema = z
	.object({
		email: z
			.string()
			.regex(
				/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
				'Введите корректный email'
			),
		name: z.string().min(2, 'Имя слишком короткое'),
		password: z.string().min(6).optional().or(z.literal('')),
		confirmPassword: z.string().optional().or(z.literal('')),
	})
	.refine(
		data => {
			if (!data.password) return true
			return data.password === data.confirmPassword
		},
		{
			message: 'Пароли не совпадают',
			path: ['confirmPassword'],
		}
	)

export type TLoginSchema = z.infer<typeof formLoginSchema>
export type TRegisterSchema = z.infer<typeof formRegisterSchema>
export type TUpdateSchema = z.infer<typeof fromUpdateSchema>
