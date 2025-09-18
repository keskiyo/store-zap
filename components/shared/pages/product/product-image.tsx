import React from 'react'

interface Props {
	className?: string
	imageUrl?: string | null
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl }) => {
	if (!imageUrl) {
		return (
			<div className={`flex rounded-3xl overflow-hidden ${className}`}>
				<img
					src='/tovars/No img.jpg'
					alt='No img'
					className='object-contain w-full h-auto rounded-3xl'
				/>
			</div>
		)
	}
	return (
		<div className={`flex rounded-3xl overflow-hidden ${className}`}>
			<img
				src={imageUrl}
				alt='product'
				className=' object-contain w-full h-auto rounded-3xl'
			/>
		</div>
	)
}

// 8 46 38
