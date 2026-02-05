'use client'

import { Button } from '@/components/ui'
import { Plus, Trash2 } from 'lucide-react'

interface Spec {
	id?: number
	key: string
	value: string
}

interface Props {
	value: Spec[]
	onChange: (specs: Spec[]) => void
	emptyStateText?: string
	showBackground?: boolean
}

export const Specifications: React.FC<Props> = ({
	value,
	onChange,
	emptyStateText = 'Нет характеристик',
	showBackground = true,
}) => {
	const addSpec = () => onChange([...value, { key: '', value: '' }])

	const removeSpec = (index: number) => {
		onChange(value.filter((_, i) => i !== index))
	}

	const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
		const newSpecs = [...value]
		newSpecs[index][field] = val
		onChange(newSpecs)
	}

	return (
		<div className='pt-4 border-t border-gray-100'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold'>Характеристики</h3>
				<Button
					type='button'
					variant='outline'
					size='sm'
					onClick={addSpec}
					className='text-orange-500 border-orange-500 hover:bg-orange-50'
				>
					<Plus size={16} className='mr-1' /> Добавить
				</Button>
			</div>

			{value.length === 0 ? (
				<p className='text-sm text-gray-500 py-4 text-center border border-dashed border-gray-300 rounded-lg'>
					{emptyStateText}
				</p>
			) : (
				<div className='space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar'>
					{value.map((spec, index) => (
						<div
							key={index}
							className={`flex gap-2 items-start ${
								showBackground
									? 'bg-gray-50 p-2 rounded border border-gray-100'
									: ''
							}`}
						>
							<div className='flex-1 space-y-2'>
								<input
									type='text'
									value={spec.key}
									onChange={e =>
										updateSpec(index, 'key', e.target.value)
									}
									className='w-full border p-3 rounded-lg focus:border-orange-500 outline-none text-sm'
									placeholder='Название (напр. Цвет)'
								/>
								<input
									type='text'
									value={spec.value}
									onChange={e =>
										updateSpec(
											index,
											'value',
											e.target.value,
										)
									}
									className='w-full border p-3 rounded-lg focus:border-orange-500 outline-none text-sm'
									placeholder='Значение'
								/>
							</div>
							<button
								type='button'
								onClick={() => removeSpec(index)}
								className={`p-2 text-red-500 hover:bg-red-50 rounded transition-colors ${
									showBackground ? 'mt-1' : 'mt-0'
								}`}
							>
								<Trash2 size={18} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
