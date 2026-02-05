'use client'

import { ClearButton, ErrorText, RequiredSymbol } from '@/components/shared'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import React from 'react'
import { DaDataAddress, DaDataSuggestion } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { useFormContext } from 'react-hook-form'

const AddressSuggestions = dynamic(
	() => import('react-dadata').then(mod => mod.AddressSuggestions),
	{ ssr: false },
)

interface Props {
	name: string
	label?: string
	required?: boolean
	className?: string
	placeholder?: string
}

export const AddressInput: React.FC<Props> = ({
	className,
	name,
	label,
	required,
	placeholder,
	...props
}) => {
	const {
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const handleClear = () => {
		setValue(name, '', { shouldValidate: true })
	}

	const inputValue = value
		? ({ value } as DaDataSuggestion<DaDataAddress>)
		: undefined

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
			<div className='relative border border-gray-600 rounded-md bg-white transition-all duration-300 focus-within:border-orange-500'>
				{label && (
					<label
						htmlFor={name}
						onClick={handleLabelClick}
						className={cn(
							'absolute left-3 px-1 bg-white text-gray-500 font-medium transition-all duration-200',
							shouldLabelFloat
								? '-top-2 text-[13px] text-orange-500'
								: 'top-1/2 -translate-y-1/2 text-[15px]',
						)}
					>
						{label} {required && <RequiredSymbol />}
					</label>
				)}
				<AddressSuggestions
					token={process.env.NEXT_PUBLIC_DADATA_API_KEY || ''}
					value={inputValue}
					onChange={data =>
						setValue(name, data?.value || '', {
							shouldValidate: true,
						})
					}
					inputProps={{
						placeholder: placeholder || 'Введите адрес',
						className:
							'flex w-full h-[48px] border-none bg-transparent px-3 text-[15px] focus:outline-none focus:ring-0 rounded-lg border-2 border-gray-200 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus:border-orange-500 focus:ring-orange-100 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
						onFocus: () => setIsFocused(true),
						onBlur: () => setIsFocused(false),
						ref: inputRef,
					}}
					{...props}
				/>

				{value && value.length > 0 && (
					<ClearButton onClick={handleClear} />
				)}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}
