import { Title } from '@/components/shared'
import { Button } from '@/components/ui'
import { Product } from '@prisma/client'
import { ProductSpecification } from '@prisma/client'
import React from 'react'

interface Props {
	className?: string
	product: Product & { specifications: ProductSpecification[] }
}

export const ProductDescriptions: React.FC<Props> = ({
	className,
	product,
}) => {
	const isAvailable = product.count > 0
	const formatPrice = (price: number) =>
		new Intl.NumberFormat('ru-RU').format(price)

	return (
		<div className={className}>
			<Title text={product.name} size='md' className='font-extrabold mb-2' />
			<p className='text-gray-600 mb-2 text-1xl px-3'>
				<span className='font-medium'>Бренд:</span> {product.brand} |{' '}
				<span className='font-medium'>Артикул:</span> {product.article}
			</p>

			{product.specifications.length > 0 && (
				<div className='mb-6'>
					<h3 className='font-semibold text-lg mb-3'>Характеристики</h3>
					<div className='overflow-hidden rounded-xl border border-gray-200'>
						<table className='w-[400px] text-sm'>
							<tbody>
								{product.specifications.map(spec => (
									<tr key={spec.id} className='border-b last:border-0'>
										<td className='bg-gray-50 px-4 py-2 text-gray-600 font-medium w-1/3'>
											{spec.key}
										</td>
										<td className='px-4 py-2 text-gray-800 flex justify-center'>
											{spec.value}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			<div>
				{isAvailable ? (
					<span className='inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full mb-6'>
						В наличии: {product.count} шт.
					</span>
				) : (
					<span className='inline-block bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full mb-6'>
						Нет в наличии
					</span>
				)}
			</div>

			<p
				className='text-2xl font-bold mb-2 px-3'
				style={{ color: 'var(--orange)' }}
			>
				{formatPrice(product.price)} ₽
			</p>
			<Button
				disabled={!isAvailable}
				className={`font-bold py-3 px-6 rounded-lg transition-colors duration-200 ${
					isAvailable
						? 'bg-orange-500 hover:bg-orange-400 text-white cursor-pointer'
						: 'bg-gray-300 text-gray-500'
				}`}
			>
				{isAvailable ? 'Добавить в корзину' : 'Нет в наличии'}
			</Button>
		</div>
	)
}
