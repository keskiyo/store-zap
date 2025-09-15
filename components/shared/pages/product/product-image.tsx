import React from 'react'

interface Props {
	className?: string
	imageUrl?: string | null
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl }) => {
	if (!imageUrl) {
		return (
			<div className={className}>
				<div className='w-70 h-auto bg-gray-200 flex items-center justify-center'>
					<img
						src='/tovars/No img.jpg'
						alt='No img'
						className='object-cover rounded-3xl'
					/>
				</div>
			</div>
		)
	}
	return (
		<div className={className}>
			<img
				src={imageUrl}
				alt='name'
				className='relative ml-7 left-3 top-4 z-10 w-70 h-auto object-cover rounded-3x1'
			/>
		</div>
	)
}
