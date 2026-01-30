'use client'

import { Upload, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
	initialImage: string | null
	onImageChange: (file: File | null) => void
	disabled?: boolean
}

export const ImageUploader: React.FC<Props> = ({
	initialImage,
	onImageChange,
	disabled,
}) => {
	const [preview, setPreview] = useState<string | null>(initialImage)
	const [isDragging, setIsDragging] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const dropZoneRef = useRef<HTMLDivElement>(null)

	// Синхронизация превью при смене initialImage извне
	useEffect(() => {
		setPreview(initialImage)
	}, [initialImage])

	const processFile = useCallback(
		(file: File) => {
			if (!file.type.startsWith('image/')) {
				toast.error('Допустимы только изображения')
				return
			}
			if (file.size > 5 * 1024 * 1024) {
				toast.error('Размер не должен превышать 5MB')
				return
			}

			setPreview(URL.createObjectURL(file))
			onImageChange(file)
		},
		[onImageChange],
	)

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(true)
	}

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		const related = e.relatedTarget as HTMLElement
		if (dropZoneRef.current && !dropZoneRef.current.contains(related)) {
			setIsDragging(false)
		}
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(false)
		const file = e.dataTransfer.files[0]
		if (file) processFile(file)
	}

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) processFile(file)
	}

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation()
		setPreview(null)
		onImageChange(null)
		if (fileInputRef.current) fileInputRef.current.value = ''
	}

	const handleClick = () => {
		if (!disabled && fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	return (
		<div>
			<label className='block text-sm font-medium mb-2'>
				Изображение товара
			</label>

			<div
				ref={dropZoneRef}
				onClick={handleClick}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className={`
                    border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center 
                    min-h-[200px] relative overflow-hidden cursor-pointer transition-all duration-200
                    ${
						isDragging
							? 'border-orange-500 bg-orange-50 border-solid scale-[1.02]'
							: 'border-gray-300 bg-gray-50 hover:bg-gray-100'
					}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
			>
				<input
					ref={fileInputRef}
					id='file-upload'
					type='file'
					accept='image/*'
					onChange={handleFileInput}
					className='hidden'
					disabled={disabled}
				/>

				{preview ? (
					<div
						className='relative w-full flex items-center justify-center group'
						onClick={e => e.stopPropagation()}
					>
						<img
							src={preview}
							alt='Preview'
							className='max-h-48 rounded-lg object-contain shadow-sm'
						/>
						<button
							onClick={handleRemove}
							className='absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'
							type='button'
							disabled={disabled}
						>
							<X size={18} />
						</button>
					</div>
				) : (
					<div className='text-center space-y-4 pointer-events-none'>
						<Upload
							className={`mx-auto h-16 w-16 transition-colors ${
								isDragging ? 'text-orange-500' : 'text-gray-400'
							}`}
						/>
						<div className='space-y-2 pointer-events-auto'>
							<p className='text-sm font-medium text-gray-600'>
								{isDragging
									? 'Отпустите файл'
									: 'Перетащите изображение сюда'}
							</p>
							<p className='text-xs text-gray-500'>
								или нажмите для выбора
							</p>
						</div>
					</div>
				)}
			</div>

			<div className='space-y-1 mt-2'>
				<p className='text-xs text-gray-500'>
					Максимальный размер: 5MB. Форматы: JPG, PNG, WebP
				</p>
			</div>
		</div>
	)
}
