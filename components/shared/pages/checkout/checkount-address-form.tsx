'use client'

import React from 'react'
import {
	AddressInput,
	ErrorText,
	WhiteBlock,
	FormTextarea,
} from '@/components/shared'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control, watch } = useFormContext()
	const addressValue = watch('address')

	return (
		<WhiteBlock title='3. Доставка' className={className}>
			<div className='flex flex-col gap-5'>
				<Controller
					control={control}
					name='address'
					render={({ field, fieldState }) => (
						<>
							<AddressInput onChange={field.onChange} value={addressValue} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
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
