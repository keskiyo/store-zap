import { cn } from '@/lib/utils'

interface Props {
	value: number
	className?: string
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
	return <h4 className={cn('font-bold mt-2', className)}>{value} ₽</h4>
}
