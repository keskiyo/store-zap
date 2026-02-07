import { Product as PrismaProduct } from '../api/index'
export type Product = PrismaProduct & {
	category?: { id: number; name: string; imageUrl?: string | null }
	specifications?: Array<{ id: number; key: string; value: string }>
}

export type ProductColumnKey = keyof Product

export interface ColumnDef {
	key: ProductColumnKey
	label: string
	isVisible: boolean
}

export interface SortConfig {
	key: ProductColumnKey
	direction: 'asc' | 'desc'
}

export interface Category {
	id: number
	name: string
	img?: string | null
}

export interface SpecificationState {
	key: string
	value: string
}
