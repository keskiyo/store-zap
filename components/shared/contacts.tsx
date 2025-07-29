import React from 'react'
import Image from 'next/image'
import { cn } from '@/components/shared/lib/utils'
import { Title } from '@/components/shared'
import { YandexMap } from '@/components/ui'

interface Props {
	className?: string
}

export const Contacts: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<Title
				text='Наши контакты для связи:'
				className='text-[#444444]'
				size='lg'
			/>

			<span className='text-[#444444]'> Номер телефона: </span>
			<span className='text-[#444444]'>Почта для связи: Autovaz@gmail.com</span>

			<div className='flex items-center gap-3'>
				<Title
					text='Оставайтесь на связи'
					className='text-[#444444]'
					size='lg'
				/>
				<Image
					src='/forSite/vk.jpg'
					alt='rus.avto'
					width={44}
					height={44}
					className='rounded-lg'
				/>
				<Image
					src='/forSite/whatsapp.jpg'
					alt='rus.avto'
					width={45}
					height={45}
					className='rounded-lg'
				/>
			</div>
			<Title
				text='Расположение магазина на карте'
				className='text-[#444444]'
				size='lg'
			/>
			<YandexMap className='my-4' height='500px' />
		</div>
	)
}
