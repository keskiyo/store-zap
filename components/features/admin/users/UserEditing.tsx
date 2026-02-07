'use client'

import { useRouter } from 'next/navigation'
import { useEditUser } from '../../../../hooks/admin/users/useEditUser'
import { EditUserPageProps } from '../../../../types/admin/users'
import { EditUserForm } from './table/EditUserForm'

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
