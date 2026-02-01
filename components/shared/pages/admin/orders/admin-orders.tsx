import React from 'react'

interface Props {
	className?: string
}

export const AdminOrders: React.FC<Props> = ({ className }) => {
	return <div className={className}></div>
}

//TODO: нужно сделать чтобы администратор видел все заказы пользователей, мог оставлять комментарии, а так же менять статус заказа
