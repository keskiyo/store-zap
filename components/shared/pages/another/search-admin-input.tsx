'use client'

import { Input } from '@/components/ui'
import { Search } from 'lucide-react'

interface SearchBarProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

export const SearchBar = ({
	value,
	onChange,
	placeholder = 'Поиск...',
}: SearchBarProps) => (
	<div className='relative mt-2 md:mt-0'>
		<Search
			className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
			size={18}
		/>
		<Input
			type='text'
			placeholder={placeholder}
			value={value}
			onChange={e => onChange(e.target.value)}
			className='w-full md:w-[500px] pl-10 pr-4 py-2 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
		/>
	</div>
)
