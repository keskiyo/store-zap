import type { Metadata } from 'next'
import './admin-style.css'

export const metadata: Metadata = {
	title: 'Rus-autovaz | Админка',
	description: 'Панель администратора',
}

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <main className='min-h-screen flex flex-col'>{children}</main>
}
