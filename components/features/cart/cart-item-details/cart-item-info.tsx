import { cn } from '@/lib/utils'

interface Props {
	name: string
	article: string
	brand: string
	className?: string
}

export const CartItemInfo: React.FC<Props> = ({
	name,
	article,
	brand,
	className,
}) => {
	return (
		<div>
			<div className={cn('flex items-center justify-between', className)}>
				<h2 className='text-lg font-bold flex-1 leading-6'>{name}</h2>
			</div>
			<p className='text-xs text-gray-500 w-[90%]'>
				{brand}, {article}
			</p>
		</div>
	)
}
