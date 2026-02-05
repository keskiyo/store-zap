'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui'
import { ClearButton } from '@/components/features/common/clear-button'
import { ErrorText } from '@/components/features/common/errortext'
import { RequiredSymbol } from '@/components/features/common/required-symbol'
import { cn } from '@/lib/utils'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string
	name: string
	label?: string
	required?: boolean
}

export const FormTextarea: React.FC<Props> = ({
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
		setValue(name, '')
	}

	const [isFocused, setIsFocused] = React.useState(false)
	const shouldLabelFloat = isFocused || Boolean(value)

	return (
		<div className={cn('relative w-full', className)}>
			<div className='relative border border-gray-600 rounded-md bg-white transition-all duration-300 focus-within:border-orange-500'>
				{label && (
					<label
						className={cn(
							'absolute left-3 px-1 bg-white text-gray-500 font-medium transition-all duration-200 cursor-text',
							shouldLabelFloat
								? '-top-2 text-[13px] text-orange-500'
								: 'top-3 text-[15px]'
						)}
					>
						{label} {required && <span className='text-red-500'>*</span>}
					</label>
				)}
				<Textarea
					className={cn(
						'w-full border-none bg-transparent px-3 text-[15px] focus:outline-none focus:ring-0 pt-5 pb-2',
						label && 'min-h-[110px]'
					)}
					{...register(name)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					{...props}
				/>
				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}
