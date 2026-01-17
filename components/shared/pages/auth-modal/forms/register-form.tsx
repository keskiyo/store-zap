'use client'

import { registerUser } from '@/app/actions'
import { FormInput } from '@/components/shared'
import {
	formRegisterSchema,
	TRegisterSchema,
} from '@/components/shared/pages/auth-modal/forms/schemas'
import { Button } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import HCaptcha from '@hcaptcha/react-hcaptcha'

interface Props {
	onClose?: VoidFunction
	onClickLogin?: VoidFunction
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
	const captchaRef = React.useRef<HCaptcha>(null)
	const [captchaToken, setCaptchaToken] = React.useState<string>('')

	const form = useForm<TRegisterSchema>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TRegisterSchema) => {
		if (!captchaToken) {
			toast.error('Пожалуйста, пройдите проверку безопасности', {
				icon: '❌',
			})
			return
		}

		try {
			await registerUser({
				email: data.email,
				name: data.name,
				password: data.password,
				captchaToken: captchaToken,
			})

			toast.error('Регистрация успешна 📝. Подтвердите свою почту', {
				icon: '✅',
			})

			onClose?.()
		} catch (error) {
			setCaptchaToken('')
			captchaRef.current?.resetCaptcha()
			return toast.error('Неверный E-Mail или пароль', {
				icon: '❌',
			})
		}
	}

	const handleCaptchaVerify = (token: string) => {
		setCaptchaToken(token)
	}

	const handleCaptchaError = () => {
		toast.error('Ошибка проверки безопасности. Попробуйте еще раз', {
			icon: '❌',
		})
		setCaptchaToken('')
	}

	const handleCaptchaExpire = () => {
		setCaptchaToken('')
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-5 '
			>
				<FormInput name='email' label='E-Mail' required />
				<FormInput name='fullName' label='Полное имя' required />
				<FormInput name='password' label='Пароль' type='password' required />
				<FormInput
					name='confirmPassword'
					label='Повторите пароль'
					type='password'
					required
				/>

				<div className='flex justify-center'>
					{/* className= ' flex justify-center transform scale-95 transition-all duration-200 hover:scale-100 mb-4' */}
					<HCaptcha
						ref={captchaRef}
						sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
						onVerify={handleCaptchaVerify}
						onError={handleCaptchaError}
						onExpire={handleCaptchaExpire}
						theme='light' // или "dark"
						size='compact'
					/>
				</div>

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base cursor-pointer rounded-4xl bg-orange-400 text-white'
					type='submit'
				>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	)
}
