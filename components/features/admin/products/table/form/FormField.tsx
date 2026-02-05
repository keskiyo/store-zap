'use client'

import { RegisterOptions, useFormContext } from 'react-hook-form'

interface Props {
	name: string
	label: string
	type?: string
	placeholder?: string
	step?: string
	min?: string | number
	max?: string | number
	className?: string
	registerOptions?: RegisterOptions
}

export const FormField: React.FC<Props> = ({
	name,
	label,
	type = 'text',
	placeholder,
	registerOptions,
	step,
	min,
	max,
	className = '',
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const error = errors[name]?.message as string | undefined

	const options =
		type === 'number'
			? ({ valueAsNumber: true, ...registerOptions } as RegisterOptions)
			: registerOptions

	// Для числовых полей используем valueAsNumber
	if (type === 'number') {
		return (
			<div className={className}>
				<label className='block text-sm font-medium mb-2'>
					{label}
				</label>
				<input
					{...register(name, options)}
					type='number'
					step={step}
					min={min}
					max={max}
					placeholder={placeholder}
					className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
						error ? 'border-red-500' : 'border-gray-300'
					}`}
				/>
				{error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
			</div>
		)
	}

	// Для остальных типов полей
	return (
		<div className={className}>
			<label className='block text-sm font-medium mb-2'>{label}</label>
			<input
				{...register(name, registerOptions)}
				type={type}
				placeholder={placeholder}
				className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
					error ? 'border-red-500' : 'border-gray-300'
				}`}
			/>
			{error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
		</div>
	)
}
