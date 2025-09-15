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
	return (
		<div className={className}>
			<Title text={product.name} size='md' className='font-extrabold mb-1' />
			<p className='text-gray-600 mb-6 mt-5 text-1xl'>
				Бренд: {product.brand} | Артикул: {product.article}
			</p>

			{product.specifications.length > 0 && (
				<div className='mb-6'>
					<h3 className='font-semibold text-lg mb-3 mt-5'>Характеристики:</h3>
					<table className='w-full'>
						<tbody>
							{product.specifications.map(spec => (
								<tr key={spec.id} className='border-b'>
									<td className='py-2 font-medium text-gray-600 w-40'>
										{spec.key} :
									</td>
									<td className='py-2 text-gray-800'>{spec.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			<p className='text-1xl text-gray-600 mb-6 mt-5'>
				В наличии: {product.count} шт.
			</p>

			<p
				className='text-2xl font-bold mb-2 mt-5'
				style={{ color: 'var(--orange)' }}
			>
				{product.price} ₽
			</p>
			<Button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200'>
				Добавить в корзину
			</Button>
		</div>
	)
}
