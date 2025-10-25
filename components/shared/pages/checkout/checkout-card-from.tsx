import React from 'react'
import {
	CheckoutItem,
	CheckoutItemSkeleton,
	WhiteBlock,
} from '@/components/shared'
import { CartStateItem } from '@/lib/get-cart-details'

interface Props {
	className?: string
	items: CartStateItem[]
	onClickCountButton: (
		id: number,
		count: number,
		type: 'plus' | 'minus'
	) => void
	removeCartItem: (id: number) => void
	loading?: boolean
}

export const CheckoutCardForm: React.FC<Props> = ({
	className,
	onClickCountButton,
	removeCartItem,
	items,
	loading,
}) => {
	return (
		<WhiteBlock title='1. Корзина' className={className}>
			<div className='flex flex-col gap-5'>
				{loading
					? [...Array(4)].map((_, index) => (
							<CheckoutItemSkeleton key={index} />
					  ))
					: items.map(item => (
							<CheckoutItem
								key={item.id}
								id={item.id}
								name={item.name}
								article={item.article}
								brand={item.brand}
								price={item.price}
								imageUrl={item.imageUrl}
								count={item.count}
								disabled={item.disabled}
								onClickCountButton={type =>
									onClickCountButton(item.id, item.count, type)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
					  ))}
			</div>
		</WhiteBlock>
	)
}
