import { Order } from '../../../../../types/admin/orders'
import { AdminCommentArea } from './AdminCommentArea'

interface Props {
	order: Order
	onCommentSave: (id: number, text: string) => void
	isUpdating: boolean
}

export const OrderDetails = ({ order, onCommentSave, isUpdating }: Props) => {
	const itemsList = Array.isArray(order.items) ? order.items : []

	return (
		<div className='p-4 border-t border-gray-200 animate-fadeIn bg-white'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Левая колонка: Товары и Инфо */}
				<div className='lg:col-span-2 space-y-6'>
					{/* Инфо о доставке */}
					<div>
						<h3 className='font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide'>
							Данные клиента
						</h3>
						<div className='text-sm bg-gray-50 p-3 rounded space-y-1'>
							<p>
								<span className='text-gray-500'>Телефон:</span>{' '}
								{order.phone}
							</p>
							<p>
								<span className='text-gray-500'>Email:</span>{' '}
								{order.email}
							</p>
							<p>
								<span className='text-gray-500'>Адрес:</span>{' '}
								{order.address}
							</p>
						</div>
					</div>

					{/* Список товаров */}
					<div>
						<h3 className='font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide'>
							Товары в заказе:
						</h3>
						<div className='border border-gray-100 rounded overflow-hidden'>
							{itemsList.length > 0 ? (
								itemsList.map((item: any, idx: number) => {
									const product = item.product

									const name =
										product?.name || 'Товар без названия'
									const price = Number(product?.price) || 0
									const imageUrl = product?.imageUrl

									const count = Number(item.count) || 0

									return (
										<div
											key={idx}
											className='flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50'
										>
											<div className='flex items-center gap-3'>
												{imageUrl && (
													<img
														src={imageUrl}
														alt={name}
														className='w-16 h-16 object-contain rounded-lg bg-white border border-gray-200 p-1'
													/>
												)}
												<span className='text-sm font-medium'>
													{name}
												</span>
											</div>
											<div className='flex items-center gap-4 text-sm'>
												<span className='text-gray-500'>
													x{count}
												</span>
												<span className='font-semibold'>
													{price * count} ₽
												</span>
											</div>
										</div>
									)
								})
							) : (
								<p className='p-4 text-sm text-gray-500 text-center'>
									Список товаров пуст
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Правая колонка: Комментарии */}
				<div className='lg:col-span-1'>
					<AdminCommentArea
						order={order}
						onSave={onCommentSave}
						isUpdating={isUpdating}
					/>
				</div>
			</div>
		</div>
	)
}
