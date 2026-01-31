export const getPageNumbers = (
	currentPage: number,
	totalPages: number,
): (number | string)[] => {
	const pageNumbers: (number | string)[] = []
	const maxVisiblePages = 5

	if (totalPages <= maxVisiblePages + 2) {
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i)
		}
	} else {
		pageNumbers.push(1)

		let startPage = Math.max(2, currentPage - 1)
		let endPage = Math.min(totalPages - 1, currentPage + 1)

		if (currentPage <= 3) {
			endPage = 4
			for (let i = 2; i <= endPage; i++) {
				pageNumbers.push(i)
			}
			pageNumbers.push('...')
			pageNumbers.push(totalPages)
		} else if (currentPage >= totalPages - 2) {
			pageNumbers.push('...')
			startPage = totalPages - 3
			for (let i = startPage; i <= totalPages - 1; i++) {
				pageNumbers.push(i)
			}
			pageNumbers.push(totalPages)
		} else {
			pageNumbers.push('...')
			for (let i = startPage; i <= endPage; i++) {
				pageNumbers.push(i)
			}
			pageNumbers.push('...')
			pageNumbers.push(totalPages)
		}
	}

	return pageNumbers
}
