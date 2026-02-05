'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { ClearButton } from '@/components/features/common/clear-button'
import { ErrorText } from '@/components/features/common/errortext'
import { RequiredSymbol } from '@/components/features/common/required-symbol'

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
		formState: { errors, touchedFields },
		setValue,
		watch,
		trigger,
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string
	const isTouched = touchedFields[name]

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
	const [displayValue, setDisplayValue] = React.useState('')
	const shouldLabelFloat = isFocused || Boolean(value)

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
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<IMaskInput
							{...field}
							mask='+7 (000) 000-00-00'
							lazy={false}
							unmask={true}
							value={displayValue}
							onAccept={(value, mask) => {
								const cleanValue = mask.unmaskedValue
								setDisplayValue(value)
								if (cleanValue.length <= 11) {
									field.onChange(cleanValue)

									if (cleanValue.length === 11) {
										setTimeout(() => trigger(name), 100)
									}
								}
							}}
							onFocus={e => {
								setIsFocused(true)
								// Если поле пустое, показываем маску с префиксом
								if (!displayValue) {
									e.target.value = '+7 ('
								}
							}}
							onBlur={e => {
								setIsFocused(false)
								const cleanValue = e.target.value.replace(
									/\D/g,
									'',
								)

								// При уходе с поля валидируем только если есть хотя бы одна цифра
								if (cleanValue.length > 0) {
									trigger(name)
								}

								// Если поле почти пустое после blur, очищаем его
								if (cleanValue.length <= 1) {
									setDisplayValue('')
									field.onChange('')
								}
							}}
							// Запрещаем ввод нецифр
							prepare={value => value.replace(/\D/g, '')}
							className='flex w-full h-[48px] border-none bg-transparent px-3 text-[15px] focus:outline-none focus:ring-0 rounded-lg border-2 border-gray-200 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus:border-orange-500 focus:ring-orange-100 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'
							placeholder='+7 (___) ___-__-__'
							inputRef={(el: HTMLInputElement) => {
								inputRef.current = el
								field.ref(el)
							}}
						/>
					)}
				/>

				{displayValue && displayValue.length > 0 && (
					<ClearButton
						onClick={() => {
							handleClear()
							setDisplayValue('')
						}}
					/>
				)}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}
