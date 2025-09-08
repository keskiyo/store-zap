import React from 'react'
import { cn } from '@/lib/utils'
import { TopKatalog, Filter, ProductsGroupList } from '@/components/shared'

interface Props {
	className?: string
	categoryId: number
}

export const Tovar: React.FC<Props> = ({ className, categoryId }) => {
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
							categoryId={1}
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
									id: 2,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 3,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 4,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 5,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 6,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 7,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
								{
									id: 8,
									name: 'Амортизатор крышки багажника',
									article: '1234567890',
									brand: 'Trial',
									imageUrl: '/tovars/Амортизатор крышки багажника.jpg',
									price: 1000,
								},
							]}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
