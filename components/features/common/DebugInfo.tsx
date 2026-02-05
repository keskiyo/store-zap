'use client'

import { useBrands, useCategoryId } from '@/hooks/index'

export const DebugInfo = () => {
	const categoryId = useCategoryId()
	const { brands, loading, error } = useBrands(categoryId)

	return (
		<div style={{ border: '1px solid red', padding: '10px', margin: '10px' }}>
			<h3>Debug Information:</h3>
			<p>Category ID: {categoryId || 'NOT FOUND'}</p>
			<p>Loading: {loading ? 'YES' : 'NO'}</p>
			<p>Error: {error || 'NO ERROR'}</p>
			<p>Brands count: {brands.length}</p>
			<ul>
				{brands.map(brand => (
					<li key={brand.id}>{brand.name}</li>
				))}
			</ul>
		</div>
	)
}
