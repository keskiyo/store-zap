'use client'

import { cn } from '@/lib/utils'
import { Button } from '../../../ui'
import { ArrowBigRight, ShoppingCart } from 'lucide-react'
import React from 'react'
import { CartDrawer } from '@/components/shared'
import { useCartStore } from '@/store/cart'

interface Props {
	className?: string
}

export const CartButton: React.FC<Props> = ({ className }) => {
	// const [sum, items, loading] = useCartStore(state => [
	// 	state.sum,
	// 	state.items,
	// 	state.loading,
	// ])
	const { sum, items, loading } = useCartStore()

	return (
		<CartDrawer>
			<Button
				loading={loading}
				className={cn(
					'group relative flex items-center bg-orange-500 text-white px-4 py-2 rounded-md cursor-pointer overflow-hidden transition-all duration-300 hover:bg-orange-600 hover:shadow-md h-10',
					{ 'w-[105px]': loading },
					className
				)}
			>
				{/* Десктопная версия */}
				<div className='hidden sm:flex items-center'>
					<span className='font-semibold'>{sum} ₽</span>
					<span className='h-4 w-[1px] bg-white/30 mx-2' />
					<div className='flex items-center gap-1 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-4'>
						<ShoppingCart size={16} strokeWidth={2} />
						<span className='font-semibold'>{items.length}</span>
					</div>
					<ArrowBigRight
						size={20}
						className='absolute right-3 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0'
					/>
				</div>

				{/* Мобильная версия - только иконка корзины */}
				<div className='sm:hidden flex items-center'>
					<ShoppingCart size={20} strokeWidth={2} />
					<span className='ml-1 font-semibold'>{items.length}</span>
				</div>
			</Button>
		</CartDrawer>
	)
}
