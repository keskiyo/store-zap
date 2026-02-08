import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
export type UserRole = 'admin' | 'user'

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	const token = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
	})

	const isLoggedIn = !!token
	const isBlocked = token?.isBlocked
	const role = token?.role as UserRole | undefined

	const isAdminRoute = pathname.startsWith('/admin')
	const isProfileRoute = pathname.startsWith('/profile')
	const isCheckOrderRoute = pathname.startsWith('/checkorder')
	const isBlockedPage = pathname === '/blocked'

	// 1️⃣ Заблокированный пользователь
	if (isLoggedIn && isBlocked && !isBlockedPage) {
		return NextResponse.redirect(new URL('/blocked', req.url))
	}

	// Заблокированному нельзя уходить с /blocked
	if (isLoggedIn && !isBlocked && isBlockedPage) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	// 2️⃣ Неавторизованный пользователь
	// if (!isLoggedIn) {
	// 	if (isAdminRoute || isProfileRoute || isCheckOrderRoute) {
	// 		const url = new URL('/not-auth', req.url)
	// 		// Добавляем параметр для открытия модалки
	// 		url.searchParams.set('showAuthModal', 'true')
	// 		// Сохраняем путь, куда хотел попасть пользователь
	// 		url.searchParams.set('callbackUrl', pathname)
	// 		return NextResponse.redirect(url)
	// 	}
	// 	return NextResponse.next()
	// }

	// 3️⃣ Авторизован, но НЕ админ → нельзя /admin/*
	if (isLoggedIn && role !== 'admin' && isAdminRoute) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/admin/:path*',
		'/profile/:path*',
		'/checkorder/:path*',
		'/blocked',
	],
}
