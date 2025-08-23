import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
	id: number
	name: string
	imageUrl: string
	className?: string
}

export const CategoryItem: React.FC<Props> = ({
	id,
	name,
	imageUrl,
	className,
}) => {
	return (
		<div className={className}>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				<Link
					href={`/category/${id}`}
					className='group block rounded-lg border border-gray-500 overflow-hidden shadow-sm hover:shadow-md transition-all'
				>
					<div className='relative h-70 bg-white-100 overflow-hidden'>
						<img
							src={imageUrl}
							alt={name}
							className='object-contain transition-transform group-hover:scale-80 scale-70'
							sizes='(max-width: 768px) 100vw, 50vw'
							style={{ right: 0, left: '2em' }}
						/>
					</div>
					<div className='p-4 border-t-2 border-gray-400'>
						<h3 className='font-medium text-lg text-gray-900'>{name}</h3>
					</div>
				</Link>
			</div>
		</div>
	)
}
