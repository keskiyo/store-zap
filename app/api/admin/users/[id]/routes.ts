import { prisma } from '@/prisma/prisma-client'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

// GET: Получить одного пользователя (для страницы редактирования)
export async function GET(_: Request, { params }: { params: { id: string } }) {
	try {
		const user = await prisma.user.findUnique({
			where: { id: Number(params.id) },
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isBlocked: true,
			},
		})

		if (!user) {
			return NextResponse.json(
				{ error: 'Пользователь не найден' },
				{ status: 404 },
			)
		}

		return NextResponse.json(user)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Ошибка получения данных' },
			{ status: 500 },
		)
	}
}

// PUT: Редактирование пользователя
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params
		const body = await req.json()
		const { name, email, role, password } = body

		const updateData: any = {
			name,
			email,
			role,
		}

		if (password) {
			updateData.password = await bcrypt.hashSync(password, 12)
		}

		const user = await prisma.user.update({
			where: { id: Number(id) },
			data: updateData,
		})

		return NextResponse.json(user)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Ошибка обновления пользователя' },
			{ status: 500 },
		)
	}
}

// PATCH: Блокировка / Разблокировка
export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params
		const body = await req.json()
		const { isBlocked } = body

		const user = await prisma.user.update({
			where: { id: Number(id) },
			data: { isBlocked },
		})

		return NextResponse.json(user)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Ошибка смены статуса блокировки' },
			{ status: 500 },
		)
	}
}
