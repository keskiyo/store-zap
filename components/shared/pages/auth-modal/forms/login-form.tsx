import { TLoginSchema } from '@/components/shared/pages/auth-modal/forms/schemas'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props {
	onClose?: VoidFunction
}

export const LoginForm: React.FC<Props> = ({}) => {
	const form = useForm<TLoginSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
	})
	return <div>LoginForm</div>
}

// 20 32
