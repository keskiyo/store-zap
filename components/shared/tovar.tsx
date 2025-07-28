import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import { TopKatalog } from '@/components/shared'

interface Props {
	className?: string
}

export const Tovar: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<TopKatalog />
		</div>
	)
}
