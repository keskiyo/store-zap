import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { CircleUser, User } from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'

interface Props {
	className?: string
	onClickSingIn?: () => void
}

export const ProfileButton: React.FC<Props> = ({
	className,
	onClickSingIn,
}) => {
	const { data: session } = useSession()

	return (
		<div className={className}>
			{!session ? (
				<Button
					variant='outline'
					onClick={onClickSingIn}
					className='flex items-center gap-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 whitespace-nowrap cursor-pointer'
				>
					<User size={18} />
					<span className='text-[17px]'>Войти</span>
				</Button>
			) : (
				<Link href='/profile'>
					<Button
						variant='secondary'
						className='flex items-center gap-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 whitespace-nowrap cursor-pointer'
					>
						<CircleUser size={18} />
						<span className='text-[17px]'>Профиль</span>
					</Button>
				</Link>
			)}
		</div>
	)
}
