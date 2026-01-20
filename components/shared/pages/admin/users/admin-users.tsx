'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type UserRole = 'USER' | 'ADMIN'

type User = {
	id: number
	name: string
	email: string
	role: UserRole
	isBlocked: boolean
	createdAt: string
}

export default function AdminUsers() {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Загрузка данных
	const fetchUsers = async () => {
		try {
			const res = await fetch('/api/admin/users')
			if (!res.ok) throw new Error('Ошибка сети')
			const data = await res.json()
			setUsers(data)
		} catch (e) {
			console.error(e)
			alert('Не удалось загрузить пользователей')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	// Создание пользователя (в модальном окне)
	const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const data = Object.fromEntries(formData.entries())

		try {
			const res = await fetch('/api/admin/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (res.ok) {
				setIsModalOpen(false)
				fetchUsers()
				;(e.target as HTMLFormElement).reset()
			} else {
				alert('Ошибка при создании')
			}
		} catch (error) {
			alert('Ошибка сети')
		}
	}

	// Блокировка пользователя
	const toggleBlock = async (id: number, currentStatus: boolean) => {
		if (
			!confirm(
				`Вы уверены, что хотите ${currentStatus ? 'разблокировать' : 'заблокировать'} пользователя?`,
			)
		)
			return

		try {
			const res = await fetch(`/api/admin/users/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ isBlocked: !currentStatus }),
			})

			if (res.ok) {
				fetchUsers()
			}
		} catch (error) {
			alert('Ошибка изменения статуса')
		}
	}

	if (loading) return <div className='p-6'>Загрузка...</div>

	return (
		<div className='bg-white p-6 rounded-lg shadow'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>
					Управление пользователями
				</h1>
				<Button
					onClick={() => setIsModalOpen(true)}
					className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
				>
					+ Добавить пользователя
				</Button>
			</div>

			<table className='w-full text-left border-collapse'>
				<thead>
					<tr className='border-b border-gray-200'>
						<th className='py-3 px-2'>ID</th>
						<th className='py-3 px-2'>Имя</th>
						<th className='py-3 px-2'>Email</th>
						<th className='py-3 px-2'>Роль</th>
						<th className='py-3 px-2'>Статус</th>
						<th className='py-3 px-2'>Действия</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr
							key={user.id}
							className='border-b border-gray-100 hover:bg-gray-50'
						>
							<td className='py-3 px-2'>{user.id}</td>
							<td className='py-3 px-2 font-medium'>
								{user.name}
							</td>
							<td className='py-3 px-2'>{user.email}</td>
							<td className='py-3 px-2'>
								<span
									className={`px-2 py-1 rounded text-xs ${
										user.role === 'ADMIN'
											? 'bg-purple-100 text-purple-800'
											: 'bg-gray-100 text-gray-800'
									}`}
								>
									{user.role}
								</span>
							</td>
							<td className='py-3 px-2'>
								{user.isBlocked ? (
									<span className='text-red-600 font-bold text-xs'>
										Заблокирован
									</span>
								) : (
									<span className='text-green-600 font-bold text-xs'>
										Активен
									</span>
								)}
							</td>
							<td className='py-3 px-2 flex gap-2'>
								{/* Ссылка на страницу редактирования */}
								<Link
									href={`/admin/users/${user.id}`}
									className='text-blue-600 hover:underline font-medium'
								>
									Ред.
								</Link>
								<Button
									onClick={() =>
										toggleBlock(user.id, user.isBlocked)
									}
									className={`text-sm underline ${
										user.isBlocked
											? 'text-green-600'
											: 'text-red-600'
									}`}
								>
									{user.isBlocked ? 'Разблок.' : 'Блок'}
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Модальное окно добавления */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
					<div className='bg-white p-6 rounded-lg w-full max-w-md'>
						<h2 className='text-xl font-bold mb-4'>
							Добавить пользователя
						</h2>
						<form onSubmit={handleCreateUser} className='space-y-4'>
							<div>
								<label className='block text-sm font-medium mb-1'>
									Имя
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
							<div className='flex justify-end gap-2 mt-4'>
								<Button
									type='button'
									onClick={() => setIsModalOpen(false)}
									className='px-4 py-2 text-gray-600'
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
			)}
		</div>
	)
}
