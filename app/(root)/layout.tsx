import type { Metadata } from 'next'
import { Footer, Nav } from '../../components/shared'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Запчасти для российских автомобилей в магазине Rus-avto.ru',
	description: 'Автозапчасти для российских автомобилей',
}

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className='min-h-screen flex flex-col'>
			<Suspense>
				<Nav />
			</Suspense>
			{children}
			<Footer />
		</main>
	)
}
