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
				isBlocked: true,
				createdAt: true,
			},
			orderBy: { createdAt: 'desc' },
		})

		return NextResponse.json(users)
	} catch (error) {
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
		const { name, email, password, role } = body

		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Email и пароль обязательны' },
				{ status: 400 },
			)
		}

		const hashedPassword = await bcrypt.hashSync(password, 12)

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: role || 'USER',
			},
		})

		const { password: _, ...userWithoutPassword } = user

		return NextResponse.json(userWithoutPassword, { status: 201 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Ошибка создания пользователя (возможно email занят)' },
			{ status: 500 },
		)
	}
}
