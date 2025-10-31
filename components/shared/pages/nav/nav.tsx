'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import {
	AuthModal,
	NavMobile,
	ProfileButton,
	TopKatalog,
} from '@/components/shared'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

interface Props {
	className?: string
	hasSearch?: boolean
}

export const Nav: React.FC<Props> = ({ hasSearch = true, className }) => {
	const [openAuth, setOpenAuth] = React.useState(false)
	const searchParams = useSearchParams()

	React.useEffect(() => {
		if (searchParams.has('paid')) {
			setTimeout(() => {
				toast.success('Заказ успешно оплачен !')
			}, 300)
		}
	}, [])

	return (
		<div>
			<nav className={cn('nav', className)}>
				<div className='container '>
					<div className='hidden lg:flex items-center justify-between py-3 gap-4'>
						<div className='flex items-center gap-3 flex-shrink-0 min-w-[140px]'>
							<Image
								src='/forSite/logoauto.jpg'
								alt='rus-autovaz'
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
								href='/category'
								className='font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 whitespace-nowrap text-[17px]'
							>
								Категории
							</Link>

							<Link
								href='/contacts'
								className='font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 whitespace-nowrap text-[17px]'
							>
								Контакты
							</Link>

							<AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />

							<ProfileButton onClickSingIn={() => setOpenAuth(true)} />
						</div>
					</div>
					<NavMobile />
				</div>
			</nav>
		</div>
	)
}
