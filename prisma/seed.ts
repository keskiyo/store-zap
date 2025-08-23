import { Prisma } from '@prisma/client'
import { categories, products } from './constants'
import { prisma } from './prisma-client'
import { hashSync } from 'bcrypt'

async function up() {
	await prisma.user.createMany({
		data: [
			{
				name: 'Admin',
				email: 'admin@test.ru',
				password: hashSync('admin@test.ru', 10),
				role: 'ADMIN',
				verified: new Date(),
			},
			{
				name: 'User',
				email: 'user@test.ru',
				password: hashSync('user@test.ru', 10),
				role: 'USER',
				verified: new Date(),
			},
		],
	})

	await prisma.category.createMany({
		data: categories,
	})

	await prisma.product.createMany({
		data: products,
	})

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				sum: 0,
				token: '11111',
			},
			{
				userId: 2,
				sum: 0,
				token: '222222',
			},
		],
	})

	await prisma.cartProduct.create({
		data: {
			productId: 1,
			cartId: 1,
			count: 2,
		},
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "CartProduct" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
