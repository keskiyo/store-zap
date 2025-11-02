'use client'

import { updateUserInfo } from '@/app/actions'
import { FormInput } from '@/components/shared'
import { Title } from '@/components/shared/pages/another/title'
import {
	formRegisterSchema,
	TRegisterSchema,
} from '@/components/shared/pages/auth-modal/forms/schemas'
import { Button, Container } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
	data: User
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: data.email,
			name: data.name,
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TRegisterSchema) => {
		try {
			await updateUserInfo({
				email: data.email,
				name: data.name,
				password: data.password,
			})

			toast.success('Данные обновлены', {
				icon: '✅',
			})
		} catch (error) {
			console.error('Error [PROFILE-FORM]', error)
			toast.error('Ошибка обновления данных', {
				icon: '❌',
			})
		}
	}

	const onClickSignOut = () => {
		signOut({ callbackUrl: '/' })
	}

	return (
		<Container className='my-10 flex justify-center'>
			<Title text='Профиль пользователя' size='md' className='font-bold' />
			<FormProvider {...form}>
				<form
					className='flex flex-col gap-5 w-96 mt-10'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormInput name='email' label='E-Mail' required />
					<FormInput name='fullName' label='Полное имя' required />

					<FormInput
						type='password'
						name='password'
						label='Новый пароль'
						required
					/>
					<FormInput
						type='password'
						name='confirmPassword'
						label='Повторите пароль'
						required
					/>

					<Button
						disabled={form.formState.isSubmitting}
						className='text-base mt-10'
						type='submit'
					>
						Сохранить
					</Button>

					<Button
						onClick={onClickSignOut}
						variant='secondary'
						disabled={form.formState.isSubmitting}
						className='text-base'
						type='button'
					>
						Выйти
					</Button>
				</form>
			</FormProvider>
		</Container>
	)
}
