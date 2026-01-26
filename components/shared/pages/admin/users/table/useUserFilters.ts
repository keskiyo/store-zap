'use client'

import { useMemo, useState } from 'react'
import { sortUsers } from './tableUtils'
import { ColumnKey, User } from './types'

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
