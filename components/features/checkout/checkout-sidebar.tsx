import { createOrder } from '@/app/actions'
import { WhiteBlock } from '@/components/features/common/white-block'
import { CheckoutItemsDetails } from '@/components/shared'
import { CheckoutFormValues } from '@/components/shared/constants/checkout-form-schema'
import { Button, Skeleton } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ArrowRight, Package, Truck } from 'lucide-react'
import React from 'react'

const DELIVERY_PRICE = 120

interface Props {
	className?: string
	sum: number
	loading?: boolean
	formData: CheckoutFormValues
}

export const CheckoutSidebar: React.FC<Props> = ({
	className,
	sum,
	loading,
	formData,
}) => {
	const totalPrice = DELIVERY_PRICE + sum

	const handleCheckout = async () => {
		try {
			const result = await createOrder(formData) // ✅ Используем formData из пропсов

			if (result?.paymentUrl && result?.newCartToken) {
				// ✅ Обновляем cookie
				document.cookie = `cartToken=${result.newCartToken}; path=/; max-age=31536000`

				// ✅ Перенаправляем на оплату
				window.location.href = result.paymentUrl
				return true
			}
			return false
		} catch (error) {
			console.error('Ошибка оформления заказа:', error)
			return false
		}
	}

	return (
		<WhiteBlock className={cn('p-6 sticky top-4', className)}>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'> Итого: </span>
				{loading ? (
					<Skeleton className='h-11 w-48' />
				) : (
					<span className='h-11 text-[34px] font-bold'>
						{' '}
						{totalPrice} ₽
					</span>
				)}
			</div>

			<CheckoutItemsDetails
				title={
					<div className='flex items-center mt-'>
						<Package size={20} className='mr-2 text-gray-400' />
						Стоимость корзины:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${sum} ₽`
					)
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
				className='w-full h-14 rounded-2xl mt-6 text-base font-bold cursor-pointer hover:border-2'
				onClick={handleCheckout}
			>
				Оформить заказ
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</WhiteBlock>
	)
}
