import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
		<div className={cn('w-full max-w-4xl mx-auto', className)}>
			<div
				className='
          flex flex-col sm:flex-row gap-4 
          w-full 
          h-auto 
          bg-gray-100 rounded-md border border-gray-300 
          p-3 sm:p-4 
          shadow-sm 
          transition-all duration-300 
          hover:shadow-2xl 
          hover:scale-[1.00] 
          hover:-translate-y-1
        '
			>
				{/* Изображение */}
				<Link
					href={`/product/${id}`}
					className='
						flex justify-center 
						w-full sm:w-32 lg:w-40 
						h-32 sm:h-auto
						flex-shrink-0
					'
				>
					<div
						className='
						w-full h-full 
						border border-gray-200 rounded-md 
						relative overflow-hidden 
						bg-gray-50
					'
					>
						<img
							src={imageUrl}
							alt={name}
							className='w-full h-full object-contain p-2'
							loading='lazy'
						/>
					</div>
				</Link>

				{/* Контент */}
				<div className='flex flex-col flex-1 min-w-0'>
					{/* Заголовок */}
					<Link href={`/product/${id}`} className='min-w-0 mb-2 sm:mb-3'>
						<h2
							className='
							font-bold 
							text-lg sm:text-xl lg:text-2xl 
							line-clamp-2 
							hover:text-orange-500 
							transition-colors
							break-words
							overflow-hidden
						'
							style={{
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 2,
							}}
						>
							{name}
						</h2>
					</Link>

					{/* Детали и цена */}
					<div className='flex flex-col lg:flex-row justify-between gap-3 flex-1'>
						{/* Детали товара */}
						<div className='space-y-1 sm:space-y-2 flex-1 min-w-0'>
							<div className='flex items-center gap-2 text-gray-400 text-xs sm:text-sm'>
								<span className='w-12 sm:w-16 flex-shrink-0'>Код:</span>
								<span className='font-semibold text-gray-600 truncate'>
									{id}
								</span>
							</div>
							<div className='flex items-center gap-2 text-gray-400 text-xs sm:text-sm'>
								<span className='w-12 sm:w-16 flex-shrink-0'>Артикул:</span>
								<span className='font-semibold text-gray-600 truncate'>
									{article}
								</span>
							</div>
							<div className='flex items-center gap-2 text-gray-400 text-xs sm:text-sm'>
								<span className='w-12 sm:w-16 flex-shrink-0'>Бренд:</span>
								<span className='font-semibold text-gray-600 truncate'>
									{brand}
								</span>
							</div>
						</div>

						{/* Цена и кнопка */}
						<div
							className='
							flex flex-col xs:flex-row sm:flex-col lg:flex-row 
							justify-between items-start xs:items-center sm:items-end lg:items-center 
							gap-2 sm:gap-3 
							mt-auto
						'
						>
							<div className='text-lg sm:text-xl lg:text-2xl font-bold text-orange-400 whitespace-nowrap'>
								{price.toLocaleString('ru-RU')} ₽
							</div>

							<button
								className='
									bg-orange-500 hover:bg-orange-400 active:bg-orange-300 
									active:translate-y-[1px] active:shadow-inner 
									text-white rounded-md 
									px-3 sm:px-4 py-1.5 sm:py-2
									text-xs sm:text-sm md:text-base 
									font-medium 
									transition-all duration-150 
									cursor-pointer 
									whitespace-nowrap
									w-full xs:w-auto sm:w-full lg:w-auto
									max-w-[120px] sm:max-w-[140px]
								'
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

// Адаптивный контейнер для списка
interface TovarListProps {
	items: Props[]
	className?: string
}

export const TovarList: React.FC<TovarListProps> = ({ items, className }) => {
	return (
		<div
			className={cn(
				'flex flex-col items-center gap-3 sm:gap-4 md:gap-6',
				className
			)}
		>
			{items.map(item => (
				<TovarItem key={item.id} {...item} />
			))}
		</div>
	)
}
