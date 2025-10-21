// 'use client'

import { Title } from '@/components/shared'
import { Container } from '@/components/ui'

export default function CheckOrder() {
	return (
		<Container className='mt-10'>
			<Title
				text='Оформление заказа'
				className='font-extrabold mb-8 text-[36px]'
			/>
			<h1>CheckOrder</h1>
		</Container>
	)
}
