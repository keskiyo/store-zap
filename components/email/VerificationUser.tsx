import React from 'react'

interface Props {
	code: string
}

export const VerificationUserTemplate = ({
	code,
}: Props): React.ReactElement => (
	<div
		style={{
			fontFamily: 'Arial, sans-serif',
			backgroundColor: '#f3f4f6',
			padding: '40px 0',
			margin: 0,
		}}
	>
		{/* Контейнер письма */}
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
					backgroundColor: '#fb923c',
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
			</div>

			{/* Тело письма */}
			<div style={{ padding: '40px 30px', color: '#333333' }}>
				<h2
					style={{
						fontSize: '20px',
						marginBottom: '20px',
						color: '#111827',
					}}
				>
					Подтверждение регистрации
				</h2>

				<p
					style={{
						fontSize: '16px',
						lineHeight: '1.5',
						marginBottom: '20px',
					}}
				>
					Здравствуйте! Благодарим вас за регистрацию на нашем сайте.
					Для активации аккаунта, пожалуйста, подтвердите свою почту.
				</p>

				{/* Кнопка */}
				<p
					style={{
						fontSize: '16px',
						lineHeight: '1.5',
						marginBottom: '20px',
						textAlign: 'center',
					}}
				>
					Нажмите на кнопку ниже:
				</p>

				<div style={{ textAlign: 'center', marginBottom: '30px' }}>
					<a
						href={`http://localhost:3000/api/auth/verify?code=${code}`}
						style={{
							display: 'inline-block',
							backgroundColor: '#fb923c',
							color: '#ffffff',
							textDecoration: 'none',
							padding: '14px 28px',
							borderRadius: '50px',
							fontWeight: 'bold',
							fontSize: '16px',
						}}
					>
						Подтвердить аккаунт
					</a>
				</div>

				{/* Подвал письма */}
				<p
					style={{
						fontSize: '12px',
						color: '#9ca3af',
						textAlign: 'center',
						marginTop: '30px',
					}}
				>
					Если вы не регистрировались на нашем сайте, просто
					проигнорируйте это письмо.
				</p>
			</div>
		</div>
	</div>
)
