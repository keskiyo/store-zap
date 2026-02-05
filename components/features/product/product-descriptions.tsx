'use client'

import { ProductWithRelations } from '@/types/database/prisma.types'
import { AddToCartButton, Title } from '@/components/shared'

interface Props {
	product: ProductWithRelations
}

export const ProductDescriptions: React.FC<Props> = ({ product }) => {
	const isAvailable = product.count > 0
	return (
		<>
			<Title
				text={product.name}
				size='md'
				className='font-extrabold mb-2'
			/>

			<p className='text-gray-600 mb-2 text-1xl px-3'>
				<span className='font-medium'>Бренд:</span> {product.brand} |{' '}
				<span className='font-medium'>Артикул:</span> {product.article}
			</p>

			{product.specifications.length > 0 && (
				<div className='mb-6'>
					<h3 className='font-semibold text-lg mb-3'>
						Характеристики
					</h3>
					<div className='w-[400px] overflow-hidden border border-gray-500'>
						<table className='w-[400px] text-sm'>
							<tbody>
								{product.specifications.map(spec => (
									<tr
										key={spec.id}
										className='border-b last:border-0'
									>
										<td className='px-4 py-2 text-gray-800 font-medium w-1/3'>
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

			<div className='mb-6'>
				<span
					className={`inline-block text-sm px-3 py-1 rounded-full ${
						isAvailable
							? 'bg-green-100 text-green-700'
							: 'bg-red-100 text-red-600'
					}`}
				>
					{isAvailable
						? `В наличии: ${product.count} шт.`
						: 'Нет в наличии'}
				</span>
			</div>

			<p
				className='text-2xl font-bold mb-2 px-3'
				style={{ color: 'var(--orange)' }}
			>
				{new Intl.NumberFormat('ru-RU').format(product.price)} ₽
			</p>

			<AddToCartButton
				productId={product.id}
				productName={product.name}
				count={product.count}
				className='py-3 px-6'
			/>
		</>
	)
}
