import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import { TopKatalog } from '@/components/shared'
import { CartCategory } from '@/components/shared'

interface Props {
	className?: string
}

export const Categories: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<TopKatalog />
			<CartCategory />
		</div>
	)
}
