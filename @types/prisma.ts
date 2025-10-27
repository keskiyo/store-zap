import { Category, Product } from '@prisma/client'

export type ProductWithRelations = Product & { items: Category[] }
