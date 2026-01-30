import { UpdateUserDTO } from '@/lib/admin-user-from'
import { UserRole } from '@prisma/client'

export interface User {
	id: number
	name: string
	email: string
	role: 'ADMIN' | 'USER'
	verified: boolean
	isBlocked: boolean
	createdAt: string
	updatedAt: string
}

export type ColumnKey = keyof User

export interface ColumnDef {
	key: ColumnKey
	label: string
	isVisible: boolean
	defaultVisible?: boolean
}

export interface SortConfig {
	key: ColumnKey
	direction: 'asc' | 'desc'
}
export type FormDataState = {
	name: string
	email: string
	role: UserRole
	password: string
	isBlocked: boolean
	verified: boolean
}

export interface UseEditUserParams {
	id: string
	router: ReturnType<typeof import('next/navigation').useRouter>
}

export interface EditUserFormProps {
	user?: User | null
	loading: boolean
	handleSubmit: (data: UpdateUserDTO) => Promise<void>
	onCancel: () => void
	className?: string
}

export interface EditUserPageProps {
	className?: string
	params: { id: string }
}
