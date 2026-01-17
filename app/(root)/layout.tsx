import { CartSyncer } from '@/components/shared/pages/another/cart-syncer'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Footer, Nav } from '../../components/shared'

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
		<main className='min-h-screen flex flex-col '>
			<Suspense>
				<Nav />
				<CartSyncer />
			</Suspense>
			{children}
			<Footer />
		</main>
	)
}
