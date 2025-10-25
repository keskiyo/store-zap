'use client'

import React from 'react'
import { FormInput, WhiteBlock } from '@/components/shared'
import { IMaskInput } from 'react-imask'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
	className?: string
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext()
	return (
		<WhiteBlock title='2. Персональные данные' className={className}>
			<div className='grid grid-cols-2 gap-5'>
				<FormInput name='firstName' className='text-base' placeholder='Имя' />
				<FormInput
					name='lastName'
					className='text-base'
					placeholder='Фамилия'
				/>
				<FormInput name='email' className='text-base' placeholder='E-Mail' />
				<Controller
					name='phone'
					control={control}
					render={({ field }) => (
						<IMaskInput
							{...field}
							className='text-base'
							placeholder='Номер телефона'
							mask='+7 (000) 000-00-00'
							definitions={{ '0': /[0-9]/ }}
							unmask={true}
							onAccept={(value: string) => field.onChange(value)}
						/>
					)}
				/>
				{/* <FormInput
					name='phone'
					className='text-base'
					placeholder='Номер телефона'
				/> */}
			</div>
		</WhiteBlock>
	)
}
