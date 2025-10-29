import React from 'react'
import { FormInput, PhoneInput, WhiteBlock } from '@/components/shared'

interface Props {
	className?: string
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title='2. Персональные данные' className={className}>
			<div className='grid grid-cols-2 gap-5 sm:min-w-[680px]'>
				<FormInput name='firstName' className='text-base' placeholder='Имя' />
				<FormInput
					name='lastName'
					className='text-base'
					placeholder='Фамилия'
				/>
				<FormInput name='email' className='text-base' placeholder='E-Mail' />
				<PhoneInput name='phone' className='text-base' />
			</div>
		</WhiteBlock>
	)
}
