import React from 'react'

interface Props {
	orderId: number
	totalAmount: number
	paymentUrl: string
}

export const PayOrderTemplate = ({
	orderId,
	totalAmount,
	paymentUrl,
}: Props): React.ReactElement => (
	<div
		style={{
			fontFamily: 'Arial, sans-serif',
			backgroundColor: '#f3f4f6',
			padding: '40px 0',
			margin: 0,
		}}
	>
		<div
			style={{
				maxWidth: '600px',
				margin: '0 auto',
				backgroundColor: '#ffffff',
				borderRadius: '12px',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
				overflow: 'hidden',
			}}
		>
			{/* Шапка */}
			<div
				style={{
					backgroundColor: '#111827',
					padding: '30px',
					textAlign: 'center',
				}}
			>
				<h1
					style={{
						margin: 0,
						color: '#ffffff',
						fontSize: '24px',
						fontWeight: 'bold',
					}}
				>
					Rus-Autovaz
				</h1>
				<p
					style={{
						margin: '5px 0 0',
						color: '#9ca3af',
						fontSize: '14px',
					}}
				>
					Заказ успешно оформлен
				</p>
			</div>

			{/* Тело письма */}
			<div style={{ padding: '40px 30px', color: '#333333' }}>
				<h2
					style={{
						fontSize: '20px',
						marginBottom: '10px',
						color: '#111827',
					}}
				>
					Здравствуйте!
				</h2>
				<p
					style={{
						fontSize: '16px',
						lineHeight: '1.5',
						marginBottom: '30px',
						color: '#4b5563',
					}}
				>
					Спасибо за ваш заказ. Мы уже начали его сборку. Осталось
					только оплатить.
				</p>

				{/* Карточка заказа */}
				<div
					style={{
						backgroundColor: '#f9fafb',
						border: '1px solid #e5e7eb',
						borderRadius: '8px',
						padding: '20px',
						marginBottom: '30px',
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginBottom: '10px',
							fontSize: '14px',
							color: '#6b7280',
						}}
					>
						<span>Номер заказа:</span>
						<span style={{ color: '#111827', fontWeight: 'bold' }}>
							#{orderId}
						</span>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							fontSize: '18px',
							fontWeight: 'bold',
							color: '#111827',
						}}
					>
						<span>К оплате:</span>
						<span style={{ color: '#fb923c' }}>
							{totalAmount} ₽
						</span>
					</div>
				</div>

				{/* Кнопка оплаты */}
				<div style={{ textAlign: 'center', marginBottom: '30px' }}>
					<a
						href={paymentUrl}
						style={{
							display: 'inline-block',
							backgroundColor: '#fb923c',
							color: '#ffffff',
							textDecoration: 'none',
							padding: '14px 28px',
							borderRadius: '50px',
							fontWeight: 'bold',
							fontSize: '16px',
							boxShadow: '0 4px 6px -1px rgba(251, 146, 60, 0.4)',
						}}
					>
						Оплатить заказ
					</a>
				</div>

				<p
					style={{
						fontSize: '12px',
						color: '#9ca3af',
						textAlign: 'center',
					}}
				>
					Ссылка на оплату действительна в течение 24 часов.
				</p>
			</div>
		</div>
	</div>
)
