'use client'

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface YandexMapProps {
	className?: string
	width?: string
	height?: string
}

export const YandexMap: React.FC<YandexMapProps> = ({
	className,
	width = '100%',
	height = '300px',
}) => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src = `https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aef2c9baba31f501b4bf50b24d58ed338fef52597130896e3d330bc98444840a8&width=${width}&height=${height}&lang=ru_RU&scroll=true`
		script.async = true

		const container = document.getElementById('yandex-map-container')
		if (container) {
			container.appendChild(script)
		}

		return () => {
			if (container && script.parentNode === container) {
				container.removeChild(script)
			}
		}
	}, [width, height])

	return (
		<div className={cn('flex w-full', className)}>
			<div
				id='yandex-map-container'
				className={cn(
					'w-full h-[400px] rounded-lg shadow-lg border border-gray-200',
					`h-[${height}]`
				)}
			/>
		</div>
	)
}
