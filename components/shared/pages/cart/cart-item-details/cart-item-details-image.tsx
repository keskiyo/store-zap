import { cn } from '@/lib/utils'

interface Props {
	src: string
	className?: string
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
	return (
		<img
			className={cn('w-[70px] h-[70px] object-cover', className)}
			src={src}
		/>
	)
}
