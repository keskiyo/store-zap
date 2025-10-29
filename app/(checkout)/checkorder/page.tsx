'use client'

import {
	CheckoutAddressForm,
	CheckoutCardForm,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Title,
} from '@/components/shared'
import { Container } from '@/components/ui'
import { useSession } from 'next-auth/react'
import { useCart } from '@/hooks'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	checkoutFormSchema,
	CheckoutFormValues,
} from '@/components/shared/constants/checkout-form-schema'
import toast from 'react-hot-toast'
import { createOrder } from '@/app/actions'

export default function CheckOrder() {
	const [submitting, setSubmitting] = React.useState(false)
	const { sum, items, updateItemCount, removeCartItem, loading } = useCart()
	// const { data: session } = useSession()

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true)

			const url = await createOrder(data)

			toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
				icon: '✅',
			})

			if (url) {
				location.href = url
			}
		} catch (err) {
			console.log(err)
			setSubmitting(false)
			toast.error('Не удалось создать заказ', {
				icon: '❌',
			})
		}
	}

	const onClickCountButton = (
		id: number,
		count: number,
		type: 'plus' | 'minus'
	) => {
		const newCount = type === 'plus' ? count + 1 : count - 1
		updateItemCount(id, newCount)
	}

	return (
		<Container className='mt-10'>
			<Title
				text='Оформление заказа'
				className='font-extrabold mb-8 text-[36px]'
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						<div className='flex flex-col gap-10 flex-1 mb-20'>
							<CheckoutCardForm
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
								loading={loading}
							/>

							<CheckoutPersonalForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>

							<CheckoutAddressForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>
						</div>

						<div className='w-[450px]'>
							<CheckoutSidebar sum={sum} loading={loading || submitting} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
