import React from 'react'
import { cn } from '@/components/shared/lib/utils'

interface Props {
	className?: string
}

export const TovarItem: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex items-center justify-between', className)}>
			asd
		</div>
	)
}
