'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { INITIAL_COLUMNS } from './constants'
import { ColumnDef } from './types'

export const useColumnSettings = () => {
	const { data: session } = useSession()
	const [columns, setColumns] = useState<ColumnDef[]>(INITIAL_COLUMNS)

	useEffect(() => {
		const userId = session?.user?.id || 'default'
		const storageKey = `admin-users-columns-${userId}`
		const savedColumns = localStorage.getItem(storageKey)

		if (savedColumns) {
			try {
				setColumns(JSON.parse(savedColumns))
			} catch (e) {
				console.error('Ошибка загрузки настроек колонок', e)
			}
		}
	}, [session?.user?.id])

	useEffect(() => {
		const userId = session?.user?.id || 'default'
		const storageKey = `admin-users-columns-${userId}`
		localStorage.setItem(storageKey, JSON.stringify(columns))
	}, [columns, session?.user?.id])

	const toggleColumnVisibility = (key: ColumnDef['key']) => {
		setColumns(prev =>
			prev.map(col =>
				col.key === key ? { ...col, isVisible: !col.isVisible } : col,
			),
		)
	}

	return { columns, setColumns, toggleColumnVisibility }
}
