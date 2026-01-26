'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui'

interface Props {
	isOpen: boolean | undefined
	onClose: () => void
	onConfirm: () => void
	title: string
	description: string
	variant?: 'danger' | 'warning' | 'default'
	confirmText?: string
	cancelText?: string
}

export const ConfirmDialog = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	description,
	variant = 'default',
	confirmText = 'Подтвердить',
	cancelText = 'Отмена',
}: Props) => {
	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm()
		}
	}
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-[400px]'>
				<DialogHeader>
					<DialogTitle
						className={
							variant === 'danger'
								? 'text-red-500 border-b-red-200'
								: 'text-gray-900'
						}
					>
						{title}
					</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button onClick={onClose} variant='ghost'>
						{cancelText}
					</Button>
					<Button
						onClick={handleConfirm}
						className={
							variant === 'danger'
								? 'bg-red-600 hover:bg-red-700 text-white'
								: 'bg-orange-500 hover:bg-orange-600 text-white'
						}
					>
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
