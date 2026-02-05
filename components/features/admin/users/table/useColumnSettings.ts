'use client'

import { useState } from 'react'
import { ColumnDef, ColumnKey } from './types'

// Начальные данные уже с правильным типом ColumnDef
export const INITIAL_COLUMNS: ColumnDef[] = [
	{ key: 'id', label: 'ID', isVisible: true },
	{ key: 'name', label: 'Имя', isVisible: true },
	{ key: 'email', label: 'Email', isVisible: true },
	{ key: 'role', label: 'Роль', isVisible: true },
	{ key: 'verified', label: 'Подтвержден', isVisible: true },
	{ key: 'isBlocked', label: 'Статус', isVisible: true },
	{ key: 'createdAt', label: 'Создан', isVisible: false },
	{ key: 'updatedAt', label: 'Обновлен', isVisible: false },
]

export const useColumnSettings = () => {
	const [columns, setColumns] = useState<ColumnDef[]>(INITIAL_COLUMNS)

	const toggleColumnVisibility = (key: ColumnKey) => {
		setColumns(prev =>
			prev.map(col =>
				col.key === key ? { ...col, isVisible: !col.isVisible } : col,
			),
		)
	}

	const resetToDefault = () => {
		setColumns(
			INITIAL_COLUMNS.map(col => ({
				...col,
				isVisible: col.isVisible,
			})),
		)
	}

	const setColumnVisibility = (key: ColumnKey, isVisible: boolean) => {
		setColumns(prev =>
			prev.map(col => (col.key === key ? { ...col, isVisible } : col)),
		)
	}

	return {
		columns,
		toggleColumnVisibility,
		resetToDefault,
		setColumnVisibility,
	}
}
