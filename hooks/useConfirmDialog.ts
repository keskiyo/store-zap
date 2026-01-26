'use client'

import { useState } from 'react'

interface ConfirmDialogState {
	isOpen: boolean
	title: string
	description: string
	variant: 'danger' | 'warning' | 'default'
	onConfirm: () => Promise<void>
}

export const useConfirmDialog = () => {
	const [confirmDialog, setConfirmDialog] =
		useState<ConfirmDialogState | null>(null)

	const showDialog = (config: Omit<ConfirmDialogState, 'isOpen'>) => {
		setConfirmDialog({ ...config, isOpen: true })
	}

	const hideDialog = () => {
		setConfirmDialog(null)
	}

	return {
		confirmDialog,
		showDialog,
		hideDialog,
	}
}
