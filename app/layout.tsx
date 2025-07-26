import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Nav } from '../components/shared'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
	title: 'Запчасти для российских автомобилей в магазине Rus-avto.ru',
	description: 'Автозапчасти для российских автомобилей',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${nunito.className} antialiased`}>
				<main className='min-h-screen'>
					<Nav />
					{children}
				</main>
			</body>
		</html>
	)
}
