'use client'

import { useRouter } from 'next/navigation'

export function QuickActions() {
	const router = useRouter()

	const actions = [
		{ label: 'Пользователи', path: '/admin/users' },
		{ label: 'Товары', path: '/admin/products' },
		{ label: 'Просмотр заказов', path: '/admin/orders' },
	]

	return (
		<div className='flex flex-wrap gap-3'>
			{actions.map(a => (
				<button
					key={a.label}
					onClick={() => router.push(a.path)}
					className='px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition'
				>
					{a.label}
				</button>
			))}
		</div>
	)
}
