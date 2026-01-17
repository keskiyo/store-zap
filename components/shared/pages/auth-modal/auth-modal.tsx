import { LoginForm, RegisterForm } from '@/components/shared'
import { Button, Dialog, DialogContent, DialogTitle } from '@/components/ui'
import { signIn } from 'next-auth/react'
import React from 'react'

interface Props {
	open: boolean
	onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = React.useState<'login' | 'register'>('login')

	const onSwitchType = () => {
		setType(type === 'login' ? 'register' : 'login')
	}
	const handleClose = () => {
		onClose()
	}
	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='w-[450px] bg-white p-10'>
				{/* sr-only */}
				<DialogTitle className='text-center text-xl font-bold'>
					{type === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
				</DialogTitle>

				{type === 'login' ? (
					<LoginForm onClose={handleClose} />
				) : (
					<RegisterForm onClose={handleClose} />
				)}

				<hr />
				<div className='flex gap-2'>
					<Button
						variant='secondary'
						onClick={() =>
							signIn('google', {
								callbackUrl: '/',
								redirect: true,
							})
						}
						type='button'
						className='gap-2 h-10 p-2 flex-1 bg-orange-200 rounded-4xl cursor-pointer text-orange-400 border-orange-400'
					>
						<img
							className='w-5 h-5'
							src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
						/>
						Google
					</Button>
				</div>
				<Button
					onClick={onSwitchType}
					type='button'
					className='h-12 cursor-pointer bg-orange-200 rounded-4xl text-orange-400 border-orange-400'
				>
					{type !== 'login' ? 'Войти' : 'Регистрация'}
				</Button>
			</DialogContent>
		</Dialog>
	)
}
