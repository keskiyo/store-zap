import { WhiteBlock } from '@/components/shared/pages/another/white-block'
import { CheckoutItemsDetails } from '@/components/shared'
import { cn } from '@/lib/utils'
import React from 'react'
import { ArrowRight, Package, Truck } from 'lucide-react'
import { Button, Skeleton } from '@/components/ui'

const DELIVERY_PRICE = 120

interface Props {
	className?: string
	sum: number
	loading?: boolean
}

export const CheckoutSidebar: React.FC<Props> = ({
	className,
	sum,
	loading,
}) => {
	const totalPrice = DELIVERY_PRICE + sum

	return (
		<WhiteBlock className={cn('p-6 sticky top-4', className)}>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'> Итого: </span>
				{loading ? (
					<Skeleton className='h-11 w-48' />
				) : (
					<span className='h-11 text-[34px] font-bold'> {totalPrice} ₽</span>
				)}
			</div>

			<CheckoutItemsDetails
				title={
					<div className='flex items-center'>
						<Package size={20} className='mr-2 text-gray-400' />
						Стоимость корзины:
					</div>
				}
				value={
					loading ? <Skeleton className='h-6 w-16 rounded-[6px]' /> : `${sum} ₽`
				}
			/>

			<CheckoutItemsDetails
				title={
					<div className='flex items-center'>
						<Truck size={20} className='mr-2 text-gray-400' />
						Доставка:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${DELIVERY_PRICE} ₽`
					)
				}
			/>

			<Button
				loading={loading}
				type='submit'
				className='w-full h-14 rounded-2xl mt-6 text-base font-bold'
			>
				Оформить заказ
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</WhiteBlock>
	)
}
