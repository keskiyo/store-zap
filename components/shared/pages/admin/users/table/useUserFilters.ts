'use client'

import { useMemo, useState } from 'react'
import { ColumnKey, SortConfig, User } from './types'

// Сортировка массива пользователей
export const sortUsers = (
	users: User[],
	sortConfig: SortConfig | null,
): User[] => {
	let sortableItems = [...users]
	if (sortConfig !== null) {
		sortableItems.sort((a, b) => {
			const aValue = a[sortConfig.key]
			const bValue = b[sortConfig.key]

			if (aValue === null || aValue === undefined) return 1
			if (bValue === null || bValue === undefined) return -1

			if (aValue < bValue) {
				return sortConfig.direction === 'asc' ? -1 : 1
			}
			if (aValue > bValue) {
				return sortConfig.direction === 'asc' ? 1 : -1
			}
			return 0
		})
	}
	return sortableItems
}

export const useUsersFilter = (users: User[]) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [sortConfig, setSortConfig] = useState<{
		key: ColumnKey
		direction: 'asc' | 'desc'
	} | null>(null)

	const processedUsers = useMemo(() => {
		let items = [...users]

		if (searchTerm) {
			const lowerTerm = searchTerm.toLowerCase()
			items = items.filter(
				user =>
					user.name.toLowerCase().includes(lowerTerm) ||
					user.email.toLowerCase().includes(lowerTerm) ||
					user.role.toLowerCase().includes(lowerTerm) ||
					user.id.toString().includes(lowerTerm),
			)
		}

		return sortUsers(items, sortConfig)
	}, [users, searchTerm, sortConfig])

	const requestSort = (key: ColumnKey) => {
		let direction: 'asc' | 'desc' = 'asc'
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'asc'
		) {
			direction = 'desc'
		}
		setSortConfig({ key, direction })
	}

	return {
		searchTerm,
		setSearchTerm,
		sortConfig,
		requestSort,
		processedUsers,
	}
}
