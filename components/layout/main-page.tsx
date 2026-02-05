import React from 'react'
import { cn } from '@/lib/utils'
import { Title } from '@/components/shared'

interface Props {
	className?: string
}

export const MainPage: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('py-10', className)}>
			<Title
				text='Rus-autovaz - интернет-магазин для российских автомобилей.'
				className='text-[#8d9191]'
				size='xl'
			/>
			<ul className='text-[#8d9191] [&>li]:mb-[1em]'>
				<li className='content-list__item'>
					Здесь вы найдете все необходимое для вашего автомобиля: от фильтров и
					масел до тормозной системы и элементов подвески. Мы предлагаем широкий
					ассортимент запчастей, гарантируя высокое качество и надежность
					товаров. Наш магазин предлагает консультации специалистов по подбору
					запчастей, чтобы помочь вам сделать правильный выбор. Благодаря
					удобной системе оплаты и быстрой доставке вы сможете легко и быстро
					приобрести необходимые детали для вашего автомобиля прямо из дома.
					Надеемся, что ваше путешествие по нашему магазину будет приятным и
					плодотворным. Спасибо за ваш выбор!
				</li>
			</ul>

			<ul className='text-[18px] leading-[1.5] text-[#8d9191] pl-[50px] [&>li]:mb-[1em]'>
				<li className='list-disc pl-[5px]'>Высокое качество продукции</li>
				<li className='list-disc pl-[5px]'>Быстрая доставка</li>
				<li className='list-disc pl-[5px]'>Привлекательные цены</li>
				<li className='list-disc pl-[5px]'>Удобный поиск по каталогу</li>
				<li className='list-disc pl-[5px]'>
					Профессиональная поддержка клиентов
				</li>
			</ul>

			<ul className='text-[#8d9191] [&>li]:mb-[1em]'>
				<li className='content-list__item'>
					В этом интернет магазине, вы можете найти запчасти для марок
					автомобилей:
				</li>
				<li className='content-list__item'>
					Ваз 2101-07, Лада 2103-09-2115, Приора, Гранта, Нива 2121-21213, Нива
					Шива.
				</li>
			</ul>
		</div>
	)
}
