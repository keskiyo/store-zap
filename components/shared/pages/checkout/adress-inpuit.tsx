'use client'

import { ClearButton, ErrorText, RequiredSymbol } from '@/components/shared'
import dynamic from 'next/dynamic'
import React from 'react'
import { DaDataAddress, DaDataSuggestion } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { useFormContext } from 'react-hook-form'

const AddressSuggestions = dynamic(
	() => import('react-dadata').then(mod => mod.AddressSuggestions),
	{ ssr: false }
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
	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				<AddressSuggestions
					token='5fc0fb0cbe1bfcff969ca8901d391effc6210510'
					value={inputValue}
					onChange={data =>
						setValue(name, data?.value || '', { shouldValidate: true })
					}
					inputProps={{
						placeholder: placeholder || 'Введите адрес',
						className:
							'text-base flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					}}
					{...props}
				/>

				{value && (
					<div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
						<ClearButton onClick={handleClear} />
					</div>
				)}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}

// DaData для адресов сайт
