'use client'

import { useState } from 'react'
import { INITIAL_COLUMNSS } from './constants'
import { ColumnDef, ProductColumnKey } from './types'

export const useColumnSettings = () => {
	const [columns, setColumns] = useState<ColumnDef[]>(INITIAL_COLUMNSS)

	const toggleColumnVisibility = (key: ProductColumnKey) => {
		setColumns(prev =>
			prev.map(col =>
				col.key === key ? { ...col, isVisible: !col.isVisible } : col,
			),
		)
	}

	const resetToDefault = () => {
		setColumns(INITIAL_COLUMNSS)
	}

	return {
		columns,
		toggleColumnVisibility,
		resetToDefault,
	}
}
