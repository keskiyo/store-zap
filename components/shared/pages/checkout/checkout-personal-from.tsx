import React from 'react'
import { FormInput, PhoneInput, WhiteBlock } from '@/components/shared'

interface Props {
	className?: string
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title='2. Персональные данные' className={className}>
			<div className='grid grid-cols-2 gap-5 sm:min-w-[680px]'>
				<FormInput
					name='firstName'
					className='text-base'
					label='Имя'
					required
				/>
				<FormInput
					name='lastName'
					className='text-base'
					label='Фамилия'
					required
				/>
				<FormInput name='email' className='text-base' label='E-Mail' required />
				<PhoneInput
					name='phone'
					className='text-base'
					label='Номер телефона'
					required
				/>
			</div>
		</WhiteBlock>
	)
}
