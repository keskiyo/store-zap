'use client'

import React from 'react'
import { Api } from '@/components/shared/services/api-client'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui'
import { useDebounce } from 'react-use'
import { Product } from '@prisma/client'
import Link from 'next/link'

interface Props {
	className?: string
}

export const SearchInputNav: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = React.useState('')
	const ref = React.useRef(null)
	const [products, setProducts] = React.useState<Product[]>([])

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
		setSearchQuery('')
		setProducts([])
	}

	return (
		<>
			<div
				ref={ref}
				className={cn(
					'flex items-center justify-between gap-6 h-11 z-30',
					className
				)}
			>
				<Search
					size={20}
					className='h-5 top-12 left-115.5 absolute translate-y-[-50%] text-gray-400'
				/>
				<Input
					className='w-170 font-style: italic bg-gray-100 outline-none pl-11'
					type='text'
					placeholder='Искать на сайте ...'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30'
						)}
					>
						{products.map(product => (
							<Link
								onClick={onClickItem}
								key={product.id}
								className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
								href={`/product/${product.id}`}
							>
								<img
									className='rounded-sm h-8 w-8'
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
