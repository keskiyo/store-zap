import { EditUserPage } from '@/components/shared/pages'

export default async function UsersPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<div className='container py-10'>
			<EditUserPage params={{ id }} />
		</div>
	)
}
