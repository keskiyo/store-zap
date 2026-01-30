'use client'

import { Button } from '@/components/ui'
import { CreateUserDTO, createUserSchema } from '@/lib/admin-user-from'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface Props {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: CreateUserDTO) => Promise<boolean>
}

export const CreateUserModal = ({ isOpen, onClose, onSubmit }: Props) => {
	// Инициализируем форму с валидацией Zod
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<CreateUserDTO>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			role: 'USER',
			verified: true,
		},
	})

	const handleFormSubmit = async (data: CreateUserDTO) => {
		const success = await onSubmit(data)
		if (success) {
			onClose()
			reset()
		}
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
			<div className='bg-white p-6 rounded-lg w-full max-w-md'>
				<h2 className='text-xl font-bold mb-4'>
					Добавить пользователя
				</h2>

				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className='space-y-4'
				>
					{/* Имя */}
					<div>
						<label className='block text-sm font-medium mb-1'>
							Имя и Фамилия
						</label>
						<input
							{...register('name')}
							type='text'
							className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
							placeholder='Введите имя'
						/>
						{/* Ошибка валидации */}
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
							{...register('email')}
							type='email'
							className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
							placeholder='example@mail.com'
						/>
						{errors.email && (
							<p className='text-red-500 text-xs mt-1'>
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Пароль */}
					<div>
						<label className='block text-sm font-medium mb-1'>
							Пароль
						</label>
						<input
							{...register('password')}
							type='password'
							className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
							placeholder='Минимум 6 символов'
						/>
						{errors.password && (
							<p className='text-red-500 text-xs mt-1'>
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Роль */}
					<div>
						<label className='block text-sm font-medium mb-1'>
							Роль
						</label>
						<select
							{...register('role')}
							className={`w-full border p-2 rounded ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
						>
							<option value='USER'>USER</option>
							<option value='ADMIN'>ADMIN</option>
						</select>
						{errors.role && (
							<p className='text-red-500 text-xs mt-1'>
								{errors.role.message}
							</p>
						)}
					</div>

					{/* Чекбокс верификации */}
					<div className='flex items-center gap-2'>
						<input
							{...register('verified')}
							type='checkbox'
							className='w-4 h-4 text-orange-600 rounded focus:ring-orange-500'
						/>
						<label className='text-sm text-gray-700'>
							Email подтвержден (избежать проверки)
						</label>
					</div>

					{/* Кнопки */}
					<div className='flex justify-end gap-2 mt-6'>
						<Button
							type='button'
							onClick={onClose}
							className='px-4 py-2 text-gray-600 bg-transparent hover:bg-gray-200'
						>
							Отмена
						</Button>
						<Button
							type='submit'
							disabled={isSubmitting}
							className='px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50'
						>
							{isSubmitting ? 'Сохранение...' : 'Сохранить'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
