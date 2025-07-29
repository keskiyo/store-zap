import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import { TopKatalog, Filter, TovarItem } from '@/components/shared'

interface Props {
	className?: string
}

export const Tovar: React.FC<Props> = ({ className }) => {
	return (
		<>
			<div className={cn('flex flex-col gap-4', className)}>
				<TopKatalog />
			</div>
			<div className='mt-10 pb-14'>
				<div className='flex gap-[60px]'>
					<div className='w-[250px]'>
						<Filter />
					</div>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<TovarItem />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
