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
		skipDuplicates: true,
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
	// Безопасное удаление данных с проверкой существования таблиц
	try {
		await prisma.cartProduct.deleteMany()
		console.log('CartProduct data deleted')
	} catch (error) {
		console.log('CartProduct table does not exist yet')
	}

	try {
		await prisma.cart.deleteMany()
		console.log('Cart data deleted')
	} catch (error) {
		console.log('Cart table does not exist yet')
	}

	try {
		await prisma.product.deleteMany()
		console.log('Product data deleted')
	} catch (error) {
		console.log('Product table does not exist yet')
	}

	try {
		await prisma.category.deleteMany()
		console.log('Category data deleted')
	} catch (error) {
		console.log('Category table does not exist yet')
	}

	try {
		await prisma.user.deleteMany()
		console.log('User data deleted')
	} catch (error) {
		console.log('User table does not exist yet')
	}
}

async function main() {
	try {
		console.log('Starting seed...')

		const userCount = await prisma.user.count()

		if (userCount > 0) {
			console.log('Database already has data. Running down() first...')
			await down()
		}

		await up()
		console.log('Seed completed successfully!')
	} catch (error) {
		console.error('Error during seeding:', error)
		throw error
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
