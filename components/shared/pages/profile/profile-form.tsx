'use client'

import { updateUserInfo } from '@/app/actions'
import { FormInput } from '@/components/shared'
import { Title } from '@/components/shared/pages/another/title'
import {
	fromUpdateSchema,
	TUpdateSchema,
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
		resolver: zodResolver(fromUpdateSchema),
		defaultValues: {
			email: data.email,
			name: data.name,
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async (data: TUpdateSchema) => {
		try {
			await updateUserInfo({
				email: data.email,
				name: data.name,
				password: data.password || undefined,
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
		<Container className='my-10'>
			<Title
				text='Профиль пользователя'
				size='md'
				className='font-bold flex justify-center'
			/>
			<FormProvider {...form}>
				<form
					className='flex flex-col gap-5 w-96 mt-10'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormInput name='email' label='E-Mail' required />
					<FormInput name='name' label='Полное имя' required />

					<FormInput
						type='password'
						name='password'
						label='Новый пароль'
					/>
					<FormInput
						type='password'
						name='confirmPassword'
						label='Повторите пароль'
					/>

					<Button
						disabled={form.formState.isSubmitting}
						className='text-base mt-10 gap-2 h-10 p-2 flex-1 bg-orange-400 rounded-4xl cursor-pointer text-white'
						type='submit'
					>
						Сохранить
					</Button>

					<Button
						onClick={onClickSignOut}
						variant='secondary'
						disabled={form.formState.isSubmitting}
						className='text-base gap-2 h-10 p-2 flex-1 border-2 border-orange-400 rounded-4xl cursor-pointer text-orange-400'
						type='button'
					>
						Выйти
					</Button>
				</form>
			</FormProvider>
		</Container>
	)
}
