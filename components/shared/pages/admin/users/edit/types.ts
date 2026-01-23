import { EditUserValues } from '@/components/shared/constants/admin-users-schema'
import { User as PrismaUser, UserRole } from '@prisma/client'

export type EditUser = Omit<
	PrismaUser,
	| 'password'
	| 'provider'
	| 'providerId'
	| 'verificationCode'
	| 'cart'
	| 'orders'
	| 'verified'
> & {
	createdAt: string
	updatedAt: string
	verified: boolean
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
	user?: EditUser | null
	loading: boolean
	handleSubmit: (data: EditUserValues) => Promise<void>
	onCancel: () => void
	className?: string
}

export interface EditUserPageProps {
	className?: string
	params: { id: string }
}
