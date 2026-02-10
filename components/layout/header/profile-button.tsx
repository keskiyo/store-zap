'use client'

import { Button } from '@/components/ui'
import {
	ChevronDown,
	CircleUser,
	ClipboardList,
	SquareUser,
	User,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
	className?: string
	onClickSingIn?: () => void
}

export const ProfileButton: React.FC<Props> = ({
	className,
	onClickSingIn,
}) => {
	const { data: session } = useSession()
	const [isOpen, setIsOpen] = useState(false)

	const handleToggle = () => setIsOpen(!isOpen)

	const onClickSignOut = () => {
		signOut({ callbackUrl: '/' })
	}

	return (
		<div className={className}>
			{!session ? (
				<Button
					variant='outline'
					onClick={onClickSingIn}
					className='flex w-full items-center gap-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 whitespace-nowrap cursor-pointer'
				>
					<User size={18} />
					<span className='text-[17px]'>Войти</span>
				</Button>
			) : (
				<div className='relative'>
					<Button
						variant='secondary'
						onClick={handleToggle}
						className='flex items-center gap-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 cursor-pointer'
					>
						<CircleUser size={18} />
						<span className='text-[17px]'>Профиль</span>
						<ChevronDown
							size={16}
							className={
								isOpen
									? 'rotate-180 transition-transform'
									: 'transition-transform'
							}
						/>
					</Button>

					{/* Выпадающее меню */}
					{isOpen && (
						<div className='absolute flex flex-col items-center justify-center right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1'>
							<Link
								href='/profile'
								className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors'
								onClick={() => setIsOpen(false)}
							>
								<SquareUser size={14} />
								Мой профиль
							</Link>
							<Link
								href='/profile/cart'
								className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors'
								onClick={() => setIsOpen(false)}
							>
								<ClipboardList size={14} />
								История заказов
							</Link>

							{/* Кнопка админа показывается только если роль ADMIN */}
							{session.user.role === 'ADMIN' && (
								<Link
									href='/admin'
									className='flex items-center gap-2 px-4 py-2 text-sm text-orange-600 font-medium hover:bg-orange-50 transition-colors border-t border-gray-100 mt-1 pt-2'
									onClick={() => setIsOpen(false)}
								>
									Панель администратора
								</Link>
							)}

							<Button
								onClick={onClickSignOut}
								variant='secondary'
								className='flex items-center gap-2 px-4 py-2 text-sm text-orange-600 font-medium hover:text-orange-400 transition-colors'
								type='button'
							>
								Выйти
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
