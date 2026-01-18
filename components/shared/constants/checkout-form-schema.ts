import { z } from 'zod'

export const checkoutFormSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
	lastName: z
		.string()
		.min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
	email: z.string().refine(
		str => {
			return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str)
		},
		{
			message: 'Введите корректную почту',
		},
	),
	phone: z
		.string()
		.min(10, { message: 'Номер телефона обязателен' })
		.refine(
			phone => {
				if (phone.length < 11) return true
				return /^7\d{10}$/.test(phone)
			},
			{
				message:
					'Номер должен начинаться с 7 и содержать ровно 11 цифр',
			},
		),
	address: z.string().min(5, { message: 'Введите корректный адрес' }),
	comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
