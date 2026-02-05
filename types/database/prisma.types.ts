import { Category, Product, ProductSpecification } from '@prisma/client'

export type ProductWithRelations = Product & {
	category: Category | Category[]
	specifications: ProductSpecification[]
}
