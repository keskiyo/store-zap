'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui'
import { ClearButton } from '../another/clear-button'
import { ErrorText } from '../another/errortext'
import { RequiredSymbol } from '../another/required-symbol'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const FormInput: React.FC<Props> = ({
	className,
	name,
	label,
	required,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const onClickClear = () => {
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

				<Input
					{...register(name)}
					{...props}
					ref={e => {
						inputRef.current = e
						register(name).ref(e)
					}}
					className='w-full h-[48px] border-none bg-transparent px-3 text-[15px] focus:outline-none focus:ring-0'
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}
