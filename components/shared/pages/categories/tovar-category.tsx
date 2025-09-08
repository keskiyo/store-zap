import React from 'react'
import { cn } from '@/lib/utils'
import { TopKatalog, Filter, ProductsGroupList } from '@/components/shared'

interface Props {
	className?: string
	categoryId: number
}

export const TovarCategory: React.FC<Props> = async ({
	className,
	categoryId,
}) => {
	const products = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${categoryId}`,
		{ cache: 'no-store' }
	).then(res => res.json())
	return (
		<>
			<div className={cn('flex flex-col', className)}>
				<TopKatalog />
			</div>
			<div className='mt-10 pb-14'>
				<div className='flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-[80px]'>
					<div className='hidden lg:block flex-shrink-0 w-[250px]'>
						<Filter />
					</div>
					<div className='flex-1 min-w-0'>
						<ProductsGroupList categoryId={categoryId} products={products} />
					</div>
				</div>
			</div>
		</>
	)
}
