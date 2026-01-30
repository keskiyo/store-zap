import { createUserSchema } from '@/lib/admin-user-from'
import { prisma } from '@/prisma/prisma-client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
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

		const validation = createUserSchema.safeParse(body)

		if (!validation.success) {
			// Если есть ошибки валидации, возвращаем их клиенту
			return NextResponse.json(
				{
					error: 'Ошибка валидации данных',
					issues: validation.error.issues.map(issue => ({
						field: issue.path.join('.'),
						message: issue.message,
					})),
				},
				{ status: 400 },
			)
		}

		// Данные прошли валидацию
		const { name, email, password, role } = validation.data
		const hashedPassword = bcrypt.hashSync(password, 10)

		// Создаем пользователя в БД
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: role || 'USER',
				// verified по умолчанию null в Prisma схеме
			},
		})

		const { password: _, ...userWithoutPassword } = user

		return NextResponse.json(userWithoutPassword, { status: 201 })
	} catch (error) {
		console.error('POST /api/admin/users Error:', error)

		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			return NextResponse.json(
				{ error: 'Пользователь с таким email уже существует' },
				{ status: 409 },
			)
		}

		return NextResponse.json(
			{ error: 'Ошибка создания пользователя' },
			{ status: 500 },
		)
	}
}
