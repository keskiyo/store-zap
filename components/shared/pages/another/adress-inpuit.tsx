'use client'

import { ClearButton } from '@/components/shared'
import React from 'react'
import {
	AddressSuggestions,
	DaDataAddress,
	DaDataSuggestion,
} from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
	onChange?: (value?: string) => void
	value?: string
}

export const AddressInput: React.FC<Props> = ({ onChange, value }) => {
	const handleClear = () => {
		onChange?.('')
	}

	const inputValue = value
		? ({ value } as DaDataSuggestion<DaDataAddress>)
		: undefined

	return (
		<div className='relative'>
			<AddressSuggestions
				token='5fc0fb0cbe1bfcff969ca8901d391effc6210510'
				value={inputValue}
				onChange={data => onChange?.(data?.value)}
			/>
			{value && <ClearButton onClick={handleClear} />}
		</div>
	)
}

// DaData для адресов сайт
