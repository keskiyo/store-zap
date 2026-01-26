import { prisma } from '@/prisma/prisma-client'
import { compare, hashSync } from 'bcrypt'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email', required: true },
				password: {
					label: 'Password',
					type: 'password',
					required: true,
				},
			},
			async authorize(credentials) {
				if (!credentials) {
					return null
				}

				const findUser = await prisma.user.findFirst({
					where: {
						email: credentials.email,
					},
				})

				if (!findUser) {
					return null
				}

				const isPasswordValid = await compare(
					credentials.password,
					findUser.password,
				)

				if (!isPasswordValid) {
					return null
				}

				if (!findUser.verified) {
					return null
				}

				return {
					id: findUser.id,
					name: findUser.name,
					email: findUser.email,
					role: findUser.role,
					isBlocked: findUser.isBlocked,
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (account?.provider === 'credentials') {
					return true
				}

				if (!user?.email) {
					return false
				}

				const findUser = await prisma.user.findFirst({
					where: {
						email: user.email,
					},
				})

				if (findUser) {
					await prisma.user.update({
						where: {
							id: findUser.id,
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId,
						},
					})

					return true
				}

				await prisma.user.create({
					data: {
						email: user.email,
						name: user.name || 'User #' + user.id,
						password: hashSync(user.id.toString(), 10),
						verified: new Date(),
						provider: account?.provider,
						providerId: account?.providerAccountId,
						isBlocked: false,
					},
				})

				return true
			} catch (error) {
				console.error('Error [SIGNIN]', error)
				return false
			}
		},

		async jwt({ token }) {
			if (!token.email) {
				return token
			}

			const findUser = await prisma.user.findFirst({
				where: {
					email: token.email,
				},
			})

			if (findUser) {
				token.id = String(findUser.id)
				token.role = findUser.role
				token.name = findUser.name
				token.email = findUser.email
				token.isBlocked = findUser.isBlocked
			}

			return token
		},

		session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id
				session.user.role = token.role
				session.user.isBlocked = token.isBlocked
			}

			return session
		},
	},
}
