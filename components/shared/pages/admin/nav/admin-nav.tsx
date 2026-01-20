'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
	className?: string
}

export const AdminNav: React.FC<Props> = ({ className }) => {
	const pathname = usePathname()
	const isActive = (path: string) =>
		pathname === path ? 'text-orange-500 font-bold' : 'text-gray-700'
	return (
		<div className={className}>
			<div className='bg-gray-50'>
				<header className='bg-white border-b border-gray-200 shadow-sm'>
					<div className='container mx-auto px-4'>
						<div className='hidden lg:flex items-center justify-between py-3 gap-4'>
							{/* ЛЕВАЯ ЧАСТЬ: Кнопка назад на сайт */}
							<div className='flex items-center gap-3 flex-shrink-0 min-w-[140px]'>
								<Link
									href='/'
									className='flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='m15 18-6-6 6-6' />
									</svg>
									<span className='font-semibold text-sm'>
										Вернуться на сайт
									</span>
								</Link>
							</div>

							{/* ЦЕНТРАЛЬНАЯ ЧАСТЬ: Навигация по админке */}
							<div className='flex-grow flex justify-center gap-8'>
								<Link
									href='/admin/'
									className={`font-semibold transition-colors duration-200 ${isActive('/admin')}`}
								>
									Главная
								</Link>
								<Link
									href='/admin/users'
									className={`font-semibold transition-colors duration-200 ${isActive('/admin/users')}`}
								>
									Пользователи
								</Link>
								<Link
									href='/admin/products'
									className={`font-semibold transition-colors duration-200 ${isActive('/admin/products')}`}
								>
									Товары
								</Link>
								<Link
									href='/admin/carts'
									className={`font-semibold transition-colors duration-200 ${isActive('/admin/carts')}`}
								>
									Корзины
								</Link>
							</div>

							{/* ПРАВАЯ ЧАСТЬ: Профиль и Выход */}
							<div className='flex items-center gap-4 flex-shrink-0 min-w-[200px] justify-end'>
								<div className='flex items-center gap-3'>
									<div className='flex flex-col'>
										<span className='text-sm font-bold text-gray-800'>
											Admin
										</span>
										<Link
											href='/api/auth/logout'
											className='text-sm text-red-500 hover:underline cursor-pointer'
										>
											Выйти
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
			</div>
		</div>
	)
}
