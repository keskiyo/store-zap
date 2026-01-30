import { updateUserSchema } from '@/lib/admin-user-from'
import { prisma } from '@/prisma/prisma-client'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

// Получить пользователя
export async function GET(
	_: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params

		const userId = Number(id)

		if (isNaN(userId)) {
			return NextResponse.json(
				{ error: 'Неверный ID пользователя' },
				{ status: 400 },
			)
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isBlocked: true,
				verified: true,
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
		console.error('GET /api/admin/users/[id] Error:', error)

		return NextResponse.json(
			{ error: 'Ошибка получения данных' },
			{ status: 500 },
		)
	}
}

// PUT: Редактирование пользователя
export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params
		const body = await req.json()
		const dto = updateUserSchema.parse(body)

		const { password, verified, ...rest } = dto

		const updateData: any = {
			...rest,
		}

		if (password) {
			updateData.password = await bcrypt.hash(password, 10)
		}

		if (typeof verified === 'boolean') {
			updateData.verified = verified ? new Date() : null
		}

		const user = await prisma.user.update({
			where: { id: Number(id) },
			data: updateData,
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isBlocked: true,
				verified: true,
			},
		})

		return NextResponse.json(user)
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message ?? 'Ошибка обновления пользователя' },
			{ status: 400 },
		)
	}
}

// DELETE: Удаление пользователя
export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params

		await prisma.user.delete({
			where: { id: Number(id) },
		})

		return NextResponse.json({ message: 'Пользователь удален' })
	} catch (error) {
		console.error('DELETE /api/admin/users/[id] Error:', error)
		return NextResponse.json(
			{ error: 'Ошибка удаления пользователя' },
			{ status: 500 },
		)
	}
}

// PATCH: Блокировка / Разблокировка
export async function PATCH(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params
		const body = await req.json()
		const { isBlocked } = body

		const user = await prisma.user.update({
			where: { id: Number(id) },
			data: { isBlocked },
		})

		return NextResponse.json(user)
	} catch (error) {
		console.error('BLOCK /api/admin/users/[id] Error:', error)
		return NextResponse.json(
			{ error: 'Ошибка смены статуса блокировки' },
			{ status: 500 },
		)
	}
}
