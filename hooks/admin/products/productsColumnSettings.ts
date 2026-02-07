'use client'

import { INITIAL_COLUMNS } from '@/constants/admin/products-constants'
import { ColumnDef, ProductColumnKey } from '@/types/admin/products'
import { useState } from 'react'

export const productsColumnSettings = () => {
	const [columns, setColumns] = useState<ColumnDef[]>(INITIAL_COLUMNS)

	const toggleColumnVisibility = (key: ProductColumnKey) => {
		setColumns(prev =>
			prev.map(col =>
				col.key === key ? { ...col, isVisible: !col.isVisible } : col,
			),
		)
	}

	const resetToDefault = () => {
		setColumns(INITIAL_COLUMNS)
	}

	return {
		columns,
		toggleColumnVisibility,
		resetToDefault,
	}
}
