import { Contacts, MainPage, Categories } from '@/components/shared'
import React from 'react'

export default function Home() {
	return (
		<main className='py-8'>
			<div className='container'>
				{/* <MainPage /> */}
				<Categories />
				{/* <Contacts /> */}
			</div>
		</main>
	)
}
