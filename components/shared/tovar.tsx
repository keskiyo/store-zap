import React from 'react'
import { cn } from '@/components/shared/lib/utils'
import { TopKatalog, Filter } from '@/components/shared'
import { ProductsGroupList } from '@/components/shared/products-group-list'

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
				<div className='flex gap-[80px]'>
					<div className='w-[250px]'>
						<Filter />
					</div>
					<div className='flex-1'>
						<ProductsGroupList
							title='Подвеска и рулевое управление'
							products={[
								{
									id: 1,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 1,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 1,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 1,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 1,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 1,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 1,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 1,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
							]}
							categoryId={1}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
