import { User } from 'lucide-react'
import { ActivityCard } from '../ActivityCard'
import { EmptyState } from '../EmptyState'

type Props = {
	users: any[]
	onLoadMore: () => void
}

export function UsersFeed({ users, onLoadMore }: Props) {
	return (
		<ActivityCard
			title='Новые пользователи'
			icon={<User className='w-5 h-5' />}
		>
			{users.length === 0 && (
				<EmptyState text='Нет новых пользователей' />
			)}

			{users.map(user => (
				<div
					key={user.id}
					className='flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition'
				>
					<div>
						<p className='font-medium text-gray-800'>
							{user.email}
						</p>
						<p className='text-xs text-gray-400'>{user.name}</p>
					</div>
					<span className='text-xs text-gray-400'>
						{new Date(user.createdAt).toLocaleDateString()}
					</span>
				</div>
			))}

			<button
				onClick={onLoadMore}
				className='w-full mt-3 py-2 rounded-xl border text-sm text-gray-600 hover:bg-gray-50 transition'
			>
				Загрузить больше
			</button>
		</ActivityCard>
	)
}
