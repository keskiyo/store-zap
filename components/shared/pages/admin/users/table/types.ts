import { User as PrismaUser } from '@prisma/client'

export type User = Omit<
	PrismaUser,
	| 'password'
	| 'provider'
	| 'providerId'
	| 'verificationCode'
	| 'cart'
	| 'orders'
> & {
	createdAt: string
	updatedAt: string
	verified?: string | null
}

export type ColumnKey = keyof User

export interface ColumnDef {
	key: ColumnKey
	label: string
	isVisible: boolean
}

export interface SortConfig {
	key: ColumnKey
	direction: 'asc' | 'desc'
}
