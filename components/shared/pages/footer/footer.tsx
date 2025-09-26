import React from 'react'
import { cn } from '@/lib/utils'
import { FooterLink } from '@/components/shared'

interface FooterProps {
	className?: string
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className={cn('footer', className)}>
			<div className='footer__wrapper w-full px-4'>
				<div className='flex flex-col md:flex-row md:justify-between gap-10 md:gap-40'>
					{/* Колонка информации */}
					<div className='flex flex-col gap-4'>
						<h4 className='text-lg font-bold'>ИНФОРМАЦИЯ</h4>
						<div className='flex flex-col gap-3'>
							<FooterLink href='/'>О магазине</FooterLink>
							<FooterLink href='/delivery'>Оплата и доставка</FooterLink>
							<span>Rus-autovaz@gmail.com</span>
						</div>
					</div>

					{/* Колонка времени работы */}
					<div className='flex flex-col gap-4'>
						<h4 className='text-lg font-bold'>ВРЕМЯ РАБОТЫ</h4>
						<div className='flex flex-col gap-3'>
							<p>г. Барнаул, ул. Покровская, 10</p>
							<p>пн-вс: 9:00 - 18:00</p>
							<p>без перерыва</p>
						</div>
					</div>

					{/* Колонка контактов */}
					<div className='flex flex-col gap-4'>
						<h4 className='text-lg font-bold'>КОНТАКТЫ</h4>
						<div className='flex flex-col gap-3'>
							<FooterLink href='tel:+79825427227'>982 542-72-27</FooterLink>
							<FooterLink href='tel:+79825427228'>982 542-72-28</FooterLink>
							<FooterLink href='tel:+79825427229'>982 542-72-29</FooterLink>
						</div>
					</div>
				</div>

				{/* Копирайт */}
				<div className='pt-8 copyright'>
					<p>© {currentYear} rus-autovaz.ru</p>
				</div>
			</div>
		</footer>
	)
}
