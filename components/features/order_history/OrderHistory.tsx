import React from 'react'

interface Props {
	className?: string
}

export const OrderHistory: React.FC<Props> = ({ className }) => {
	return <div className={className}> история заказов</div>
}
