'use client'

import React from 'react'
import Image from 'next/image'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Title, CartDrawerItem } from '@/components/shared'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/index'

interface Props {
	className?: string //11 13
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<SheetHeader>
					<SheetTitle>
						В корзине <span className='font-bold'>3 товара</span>
					</SheetTitle>
				</SheetHeader>

				<div className='-mx-6 mt-5 overflow-auto flex-1'>
					<div className='mb-2'>
						<CartDrawerItem
							id={1}
							name='Шаровый комплект'
							price={3946}
							imageUrl='public/tovars/Shar_compl.jpg'
							count={3}
							brand='GSP'
							article='111113'
						/>
					</div>
				</div>

				<SheetFooter className=' bg-white p-8'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-neutral-500'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
							</span>

							<span className='font-bold text-lg'>520 ₽</span>
						</div>
						<Link href='/checkout'>
							<Button
								// onClick={() => setRedirecting(true)}
								// loading={redirecting}
								type='submit'
								className='w-full h-12 text-base cursor-pointer bg-[#ff9100] text-white hover:bg-[#ff9100]/90 hover:shadow-md transition-all duration-300'
							>
								Оформить заказ
								<ArrowRight className='w-5 ml-2' />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
