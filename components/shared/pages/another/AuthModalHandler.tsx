'use client'

import { AuthModal } from '@/components/shared'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function AuthModalHandler() {
	const searchParams = useSearchParams()
	const [open, setOpen] = useState(false)
	const [callbackUrl, setCallbackUrl] = useState('/')

	useEffect(() => {
		const showModal = searchParams.get('showAuthModal')
		const callback = searchParams.get('callbackUrl')
		if (showModal === 'true') {
			setOpen(true)
			setCallbackUrl(callback || '/')
		} else {
			setOpen(false)
		}
	}, [searchParams])

	const handleClose = () => {
		setOpen(false)
		const url = new URL(window.location.href)
		url.searchParams.delete('showAuthModal')
		url.searchParams.delete('callbackUrl')
		window.history.replaceState({}, '', url.toString())
	}

	return (
		<AuthModal
			open={open}
			onClose={handleClose}
			callbackUrl={callbackUrl}
		/>
	)
}
