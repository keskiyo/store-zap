'use client'

import React from 'react'
import { Api } from '@/services/api-client'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui'
import { useClickAway, useDebounce } from 'react-use'
import { Product } from '@prisma/client'
import Link from 'next/link'

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
		[searchQuery]
	)

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
		setProducts([])
	}

	return (
		<>
			{focused && (
				<div className='fixed top-0 left-0 bottom-0 right-0 bg-black/59 z-30' />
			)}
			<div
				ref={ref}
				className={cn(
					'flex items-center justify-between gap-6 h-11 z-30 relative',
					className
				)}
			>
				<Search
					size={20}
					className='h-5 top-5.5 left-3 absolute translate-y-[-50%] text-gray-400'
				/>
				<Input
					className='w-255 font-style: italic bg-gray-100 outline-none pl-11'
					type='text'
					placeholder='Искать на сайте ...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-255 bg-white rounded-xl py-2 top-full shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focused && 'visible opacity-100'
						)}
					>
						{products.slice(0, 6).map(product => (
							<Link
								onClick={onClickItem}
								key={product.id}
								className='flex items-center gap-3 w-255 px-3 py-2 hover:bg-orange-100'
								href={`/product/${product.id}`}
							>
								<img
									className='rounded-sm h-10 w-10 object-contain'
									src={product.imageUrl ?? ''}
									alt={product.name}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	)
}
