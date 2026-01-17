'use client'

import { AuthModal, ProfileButton, TopKatalog } from '@/components/shared'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../../../ui'

interface Props {
	className?: string
	hasSearch?: boolean
}

export const NavMobile: React.FC<Props> = ({ className, hasSearch = true }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [openAuth, setOpenAuth] = React.useState(false)

	// Закрытие мобильного меню при изменении размера окна
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsMobileMenuOpen(false)
			}
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div className={className}>
			{/* Мобильная навигация */}
			<div className='lg:hidden flex items-center justify-between py-3'>
				{/* Логотип и кнопка меню */}
				<div className='flex items-center gap-3'>
					<Image
						src='/forSite/logoauto.jpg'
						alt='rus.avto'
						width={60}
						height={60}
						priority
						className='w-20 h-20'
					/>
					<Link href='/' className='flex flex-col'>
						<strong className='text-3xl text-orange-500'>
							Rus-autovaz
						</strong>
						<p className='text-1xl text-gray-500'>Автозапчасти</p>
					</Link>
				</div>

				<div className='flex items-center gap-2'>
					<Button
						variant='ghost'
						className='lg:hidden flex items-center p-2 cursor-pointer'
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<X size={40} />
						) : (
							<Menu size={40} />
						)}
					</Button>
				</div>
			</div>

			{/* Поиск для мобильных устройств */}
			{hasSearch && (
				<div className='lg:hidden mt-3 mb-2'>
					<TopKatalog className='w-full min-w-0' />
				</div>
			)}

			{/* Мобильное меню */}
			{isMobileMenuOpen && (
				<div className='lg:hidden bg-[#eeeeee] mt-4 py-4'>
					<div className='flex flex-col space-y-3'>
						<Link
							href='/category'
							className='font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 py-2 w-full text-center border-gray-500 outline text-base'
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Категории
						</Link>
						<Link
							href='/contacts'
							className='font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 py-2 w-full text-center border-gray-500 outline text-base'
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Контакты
						</Link>
						<AuthModal
							open={openAuth}
							onClose={() => setOpenAuth(false)}
						/>

						<ProfileButton
							onClickSingIn={() => setOpenAuth(true)}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
