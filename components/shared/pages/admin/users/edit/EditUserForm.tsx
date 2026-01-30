'use client'

import { Button } from '@/components/ui'
import { UpdateUserDTO, updateUserSchema } from '@/lib/admin-user-from'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EditUserFormProps } from '../table/types'

export const EditUserForm = ({
	user,
	loading,
	handleSubmit: onSubmit,
	onCancel,
	className,
}: EditUserFormProps) => {
	const {
		register,
		handleSubmit: rhfHandleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<UpdateUserDTO>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			name: '',
			email: '',
			role: 'USER',
			password: '',
			verified: false,
			isBlocked: false,
		},
	})

	useEffect(() => {
		if (user) {
			reset({
				name: user.name,
				email: user.email,
				role: user.role,
				password: '',
				verified: user.verified,
				isBlocked: user.isBlocked,
			})
		}
	}, [user, reset])

	if (loading)
		return <div className='p-6'>Загрузка данных пользователя...</div>
	if (!user) return null

	const onFormSubmit: SubmitHandler<UpdateUserDTO> = async data => {
		await onSubmit(data)
	}

	return (
		<div
			className={`max-w-2xl mx-auto bg-white p-8 rounded-lg shadow${className || ''}`}
		>
			<h1 className='text-2xl font-bold mb-6'>
				Редактирование пользователя: {user.name}
			</h1>

			<form
				onSubmit={rhfHandleSubmit(onFormSubmit)}
				className='space-y-6'
			>
				{/* Имя */}
				<div>
					<label className='block text-sm font-medium mb-1'>
						Имя
					</label>
					<input
						type='text'
						{...register('name')}
						className={`w-full border p-2 rounded ${
							errors.name ? 'border-red-500' : ''
						}`}
					/>
					{errors.name && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.name.message}
						</p>
					)}
				</div>

				{/* Email */}
				<div>
					<label className='block text-sm font-medium mb-1'>
						Email
					</label>
					<input
						type='email'
						{...register('email')}
						className={`w-full border p-2 rounded ${
							errors.email ? 'border-red-500' : ''
						}`}
					/>
					{errors.email && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.email.message}
						</p>
					)}
				</div>

				{/* Роль */}
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium mb-1'>
							Роль
						</label>
						<select
							{...register('role')}
							className={`w-full border p-2 rounded ${
								errors.role ? 'border-red-500' : ''
							}`}
						>
							<option value='USER'>USER</option>
							<option value='ADMIN'>ADMIN</option>
						</select>
					</div>
				</div>

				{/* Статус аккаунта */}
				<div className='flex flex-col gap-3 p-4 border border-gray-200 rounded-lg'>
					<span className='text-sm font-bold text-gray-700 mb-1'>
						Статус аккаунта
					</span>

					{/* Блокировка */}
					<label className='flex items-center gap-2 cursor-pointer group'>
						<input
							type='checkbox'
							{...register('isBlocked')}
							className='w-5 h-5 accent-red-600 rounded border-gray-300 focus:ring-2 focus:ring-red-200 cursor-pointer transition-colors'
						/>
						<span
							className={`text-sm font-medium group-hover:text-red-600 transition-colors ${
								watch('isBlocked')
									? 'text-red-600'
									: 'text-gray-700'
							}`}
						>
							{watch('isBlocked')
								? 'Аккаунт заблокирован'
								: 'Заблокировать аккаунт'}
						</span>
					</label>

					{/* Верификация */}
					<label className='flex items-center gap-2 cursor-pointer group'>
						<input
							type='checkbox'
							{...register('verified')}
							className='w-5 h-5 accent-green-600 rounded border-gray-300 focus:ring-2 focus:ring-green-200 cursor-pointer transition-colors'
						/>
						<span
							className={`text-sm font-medium group-hover:text-green-600 transition-colors ${
								watch('verified')
									? 'text-green-600'
									: 'text-gray-700'
							}`}
						>
							{watch('verified')
								? 'Email подтвержден'
								: 'Подтвердить Email'}
						</span>
					</label>
				</div>

				{/* Пароль */}
				<div className='bg-yellow-50 p-4 rounded border border-yellow-200'>
					<label className='block text-sm font-medium mb-1 text-yellow-800'>
						Новый пароль (оставьте пустым, чтобы не менять)
					</label>
					<input
						type='password'
						{...register('password')}
						className={`w-full border p-2 rounded ${
							errors.password ? 'border-red-500' : ''
						}`}
						placeholder='••••••••'
					/>
					{errors.password && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.password.message}
						</p>
					)}
				</div>

				<div className='flex justify-end gap-4 pt-4'>
					<Button
						type='button'
						onClick={onCancel}
						className='px-4 py-2 text-gray-800 hover:bg-gray-100 rounded bg-gray-200'
					>
						Отмена
					</Button>
					<Button
						type='submit'
						className='px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-bold'
					>
						Сохранить изменения
					</Button>
				</div>
			</form>
		</div>
	)
}
