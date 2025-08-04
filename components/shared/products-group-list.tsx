import { Title, TovarItem } from '@/components/shared'
import { cn } from '@/components/shared/lib/utils'
import React from 'react'

interface Props {
	products: any[]
	className?: string
	listClassName?: string
	categoryId: number
	title: string
}

export const ProductsGroupList: React.FC<Props> = ({
	className,
	products,
	listClassName,
	categoryId,
	title,
}) => {
	return (
		<div className={className}>
			<Title text={title} size='lg' className='mb-5 font-bold text-center' />
			<div className={cn('flex flex-col gap-3', listClassName)}>
				{products.map((product, i) => (
					<TovarItem
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.price}
						article={product.article}
						brand={product.brand}
						imageUrl={product.imageUrl}
					/>
				))}
			</div>
		</div>
	)
}
