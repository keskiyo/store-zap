'use client'

import { Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Api } from '@/services/api-client'
import { Product } from '@prisma/client'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useClickAway, useDebounce } from 'react-use'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = React.useState('')
	const [focused, setFocused] = React.useState(false)
	const ref = React.useRef(null)
	const [products, setProducts] = React.useState<Product[]>([])

	useClickAway(ref, () => {
		setFocused(false)
	})

	useDebounce(
		async () => {
			try {
				const response = await Api.products.search(searchQuery)
				setProducts(response)
			} catch (error) {
				console.log(error)
			}
		},
		250,
		[searchQuery],
	)

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
		setProducts([])
	}

	return (
		<>
			{focused && (
				<div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-20' />
			)}
			<div ref={ref} className={cn('relative w-full z-40', className)}>
				<Search
					size={20}
					className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
				/>

				<Input
					className='w-full bg-gray-100 border-gray-500 pl-10 pr-4 h-10 border focus-visible:ring-2 focus-visible:ring-orange-500'
					type='text'
					placeholder='Искать на сайте ...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && focused && (
					<div className='absolute w-full bg-white rounded-lg py-2 top-full mt-1 shadow-lg border z-40'>
						{products.slice(0, 6).map(product => (
							<Link
								onClick={onClickItem}
								key={product.id}
								className='flex items-center gap-3 w-full px-3 py-2 hover:bg-orange-50 transition-colors'
								href={`/product/${product.id}`}
							>
								<img
									className='rounded-sm h-10 w-10 object-contain'
									src={product.imageUrl ?? ''}
									alt={product.name}
								/>
								<span className='text-sm'>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	)
}
