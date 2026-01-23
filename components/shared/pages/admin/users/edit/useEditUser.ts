'use client'

import { EditUserValues } from '@/components/shared/constants/admin-users-schema'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { EditUser, UseEditUserParams } from './types'

export const useEditUser = ({ id, router }: UseEditUserParams) => {
	const [user, setUser] = useState<EditUser | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch(`/api/admin/users/${id}`)
				if (!res.ok) throw new Error('Not found')
				const rawData = await res.json()

				const userToSet: EditUser = {
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

	const handleSubmit = async (data: EditUserValues) => {
		try {
			const res = await fetch(`/api/admin/users/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (res.ok) {
				toast.success('Данные обновлены', { duration: 4000 })
				router.push('/admin/users')
			} else {
				toast.error('Ошибка обновления', { duration: 4000 })
			}
		} catch (error) {
			console.error(error)
		}
	}

	return {
		user,
		loading,
		handleSubmit,
	}
}
