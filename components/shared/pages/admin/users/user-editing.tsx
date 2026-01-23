'use client'

import { useRouter } from 'next/navigation'
import { EditUserForm } from './edit/EditUserForm'
import { EditUserPageProps } from './edit/types'
import { useEditUser } from './edit/useEditUser'

export const EditUserPage: React.FC<EditUserPageProps> = ({
	className,
	params,
}) => {
	const router = useRouter()

	const { user, loading, handleSubmit } = useEditUser({
		id: params.id,
		router,
	})

	return (
		<EditUserForm
			user={user}
			loading={loading}
			handleSubmit={handleSubmit}
			onCancel={() => router.back()}
			className={className}
		/>
	)
}
