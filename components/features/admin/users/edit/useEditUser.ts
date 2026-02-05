'use client'

import { UpdateUserDTO } from '@/lib/auth/admin-user-from'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { UseEditUserParams, User } from '../table/types'

export const useEditUser = ({ id, router }: UseEditUserParams) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch(`/api/admin/users/${id}`)
				if (!res.ok) throw new Error('Not found')
				const rawData = await res.json()

				const userToSet: User = {
					...rawData,
					verified: !!rawData.verified,
					createdAt: rawData.createdAt || new Date().toISOString(),
					updatedAt: rawData.updatedAt || new Date().toISOString(),
				}

				setUser(userToSet)
			} catch (error) {
				console.error(error)
				router.push('/admin/users')
			} finally {
				setLoading(false)
			}
		}
		fetchUser()
	}, [id, router])

	const handleSubmit = async (data: UpdateUserDTO) => {
		try {
			// Подготовка данных: убираем пустые строки и undefined, чтобы не перезаписывать их в БД
			// Если поле password пустая строка - удаляем его (значит пароль менять не надо)
			const payload = Object.entries(data).reduce((acc, [key, value]) => {
				if (value !== '' && value !== undefined && value !== null) {
					// Добавляем типизацию ключей для объекта
					;(acc as Record<string, any>)[key] = value
				}
				return acc
			}, {} as Partial<UpdateUserDTO>)

			const res = await fetch(`/api/admin/users/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})

			if (res.ok) {
				toast.success('Данные обновлены', { duration: 4000 })
				router.push('/admin/users')
			} else {
				const errorData = await res.json().catch(() => ({}))
				toast.error(errorData.error || 'Ошибка обновления', {
					duration: 4000,
				})
			}
		} catch (error) {
			console.error(error)
			toast.error('Ошибка соединения', { duration: 4000 })
		}
	}

	return {
		user,
		loading,
		handleSubmit,
	}
}
