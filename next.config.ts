import type { IncomingMessage, ServerResponse } from 'http'
import { getToken } from 'next-auth/jwt'

// Определяем свой тип конфигурации
interface MyNextConfig {
	experimental?: {
		proxy?: (
			req: IncomingMessage,
			res: ServerResponse,
		) => Promise<null | {
			target: string
			changeOrigin?: boolean
			pathRewrite?: Record<string, string>
		}>
	}
	reactStrictMode?: boolean
	swcMinify?: boolean
	images?: {
		domains?: string[]
	}
}

const nextConfig: MyNextConfig = {
	experimental: {
		proxy: async (req: IncomingMessage, res: ServerResponse) => {
			const url = req.url || ''
			const pathname = new URL(url, 'http://localhost:3000').pathname

			const protectedRoutes = ['/admin', '/profile', '/checkorder']
			const isProtectedRoute = protectedRoutes.some(route =>
				pathname.startsWith(route),
			)

			if (!isProtectedRoute) {
				return null
			}

			try {
				// Получаем токен из cookies
				// Для совместимости с IncomingMessage преобразуем req
				const token = await getToken({
					req: req as any,
					secret: process.env.NEXTAUTH_SECRET!,
				})

				const isLoggedIn = !!token
				const isBlocked = token?.isBlocked

				// Если пользователь заблокирован И находится на защищенном маршруте
				if (isLoggedIn && isBlocked && pathname !== '/blocked') {
					console.log('Redirecting blocked user to /blocked')
					res.writeHead(307, { Location: '/blocked' })
					res.end()
					return null
				}

				// Если пользователь на /blocked, но не заблокирован
				if (pathname === '/blocked' && isLoggedIn && !isBlocked) {
					console.log(
						'Redirecting non-blocked user from /blocked to home',
					)
					res.writeHead(307, { Location: '/' })
					res.end()
					return null
				}

				return null
			} catch (error) {
				console.error('Proxy middleware error:', error)
				return null
			}
		},
	},
	reactStrictMode: true,
	swcMinify: true,
}

export default nextConfig
