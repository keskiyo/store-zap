import type { UserRole } from '@prisma/client'
import { DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: {
			user: any
			id: string
			role: UserRole
			name?: string | null
			email?: string | null
			image?: string | null
		}
	}

	interface User extends DefaultUser {
		id: number
		name?: string | null
		email?: string | null
		role: UserRole
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: string
		role: UserRole
	}
}
