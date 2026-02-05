import { mkdir, unlink, writeFile } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'tovars')
const DEFAULT_IMAGE = '/tovars/Noimg.jpg'

type ProcessImageArgs = {
	file: File | null
	oldImage?: string | null
}

export async function processProductImage({
	file,
	oldImage,
}: ProcessImageArgs): Promise<string | null> {
	if (!file || file.size === 0) {
		return oldImage ?? null
	}

	if (!file.type.startsWith('image/')) {
		throw new Error('Файл должен быть изображением')
	}

	if (file.size > 5 * 1024 * 1024) {
		throw new Error('Размер изображения не должен превышать 5MB')
	}

	// Удаляем старое изображение
	if (oldImage && oldImage !== DEFAULT_IMAGE) {
		try {
			const oldPath = path.join(process.cwd(), 'public', oldImage)
			await unlink(oldPath)
		} catch (error) {
			console.warn('Не удалось удалить старый файл:', error)
		}
	}

	await mkdir(UPLOAD_DIR, { recursive: true })

	const ext = file.name.split('.').pop()
	const fileName = `${crypto.randomUUID()}.${ext}`

	const buffer = Buffer.from(await file.arrayBuffer())
	const uploadPath = path.join(UPLOAD_DIR, fileName)

	await writeFile(uploadPath, buffer)

	return `/tovars/${fileName}`
}
