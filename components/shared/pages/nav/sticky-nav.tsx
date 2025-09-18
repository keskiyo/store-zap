import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button, DropdownMenu, Input } from '@/components/ui'
import {
	AlignJustify,
	ArrowBigRight,
	Search,
	ShoppingCart,
	User,
} from 'lucide-react'
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SearchInputNav } from '@/components/shared'

interface Props {
	className?: string
}

export const StickyNav: React.FC<Props> = ({ className }) => {
	return (
		<nav
			className={cn(
				'p-4 sticky top-0 z-[50] shadow-md transition-all duration-300',
				className
			)}
			style={{ backgroundColor: 'var(--white)' }}
		>
			<div className='container'>
				<div className='nav-row'>
					<div
						className={cn(
							'flex w-full items-center justify-between gap-3',
							className
						)}
					>
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

						<div className='hidden md:flex flex-1 mx-2'>
							<SearchInputNav className='w-full' />
						</div>

						<div>
							<Button
								className='
      group 
      relative 
      flex items-center 
      bg-[#ff9100] text-white 
      px-4 py-2 
      rounded-md 
			cursor-pointer
      overflow-hidden 
      transition-all duration-300
      hover:bg-[#ff9100]/90
      hover:shadow-md
    '
								variant='outline'
							>
								<span className='font-semibold'>520 ₽</span>
								<span className='h-full w-[1px] bg-white/30 mx-3' />
								<div className='flex items-center gap-2 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-4'>
									<ShoppingCart size={16} strokeWidth={2} />
									<span className='font-semibold'>3</span>
								</div>

								<ArrowBigRight
									size={23}
									className='
        absolute right-4
        transition-all duration-300 
        opacity-0 group-hover:opacity-100
        translate-x-4 group-hover:translate-x-0
      '
								/>
							</Button>
						</div>
						<div className='flex items-center gap-3'>
							<DropdownMenu modal={false}>
								<DropdownMenuTrigger asChild>
									<div className='flex items-center hover:border-[#ff9100] group transition-colors duration-200 cursor-pointer'>
										<AlignJustify
											size={35}
											className='group-hover:text-[#ff9100] transition-colors'
										/>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className='absolute top-full bg-white shadow-md w-30 mt-2'
									style={{ left: '-60px' }}
								>
									<DropdownMenuItem className='text-center justify-center'>
										<Link href='/'>Главная</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className='text-center justify-center'>
										<Link href='/category'>Каталог</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className='text-center justify-center'>
										<Link href='/contacts'>Контакты</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className='text-center justify-center'>
										<Link href='/login'>Вход</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
