import React from 'react'
import Link from 'next/link'

interface Props {
	id: number
	name: string
	price: number
	article: string
	brand: string
	imageUrl: string
	className?: string
}

export const TovarItem: React.FC<Props> = ({
	id,
	name,
	price,
	article,
	brand,
	imageUrl,
	className,
}) => {
	return (
		<div className={className}>
			<div className='flex relative gap-6 w-full max-w-[900px] bg-white rounded-md border border-gray-300 p-4 shadow-sm transition-shadow duration-300 hover:shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]'>
				<Link href={`/product/${id}`} className='flex justify-center'>
					{/* Левая часть картинка - изображение */}
					<div className='w-[200px] flex-shrink-0 border border-white rounded-md relative overflow-hidden'>
						<img
							src={imageUrl}
							alt={name}
							className='w-full h-full object-contain'
						/>
					</div>
				</Link>
				{/* Правая часть от картинки - информация */}
				<div className='flex flex-col' style={{ width: '100%' }}>
					<h2 className='font-bold text-2xl mb-3'>{name}</h2>
					<div className=' w-full flex justify-between'>
						<div>
							<div className='mb-1 flex items-center gap-2 text-gray-400 text-sm select-none'>
								<span className='w-[70px]'>Код: </span>
								<span className='font-semibold text-gray-600'>{id}</span>
							</div>
							<div className='mb-1 flex items-center gap-2 text-gray-400 text-sm select-none'>
								<span className='w-[70px]'>Артикул: </span>
								<span className='font-semibold text-gray-600'>{article}</span>
							</div>
							<div className='mb-4 flex items-center gap-2 text-gray-400 text-sm select-none'>
								<span className='w-[70px]'>Бренд: </span>
								<span className='font-semibold text-gray-600'>{brand}</span>
							</div>
						</div>
						<div className='text-right flex-col absolute bottom-7 right-7'>
							<div className='text-2xl font-bold text-orange-400 mb-2'>
								{price} ₽
							</div>
							<button
								className='bg-orange-500 hover:bg-orange-400 active:bg-orange-300 active:translate-y-[1px] active:shadow-inner text-white rounded-md px-5 py-2 text-base font-medium transition-all duration-150 flex justify-center w-full max-w-[150px] cursor-pointer'
								type='button'
							>
								В корзину
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
