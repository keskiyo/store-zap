'use client'

import { FormInput } from '@/components/shared/pages/checkout/form-input'
import { Button } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { formLoginSchema, TLoginSchema } from './schemas'

interface Props {
	onClose?: VoidFunction
	callbackUrl?: string
}

export const LoginForm: React.FC<Props> = ({ onClose, callbackUrl = '/' }) => {
	const form = useForm<TLoginSchema>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: TLoginSchema) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			})

			if (!resp?.ok) {
				throw Error()
			}

			toast.success('Вы успешно вошли в аккаунт', {
				icon: '✅',
			})

			onClose?.()
			window.location.href = callbackUrl
		} catch (error) {
			console.error('Error [LOGIN]', error)
			toast.error('Не удалось войти в аккаунт', {
				icon: '❌',
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<p className='text-gray-400'>
							Введите свою почту, чтобы войти в свой аккаунт.
						</p>
					</div>
					<img
						src='/assets/images/phone-icon.png'
						alt='phone-icon'
						width={60}
						height={60}
					/>
				</div>

				<FormInput name='email' label='E-Mail' required />
				<FormInput
					name='password'
					label='Пароль'
					type='password'
					required
				/>

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base cursor-pointer rounded-4xl bg-orange-400 text-white'
					type='submit'
				>
					Войти
				</Button>
			</form>
		</FormProvider>
	)
}
