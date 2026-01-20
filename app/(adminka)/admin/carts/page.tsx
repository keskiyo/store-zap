'use client'

import { useState } from 'react'

type CartItem = {
	id: number
	count: number
	product: { name: string; price: number; imageUrl?: string }
}

type CartData = {
	id: number
	sum: number
	token: string
	user?: { name: string; email: string }
	items: CartItem[]
	// Поле которого нет в схеме, но которое нужно по ТЗ
	adminNotes?: string
}

export default function CartsPage() {
	// MOCK DATA
	const [carts, setCarts] = useState<CartData[]>([
		{
			id: 1,
			sum: 1450,
			token: 'abc-123',
			user: { name: 'Иван', email: 'ivan@mail.ru' },
			items: [
				{
					id: 101,
					count: 1,
					product: {
						name: 'Масляный фильтр',
						price: 450,
						imageUrl: '/forSite/logoauto.jpg',
					},
				},
				{
					id: 102,
					count: 2,
					product: { name: 'Свеча зажигания', price: 500 },
				},
			],
			adminNotes: 'Клиент звонил, спрашивал про доставку',
		},
		{
			id: 2,
			sum: 200,
			token: 'xyz-999',
			user: undefined, // Анонимная корзина
			items: [
				{
					id: 103,
					count: 1,
					product: { name: 'Щетки стеклоочистителя', price: 200 },
				},
			],
			adminNotes: '',
		},
	])

	const [expandedCartId, setExpandedCartId] = useState<number | null>(null)

	const toggleExpand = (id: number) => {
		setExpandedCartId(expandedCartId === id ? null : id)
	}

	const handleNoteSave = (cartId: number, note: string) => {
		// TODO: API Call to update Cart notes
		const updatedCarts = carts.map(c =>
			c.id === cartId ? { ...c, adminNotes: note } : c,
		)
		setCarts(updatedCarts)
		alert('Заметка сохранена')
	}

	return (
		<div className='bg-white p-6 rounded-lg shadow'>
			<h1 className='text-2xl font-bold mb-6'>Корзины пользователей</h1>

			<div className='space-y-4'>
				{carts.map(cart => (
					<div
						key={cart.id}
						className='border border-gray-200 rounded-lg overflow-hidden'
					>
						{/* Заголовок карточки корзины */}
						<div
							className='bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition'
							onClick={() => toggleExpand(cart.id)}
						>
							<div className='flex flex-col'>
								<span className='font-bold text-lg'>
									{cart.user
										? cart.user.name
										: 'Анонимный пользователь'}
									<span className='text-sm font-normal text-gray-500 ml-2'>
										(
										{cart.user
											? cart.user.email
											: cart.token}
										)
									</span>
								</span>
								<span className='text-sm text-gray-600'>
									Сумма корзины: <b>{cart.sum} ₽</b>
								</span>
							</div>
							<div className='flex items-center gap-4'>
								{cart.adminNotes && (
									<span className='hidden md:block text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded'>
										Есть заметка
									</span>
								)}
								<span className='text-gray-400 text-2xl'>
									{expandedCartId === cart.id ? '−' : '+'}
								</span>
							</div>
						</div>

						{/* Раскрытый контент (Товары + Заметки) */}
						{expandedCartId === cart.id && (
							<div className='p-4 border-t border-gray-200 animate-fadeIn'>
								{/* Список товаров */}
								<div className='mb-6'>
									<h3 className='font-bold text-gray-700 mb-3'>
										Товары в корзине:
									</h3>
									<div className='bg-gray-50 rounded p-3'>
										{cart.items.map(item => (
											<div
												key={item.id}
												className='flex justify-between items-center py-2 border-b border-gray-100 last:border-0'
											>
												<div className='flex items-center gap-3'>
													{item.product.imageUrl && (
														<img
															src={
																item.product
																	.imageUrl
															}
															className='w-10 h-10 object-cover rounded'
														/>
													)}
													<span>
														{item.product.name}
													</span>
												</div>
												<div className='flex items-center gap-4'>
													<span className='text-gray-500'>
														x{item.count}
													</span>
													<span className='font-semibold'>
														{item.product.price *
															item.count}{' '}
														₽
													</span>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Блок заметок для админов */}
								<div className='bg-yellow-50 p-4 rounded border border-yellow-100'>
									<label className='block font-bold text-sm text-yellow-800 mb-2'>
										Заметка для администраторов:
									</label>
									<textarea
										className='w-full p-2 border border-yellow-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400'
										rows={3}
										defaultValue={cart.adminNotes}
										onBlur={e =>
											handleNoteSave(
												cart.id,
												e.target.value,
											)
										}
										placeholder='Оставьте информацию о клиенте здесь...'
									/>
									<p className='text-xs text-yellow-600 mt-1'>
										* Сохраняется автоматически при потере
										фокуса (нажмите Tab или кликните в
										другое место)
									</p>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
