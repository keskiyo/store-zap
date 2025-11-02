'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { ErrorText } from '../another/errortext'
import { ClearButton } from '../another/clear-button'
import { RequiredSymbol } from '../another/required-symbol'
import { cn } from '@/lib/utils'

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

	const inputRef = React.useRef<HTMLInputElement>(null)
	const handleLabelClick = () => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	const [isFocused, setIsFocused] = React.useState(false)
	const shouldLabelFloat = isFocused || Boolean(value)

	return (
		<div className={cn('relative w-full', className)}>
			<div className='relative border border-gray-300 rounded-md bg-white transition-all duration-300 focus-within:border-orange-500'>
				{label && (
					<label
						htmlFor={name}
						onClick={handleLabelClick}
						className={cn(
							'absolute left-3 px-1 bg-white text-gray-500 font-medium transition-all duration-200',
							shouldLabelFloat
								? '-top-2 text-[13px] text-orange-500'
								: 'top-1/2 -translate-y-1/2 text-[15px]'
						)}
					>
						{label} {required && <RequiredSymbol />}
					</label>
				)}
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<IMaskInput
							{...field}
							mask='+7 (000) 000-00-00'
							lazy={true}
							unmask={false}
							className='flex w-full h-[48px] border-none bg-transparent px-3 text-[15px] focus:outline-none focus:ring-0 rounded-lg border-2 border-gray-200 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus:border-orange-500 focus:ring-orange-100 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'
							label='Номер телефона'
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							inputRef={(el: HTMLInputElement) => {
								inputRef.current = el
							}}
						/>
					)}
				/>

				{value && value.length > 0 && <ClearButton onClick={handleClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}
