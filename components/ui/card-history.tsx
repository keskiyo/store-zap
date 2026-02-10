import { cn } from '@/lib/utils'
import * as React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				'rounded-2xl border border-gray-200 bg-white shadow-sm transition-all',
				className,
			)}
			{...props}
		/>
	),
)
Card.displayName = 'Card'

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('p-4', className)} {...props} />
	),
)
CardContent.displayName = 'CardContent'
