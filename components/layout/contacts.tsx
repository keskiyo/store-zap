'use client'

import { Title } from '@/components/shared'
import { Skeleton, YandexMap } from '@/components/ui'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface Props {
	className?: string
}

export const Contacts: React.FC<Props> = ({ className }) => {
	const [isLoading, setIsLoading] = React.useState(true)
	const [isMapLoaded, setIsMapLoaded] = React.useState(false)
	const [mapKey, setMapKey] = React.useState(0)

	// Имитация загрузки данных
	React.useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	// Обработчик загрузки карты
	const handleMapLoad = () => {
		setIsMapLoaded(true)
	}

	React.useEffect(() => {
		if (!isLoading && !isMapLoaded) {
			setMapKey(prev => prev + 1)
		}
	}, [isLoading, isMapLoaded])

	if (isLoading) {
		return (
			<div className={cn('flex flex-col gap-6 py-10', className)}>
				{/* Заголовок */}
				<Skeleton className='h-10 w-3/4' />

				{/* Контактная информация */}
				<div className='space-y-3'>
					<Skeleton className='h-8 w-3/4' />
					<Skeleton className='h-6 w-1/2' />
					<Skeleton className='h-6 w-2/3' />
				</div>

				{/* Социальные сети */}
				<div className='flex items-center gap-3'>
					<Skeleton className='h-8 w-48' />
					{/* <Skeleton className='w-11 h-11 rounded-lg' /> */}
					<Skeleton className='w-11 h-11 rounded-lg' />
				</div>

				{/* Заголовок карты */}
				<Skeleton className='h-10 w-2/3' />

				{/* Скелетон карты */}
				<Skeleton className='h-[500px]' />
			</div>
		)
	}

	return (
		<div className={cn('flex flex-col gap-4 py-10', className)}>
			<Title
				text='Наши контакты для связи:'
				className='text-[#444444]'
				size='lg'
			/>

			<span className='text-[#444444]'>
				{' '}
				Номер телефона: +7 982 542-72-27
			</span>
			<span className='text-[#444444]'>
				Почта для связи: Rus-autovaz@gmail.com
			</span>

			<div className='flex items-center gap-3'>
				<Title
					text='Оставайтесь на связи'
					className='text-[#444444]'
					size='lg'
				/>
				<Image
					src='/forSite/tg.jpg'
					alt='rus.avto'
					width={75}
					height={75}
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
			<div className='relative'>
				<YandexMap
					key={mapKey}
					className='my-4'
					height='500px'
					onLoad={handleMapLoad}
				/>
				{!isMapLoaded && (
					<div className='absolute inset-0 z-10'>
						<Skeleton />
					</div>
				)}
			</div>
		</div>
	)
}
