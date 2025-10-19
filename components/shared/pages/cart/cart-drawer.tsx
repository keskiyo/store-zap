'use client'

import React from 'react'
import Image from 'next/image'
import {
	Sheet,
	SheetClose,
	SheetContent,
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

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { sum, items, updateItemCount, removeCartItem } = useCart()
	const [redirecting, setRedirecting] = React.useState(false)

	const onClickCountButton = (
		id: number,
		count: number,
		type: 'plus' | 'minus'
	) => {
		const newCount = type === 'plus' ? count + 1 : count - 1
		updateItemCount(id, newCount)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<div className={cn('flex flex-col h-full', !sum && 'justify-center')}>
					{sum > 0 && (
						<SheetHeader>
							<SheetTitle>
								В корзине <span className='font-bold'>{items.length}</span>
							</SheetTitle>
						</SheetHeader>
					)}

					{!sum && (
						<div className='flex flex-col items-center justify-center w-72 mx-auto'>
							<Image
								src='/assets/images/empty-box.png'
								alt='Empty cart'
								width={120}
								height={120}
							/>
							<Title
								size='sm'
								text='Корзина пустая'
								className='text-center font-bold my-2'
							/>
							<p className='text-center text-neutral-500 mb-5'>
								Добавьте хотя бы один товар, чтобы совершить заказ
							</p>

							<SheetClose>
								<Button className='w-56 h-12 text-base' size='lg'>
									<ArrowLeft className='w-5 mr-2' />
									Вернуться назад
								</Button>
							</SheetClose>
						</div>
					)}

					{sum > 0 && (
						<>
							<div className='-mx-6 mt-5 overflow-auto flex-1'>
								{items.map(item => (
									<div key={item.id} className='mb-2'>
										<CartDrawerItem
											id={item.id}
											imageUrl={item.imageUrl}
											disabled={item.disabled}
											name={item.name}
											price={item.price}
											article={item.article}
											brand={item.brand}
											count={item.count}
											onClickCountButton={type =>
												onClickCountButton(item.id, item.count, type)
											}
											onClickRemove={() => removeCartItem(item.id)}
										/>
									</div>
								))}
							</div>

							<SheetFooter className='-mx-6 bg-white p-8'>
								<div className='w-full'>
									<div className='flex mb-4'>
										<span className='flex flex-1 text-lg text-neutral-500'>
											Итого
											<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
										</span>

										<span className='font-bold text-lg'>{sum} ₽</span>
									</div>

									<Link href='/checkout'>
										<Button
											onClick={() => setRedirecting(true)}
											loading={redirecting}
											type='submit'
											className='w-full h-12 text-base'
										>
											Оформить заказ
											<ArrowRight className='w-5 ml-2' />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
