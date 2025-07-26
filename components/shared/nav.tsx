import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui'
import { User } from 'lucide-react'

interface Props {
	className?: string
}

export const Nav: React.FC<Props> = ({ className }) => {
	return (
		<nav className={cn('nav', className)}>
			<div className='container'>
				<div className='nav-row'>
					<Image
						src='/forSite/logoavto.jpg'
						alt='rus.avto'
						width={65}
						height={65}
					/>
					<a href='/' className='logo'>
						<strong style={{ color: 'var(--orange)' }}>Rus-avto</strong>
						<p className='text-sm text-gray-400 leading-3'>Автозапчасти</p>
					</a>

					<ul className='nav-list'>
						<li className='nav-list__item'>
							<a href='/'>Главная</a>
						</li>

						<li className='nav-list__item'>
							<a href='/'>Каталог</a>
						</li>

						<li className='nav-list__item'>
							<a href='/'>Контакты</a>
						</li>

						<li className='nav-list__item'>
							<a href='/'>Корзина</a>
						</li>

						<div className='flex items-center gap-3'>
							<Button variant='outline' className='flex items-center gap-1'>
								<User size={15} />
								Войти
							</Button>
						</div>
					</ul>
				</div>
			</div>
		</nav>
	)
}
