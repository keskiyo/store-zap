'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../../../ui'
import { User } from 'lucide-react'
import { StickyNav } from '@/components/shared'

interface Props {
	className?: string
}

export const Nav: React.FC<Props> = ({ className }) => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [lastScrollY, setLastScrollY] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY

			if (currentScrollY > 150) {
				setIsScrolled(true)
			}
			if (currentScrollY <= 100) {
				setIsScrolled(false)
			}

			setLastScrollY(currentScrollY)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [lastScrollY])

	return (
		<div>
			<nav className={cn('nav', className)}>
				<div className='container'>
					<div className='nav-row'>
						<Image
							src='/forSite/logoauto.jpg'
							alt='rus.avto'
							width={65}
							height={65}
							priority
						/>
						<Link href='/' className='logo'>
							<strong style={{ color: 'var(--orange)' }}>Rus-autovaz</strong>
							<p className='text-sm text-gray-400 leading-3 tracking-wide'>
								Автозапчасти
							</p>
						</Link>

						<div
							className={cn(
								'inline-flex gap-8 cursor-pointer text-gray-600',
								className
							)}
						>
							<div className='flex items-center font-bold pb-1 transition-colors font-[Poppins] text-[18px] border-b-2 border-transparent gap-8'>
								<Link
									href='/'
									className='hover:text-[#ff9100] hover:border-[#ff9100]'
								>
									Главная
								</Link>
								<Link
									href='/category'
									className='hover:text-[#ff9100] hover:border-[#ff9100]'
								>
									Каталог
								</Link>
								<Link
									href='/contacts'
									className='hover:text-[#ff9100] hover:border-[#ff9100]'
								>
									Контакты
								</Link>
							</div>
						</div>

						<div className='flex items-center gap-3'>
							<Button
								variant='outline'
								className='flex items-center gap-1 border hover:border-[#ff9100] group transition-colors duration-200 cursor-pointer'
							>
								<User
									size={15}
									className='group-hover:text-[#ff9100] transition-colors'
								/>
								<span className='group-hover:text-[#ff9100] transition-colors'>
									Войти
								</span>
							</Button>
						</div>
					</div>
				</div>
			</nav>
			<div
				className={cn(
					'fixed top-0 left-0 w-full transition-all duration-300 z-[50]',
					isScrolled
						? 'translate-y-0 opacity-100'
						: '-translate-y-full opacity-0'
				)}
			>
				<StickyNav />
			</div>
		</div>
	)
}

// Сделать чтобы если авторизовался как админ будет кнопка профиль и панель админа, а если пользователь будет кнопка профиль
