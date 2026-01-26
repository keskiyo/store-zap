'use client'

import { Button } from '@/components/ui'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BlockedPage() {
	const router = useRouter()

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
			<div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center'>
				<div className='mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
					<Lock className='w-8 h-8 text-red-600' />
				</div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>
					Ваша учетная запись заблокирована
				</h1>
				<p className='text-gray-600 mb-6'>
					К сожалению, доступ к аккаунту ограничен. Если вы считаете,
					что это ошибка, пожалуйста, свяжитесь с поддержкой.
				</p>
				<Button onClick={() => router.push('/')} className='w-full'>
					На главную страницу
				</Button>
			</div>
		</div>
	)
}
