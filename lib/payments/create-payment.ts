import { PaymentData } from '@/@types/yookassa'
import axios from 'axios'

interface Props {
	amount: number
	description: string
	orderId: number
	userId?: number | null
}

export async function createPayment(details: Props) {
	const metadata: Record<string, string> = {
		order_id: details.orderId.toString(),
	}
	// Добавляем user_id только если он передан
	if (details.userId) {
		metadata.user_id = details.userId.toString()
	}

	const { data } = await axios.post<PaymentData>(
		'https://api.yookassa.ru/v3/payments',
		{
			amount: {
				value: details.amount,
				currency: 'RUB',
			},
			capture: false,
			description: details.description,
			metadata: metadata,
			confirmation: {
				type: 'redirect',
				return_url: process.env.YOOKASSA_CALLBACK_URL,
			},
		},
		{
			auth: {
				username: process.env.YOOKASSA_STORE_ID as string,
				password: process.env.YOOKASSA_API_KEY as string,
			},
			headers: {
				'Content-Type': 'application/json',
				'Idempotence-Key': Math.random().toString(36).substring(7),
			},
		},
	)

	return data
}
