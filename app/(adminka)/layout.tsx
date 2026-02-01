import { AdminNav } from '@/components/shared/pages'
import { getUserSession } from '@/lib/get-user-session'
import type { Metadata } from 'next'
// import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import './admin-style.css'

export const metadata: Metadata = {
	title: 'Rus-autovaz | Админка',
	description: 'Панель администратора',
}

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getUserSession()

	// if (!session || session?.role !== 'ADMIN') {
	// 	return redirect('/not-auth')
	// }
	return (
		<main className='min-h-screen flex flex-col'>
			<Suspense>
				<AdminNav />
			</Suspense>
			<Toaster />
			{children}
		</main>
	)
}
