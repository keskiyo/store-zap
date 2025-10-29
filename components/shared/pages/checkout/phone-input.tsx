'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { ErrorText } from '../another/errortext'
import { ClearButton } from '../another/clear-button'
import { RequiredSymbol } from '../another/required-symbol'

interface Props {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const PhoneInput: React.FC<Props> = ({
	name,
	label,
	required,
	className,
}) => {
	const {
		control,
		formState: { errors },
		setValue,
		watch,
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const handleClear = () => {
		setValue(name, '', { shouldValidate: true })
	}

	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<IMaskInput
							{...field}
							mask='+7 (000) 000-00-00'
							lazy={false}
							unmask={true}
							onAccept={(value: string) => field.onChange(value)}
							className='text-base flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
							placeholder='+7 (___) ___-__-__'
						/>
					)}
				/>

				{value && value.length > 0 && <ClearButton onClick={handleClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}
