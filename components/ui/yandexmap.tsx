'use client'

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface YandexMapProps {
	className?: string
	width?: string
	height?: string
	onLoad?: () => void
}

export const YandexMap: React.FC<YandexMapProps> = ({
	className,
	width = '100%',
	height = '300px',
	onLoad,
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null)
	const isScriptLoaded = React.useRef(false)

	useEffect(() => {
		if (!containerRef.current) return

		// Очищаем контейнер перед добавлением
		containerRef.current.innerHTML = ''

		const script = document.createElement('script')
		script.src = `https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aef2c9baba31f501b4bf50b24d58ed338fef52597130896e3d330bc98444840a8&width=${width}&height=${height}&lang=ru_RU&scroll=true`
		script.async = true

		script.onload = () => {
			isScriptLoaded.current = true
			if (onLoad) {
				setTimeout(onLoad, 1000)
			}
		}

		script.onerror = () => {
			console.error('Failed to load Yandex Map script')
			if (onLoad) {
				setTimeout(onLoad, 500)
			}
		}

		containerRef.current.appendChild(script)

		return () => {
			// Очищаем при размонтировании
			if (containerRef.current) {
				containerRef.current.innerHTML = ''
			}
		}
	}, [width, height, onLoad])

	return (
		<div className={cn('flex w-full', className)}>
			<div
				id='yandex-map-container'
				ref={containerRef}
				className={cn(
					'w-full rounded-lg shadow-lg border border-gray-200',
					`h-[${height}]`
				)}
			/>
		</div>
	)
}
