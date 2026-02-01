import { render } from '@react-email/render'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (
	to: string,
	subject: string,
	template: React.ReactNode,
) => {
	try {
		const emailHtml = await render(template)

		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to,
			subject,
			html: emailHtml,
		})
	} catch (error) {
		console.log('Error [SEND_EMAIL]', error)
		throw error
	}
}
