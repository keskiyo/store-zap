import React from 'react'
import { Contacts, MainPage, Categories, Tovar } from '@/components/shared'

export default function Home() {
	return (
		<main className='py-8'>
			<div className='container'>
				{/* <MainPage /> */}
				{/* <Categories /> */}
				{/* <Contacts /> */}
				<Tovar />
			</div>
		</main>
	)
}
