import { Title } from '@/components/shared'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
	className?: string
}

export const AdminDashboard: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('py-10', className)}>
			<Title
				text='Тут будет DASHBOARD'
				className='text-[#8d9191]'
				size='xl'
			/>
			<p className='text-[#8d9191]'>Тут будет DASHBOARD</p>
		</div>
	)
}
