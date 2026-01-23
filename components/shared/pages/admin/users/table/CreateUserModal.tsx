'use client'

import { CreateUserValues } from '@/components/shared/constants/admin-users-schema'
import { Button } from '@/components/ui'
import { UserRole } from '@prisma/client'

interface Props {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: CreateUserValues) => Promise<boolean>
}

export const CreateUserModal = ({ isOpen, onClose, onSubmit }: Props) => {
	if (!isOpen) return null

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const data = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			role: formData.get('role') as UserRole,
			verified: formData.get('verified') === 'on',
		}

		// Отправка в хук
		const success = await onSubmit(data)
		if (success) {
			onClose()
			;(e.target as HTMLFormElement).reset()
		}
	}

	return (
		<div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
			<div className='bg-white p-6 rounded-lg w-full max-w-md'>
				<h2 className='text-xl font-bold mb-4'>
					Добавить пользователя
				</h2>
				<form onSubmit={handleFormSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium mb-1'>
							Имя и Фамилия
						</label>
						<input
							name='name'
							type='text'
							className='w-full border p-2 rounded'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium mb-1'>
							Email
						</label>
						<input
							name='email'
							type='email'
							className='w-full border p-2 rounded'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium mb-1'>
							Пароль
						</label>
						<input
							name='password'
							type='password'
							className='w-full border p-2 rounded'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium mb-1'>
							Роль
						</label>
						<select
							name='role'
							className='w-full border p-2 rounded'
						>
							<option value='USER'>USER</option>
							<option value='ADMIN'>ADMIN</option>
						</select>
					</div>
					<div className='flex items-center gap-2'>
						<input
							name='verified'
							type='checkbox'
							defaultChecked
							className='w-4 h-4 text-orange-600 rounded focus:ring-orange-500'
						/>
						<label className='text-sm text-gray-700'>
							Email подтвержден (избежать проверки)
						</label>
					</div>
					<div className='flex justify-end gap-2 mt-4'>
						<Button
							type='button'
							onClick={onClose}
							className='px-4 py-2 text-gray-600 bg-transparent hover:bg-transparent'
						>
							Отмена
						</Button>
						<Button
							type='submit'
							className='px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600'
						>
							Сохранить
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
