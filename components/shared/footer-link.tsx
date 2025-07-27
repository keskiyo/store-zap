import React from 'react'
import { cn } from '@/components/shared/lib/utils'

interface Props {
	href: string
	children: React.ReactNode
	className?: string
}

export const FooterLink: React.FC<Props> = ({ href, children, className }) => {
	return (
		<a
			href={href}
			className={cn(
				'hover:underline hover:decoration-orange-500 hover:text-[#ff9100]',
				'transition-colors duration-200',
				className
			)}
		>
			{children}
		</a>
	)
}
