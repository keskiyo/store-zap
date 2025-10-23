import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'

interface Props {
	id: number
	name: string
	price: number
	count: number
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
	count,
	brand,
	imageUrl,
	className,
}) => {
	return (
		<div
			className={cn(
				'w-full max-w-4xl mx-auto bg-gray-100 rounded-md border border-gray-300 p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
				className
			)}
		>
			<div className='flex flex-col sm:flex-row gap-4'>
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
					<div className='flex justify-center w-full sm:w-32 lg:w-40 h-32 flex-shrink-0'>
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
					<Link href={`/product/${id}`} className='mb-3'>
						<h2 className='font-bold text-xl line-clamp-2 hover:text-orange-500 transition-colors'>
							{name}
						</h2>
					</Link>

					{/* Детали товара */}
					<div className='space-y-2 flex-1 mb-3'>
						{[
							{ label: 'Код:', value: id },
							{ label: 'Артикул:', value: article },
							{ label: 'Бренд:', value: brand },
							// { label: 'Количество:', value: count },
						].map(({ label, value }) => (
							<div
								key={label}
								className='flex items-center gap-2 text-gray-400 text-sm'
							>
								<span className='w-16 flex-shrink-0'>{label}</span>
								<span className='font-semibold text-gray-600 truncate'>
									{value}
								</span>
							</div>
						))}
					</div>

					{/* Цена и кнопка */}
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-auto'>
						<div className='text-2xl font-bold text-orange-400'>{price} ₽</div>
						<Link href={`/product/${id}`}>
							<Button className='bg-orange-500 text-white rounded-md px-4 py-2 font-medium cursor-pointer whitespace-nowrap'>
								<Plus size={20} className='mr-1' />
								Добавить
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
