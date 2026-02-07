import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { User } from '../../../../../types/admin/users'

export const useAdminUsers = () => {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(true)

	const fetchUsers = async () => {
		try {
			const res = await fetch('/api/admin/users')
			if (!res.ok) throw new Error('Ошибка сети')
			const data: User[] = await res.json()
			setUsers(data)
		} catch (e) {
			console.error(e)
			toast.error('Не удалось загрузить пользователей')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	const handleCreateUser = async (data: any): Promise<boolean> => {
		// data приходит уже провалидированным из формы
		try {
			const res = await fetch('/api/admin/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (res.ok) {
				fetchUsers()
				return true
			} else {
				toast.error('Ошибка при создании')
				return false
			}
		} catch (error) {
			toast.error('Ошибка сети')
			return false
		}
	}

	const toggleBlock = async (
		id: number,
		currentStatus: boolean,
	): Promise<boolean> => {
		if (
			!confirm(
				`Вы уверены, что хотите ${currentStatus ? 'разблокировать' : 'заблокировать'} пользователя?`,
			)
		)
			return false

		try {
			const res = await fetch(`/api/admin/users/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ isBlocked: !currentStatus }),
			})

			if (res.ok) {
				fetchUsers()
				return true
			}
			return false
		} catch (error) {
			toast.error('Ошибка изменения статуса')
			return false
		}
	}

	const handleDeleteUser = async (
		id: number,
		name: string,
	): Promise<boolean> => {
		if (
			!confirm(
				`Вы уверены, что хотите удалить пользователя ${name}? Это действие необратимо.`,
			)
		) {
			return false
		}

		try {
			const res = await fetch(`/api/admin/users/${id}`, {
				method: 'DELETE',
			})

			if (res.ok) {
				fetchUsers()
				return true
			}
			return false
		} catch (error) {
			toast.error('Ошибка сети')
			return false
		}
	}

	return {
		users,
		loading,
		handleCreateUser,
		toggleBlock,
		handleDeleteUser,
		fetchUsers,
	}
}
