'use client'

import React from 'react'
import { AddressInput, WhiteBlock, FormTextarea } from '@/components/shared'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title='3. Доставка' className={className}>
			<div className='flex flex-col gap-5'>
				<AddressInput
					name='address'
					label='Адрес доставки'
					required={true}
					placeholder='Введите адрес доставки'
				/>

				<FormTextarea
					name='comment'
					placeholder='Комментарий к заказу'
					className='text-base'
					rows={5}
				/>
			</div>
		</WhiteBlock>
	)
}
