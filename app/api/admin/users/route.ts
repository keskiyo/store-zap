import { prisma } from '@/prisma/prisma-client'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

// 1. ПОЛУЧИТЬ СПИСОК ПОЛЬЗОВАТЕЛЕЙ
export async function GET() {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				verified: true,
				isBlocked: true,
				createdAt: true,
				updatedAt: true,
			},
			orderBy: { id: 'asc' },
		})

		return NextResponse.json(users)
	} catch (error) {
		console.error('GET /api/admin/users Error:', error)
		return NextResponse.json(
			{ error: 'Ошибка получения пользователей' },
			{ status: 500 },
		)
	}
}

// 2. ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ
export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { name, email, password, role, verified } = body

		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Email и пароль обязательны' },
				{ status: 400 },
			)
		}

		const hashedPassword = bcrypt.hashSync(password, 10)

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: role || 'USER',
				verified: verified ? new Date() : null,
			},
		})

		return NextResponse.json(user, { status: 201 })
	} catch (error) {
		console.error('POST /api/admin/users Error:', error)
		return NextResponse.json(
			{ error: 'Ошибка создания пользователя (возможно email занят)' },
			{ status: 500 },
		)
	}
}
