'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../../../ui'
import { User } from 'lucide-react'
import { NavMobile, TopKatalog } from '@/components/shared'

interface Props {
	className?: string
	hasSearch?: boolean
}

export const Nav: React.FC<Props> = ({ hasSearch = true, className }) => {
	return (
		<div>
			<nav className={cn('nav', className)}>
				<div className='container '>
					<div className='hidden lg:flex items-center justify-between py-3 gap-4'>
						<div className='flex items-center gap-3 flex-shrink-0 min-w-[140px]'>
							<Image
								src='/forSite/logoauto.jpg'
								alt='rus.avto'
								width={65}
								height={65}
								priority
								className='w-12 h-12 lg:w-16 lg:h-16'
							/>
							<Link href='/' className='flex flex-col'>
								<strong className='text-lg lg:text-xl text-orange-500'>
									Rus-autovaz
								</strong>
								<p className='text-xs lg:text-sm text-gray-500 leading-3'>
									Автозапчасти
								</p>
							</Link>
						</div>
						{hasSearch && (
							<div className='flex-grow flex justify-center mx-2'>
								<TopKatalog className='w-full max-w-3xl' />
							</div>
						)}

						<div className='flex items-center gap-4 flex-shrink-0 min-w-[300px] justify-end'>
							<Link
								href='/'
								className='font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 whitespace-nowrap'
							>
								Главная
							</Link>
							<Link
								href='/category'
								className='font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 whitespace-nowrap'
							>
								Каталог
							</Link>
							<Link
								href='/contacts'
								className='font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 whitespace-nowrap'
							>
								Контакты
							</Link>

							<Button
								variant='outline'
								className='flex items-center gap-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 whitespace-nowrap cursor-pointer'
							>
								<User size={18} />
								<span>Войти</span>
							</Button>
						</div>
					</div>
					<NavMobile />
				</div>
			</nav>
		</div>
	)
}
