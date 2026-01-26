import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
	const token = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
	})

	const isLoggedIn = !!token
	const isBlocked = token?.isBlocked
	const pathname = req.nextUrl.pathname

	const protectedRoutes = [
		'/admin',
		'/admin/:path*',
		'/profile',
		'/profile/:path*',
		'/checkorder',
		'/checkorder/:path*',
	]

	// Проверяем, является ли текущий путь защищенным
	const isProtectedRoute = protectedRoutes.some(route => {
		const pattern = route
			.replace(/:\w+/g, '[^/]+') // Заменяем :path*
			.replace(/\*/g, '.*') // Заменяем *
		const regex = new RegExp(`^${pattern}$`)
		return regex.test(pathname)
	})

	// Если маршрут не защищенный - пропускаем
	if (!isProtectedRoute) {
		return NextResponse.next()
	}

	// Если пользователь заблокирован И находится на защищенном маршруте
	if (isLoggedIn && isBlocked && pathname !== '/blocked') {
		console.log('Redirecting blocked user to /blocked')
		return NextResponse.redirect(new URL('/blocked', req.url))
	}

	// Если пользователь на /blocked, но не заблокирован
	if (pathname === '/blocked' && isLoggedIn && !isBlocked) {
		console.log('Redirecting non-blocked user from /blocked to home')
		return NextResponse.redirect(new URL('/', req.url))
	}

	// Если пользователь не авторизован и пытается зайти на защищенный маршрут
	// if (isProtectedRoute && !isLoggedIn && !pathname.startsWith('/blocked')) {
	// 	console.log('Redirecting unauthorized user to login')
	// 	return NextResponse.redirect(new URL('/', req.url))
	// }

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/admin/:path*',
		'/profile/:path*',
		'/checkorder/:path*',
		'/admin',
	],
}
