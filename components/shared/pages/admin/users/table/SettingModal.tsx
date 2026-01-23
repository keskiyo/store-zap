import { Button } from '@/components/ui'
import { X } from 'lucide-react'
import { ColumnDef, ColumnKey } from './types'

interface Props {
	isOpen: boolean
	columns: ColumnDef[]
	onClose: () => void
	onToggle: (key: ColumnKey) => void
}

export const SettingsModal = ({
	isOpen,
	columns,
	onClose,
	onToggle,
}: Props) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
			<div className='bg-white p-6 rounded-lg w-full max-w-sm'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-bold'>Видимость колонок</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-800'
					>
						<X size={24} />
					</button>
				</div>

				<div className='space-y-3 max-h-[60vh] overflow-y-auto'>
					{columns.map(col => (
						<label
							key={col.key}
							className='flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded'
						>
							<input
								type='checkbox'
								checked={col.isVisible}
								onChange={() => onToggle(col.key)}
								className='w-5 h-5 accent-orange-500 rounded focus:ring-orange-500'
							/>
							<span className='text-gray-700'>{col.label}</span>
						</label>
					))}
				</div>

				<div className='flex justify-end gap-2 mt-6'>
					<Button
						onClick={onClose}
						className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
					>
						Закрыть
					</Button>
				</div>
			</div>
		</div>
	)
}
