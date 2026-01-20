'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type User = {
	id: number
	name: string
	email: string
	role: 'USER' | 'ADMIN'
	isBlocked: boolean
}

export default function EditUserPage({ params }: { params: { id: string } }) {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		role: 'USER' as 'USER' | 'ADMIN',
		password: '',
	})

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch(`/api/admin/users/${params.id}`)
				if (!res.ok) throw new Error('Not found')
				const data = await res.json()
				setUser(data)
				setFormData({
					name: data.name,
					email: data.email,
					role: data.role,
					password: '',
				})
			} catch (error) {
				router.push('/admin/users') // Если 404, редиректим назад
			} finally {
				setLoading(false)
			}
		}
		fetchUser()
	}, [params.id, router])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		// Отправляем только те данные, которые нужно обновить
		// Если пароль пустой, не включаем его в запрос, чтобы не затереть существующий хеш

		const payload: any = {
			name: formData.name,
			email: formData.email,
			role: formData.role,
		}
		if (formData.password.trim() !== '') {
			payload.password = formData.password
		}

		try {
			const res = await fetch(`/api/admin/users/${params.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})

			if (res.ok) {
				alert('Данные обновлены')
				router.push('/admin/users')
			} else {
				alert('Ошибка обновления')
			}
		} catch (error) {
			console.error(error)
		}
	}

	if (loading)
		return <div className='p-6'>Загрузка данных пользователя...</div>
	if (!user) return null

	return (
		<div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow'>
			<h1 className='text-2xl font-bold mb-6'>
				Редактирование пользователя: {user.name}
			</h1>

			<form onSubmit={handleSubmit} className='space-y-6'>
				<div>
					<label className='block text-sm font-medium mb-1'>
						Имя
					</label>
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
						className='w-full border p-2 rounded'
						required
					/>
				</div>

				<div>
					<label className='block text-sm font-medium mb-1'>
						Email
					</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
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
						value={formData.role}
						onChange={handleChange}
						className='w-full border p-2 rounded'
					>
						<option value='USER'>USER</option>
						<option value='ADMIN'>ADMIN</option>
					</select>
				</div>

				<div className='bg-yellow-50 p-4 rounded border border-yellow-200'>
					<label className='block text-sm font-medium mb-1 text-yellow-800'>
						Новый пароль (оставьте пустым, чтобы не менять)
					</label>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						className='w-full border p-2 rounded'
						placeholder='••••••••'
					/>
				</div>

				<div className='flex justify-end gap-4 pt-4'>
					<button
						type='button'
						onClick={() => router.back()}
						className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded'
					>
						Отмена
					</button>
					<button
						type='submit'
						className='px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-bold'
					>
						Сохранить изменения
					</button>
				</div>
			</form>
		</div>
	)
}
