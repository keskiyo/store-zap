'use client'

import { Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ClearButton } from '@/components/features/common/clear-button'
import { ErrorText } from '@/components/features/common/errortext'
import { RequiredSymbol } from '@/components/features/common/required-symbol'

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
		trigger,
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

	const { ref, ...field } = register(name)

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(false)
		field.onBlur(e)
		trigger(name)
	}

	return (
		<div className={cn('relative w-full', className)}>
			<div className='relative border border-gray-600 rounded-md bg-white transition-all duration-300 focus-within:border-orange-500'>
				{label && (
					<label
						htmlFor={name}
						onClick={handleLabelClick}
						className={cn(
							'absolute left-3 px-1 bg-white text-gray-500 font-medium transition-all duration-200 cursor-pointer',
							shouldLabelFloat
								? '-top-2 text-[13px] text-orange-500'
								: 'top-1/2 -translate-y-1/2 text-[15px]',
						)}
					>
						{label} {required && <RequiredSymbol />}
					</label>
				)}

				<Input
					{...field}
					{...props}
					ref={e => {
						ref(e)
						inputRef.current = e
					}}
					className='w-full h-[48px] border-none bg-transparent px-3 text-[15px] focus:outline-none focus:ring-0'
					onFocus={() => setIsFocused(true)}
					onBlur={handleBlur}
				/>

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}
