export interface CategoryCard {
	id: number
	title: string
	imageSrc: string
	productCount: number
}

export const categoriesData: CategoryCard[] = [
	{
		id: 1,
		title: 'Подвеска и рулевое управление',
		imageSrc: '/tovars/forCatalog/suspension_and_steering.jpg',
		productCount: 215,
	},
	{
		id: 2,
		title: 'Двигатель и его системы',
		imageSrc: '/tovars/forCatalog/engene.jpg',
		productCount: 178,
	},
	{
		id: 3,
		title: 'Коробка передач и трансмиссия',
		imageSrc: '/tovars/forCatalog/transmission.jpg',
		productCount: 142,
	},
	{
		id: 4,
		title: 'Тормозная система',
		imageSrc: '/tovars/forCatalog/braking_system.jpg',
		productCount: 215,
	},
	{
		id: 5,
		title: 'Охлаждение и отопление',
		imageSrc: '/tovars/forCatalog/cooling_and_heating.jpg',
		productCount: 178,
	},
	{
		id: 6,
		title: 'Электроника и освещение',
		imageSrc: '/tovars/forCatalog/electronica.jpg',
		productCount: 142,
	},
	{
		id: 7,
		title: 'Запчасти для ТО',
		imageSrc: '/tovars/forCatalog/to.jpg',
		productCount: 215,
	},
	{
		id: 8,
		title: 'Кузов и составляющие',
		imageSrc: '/tovars/forCatalog/body_and_components.jpg',
		productCount: 178,
	},
	{
		id: 9,
		title: 'Автотовары и автохимия',
		imageSrc: '/tovars/forCatalog/auto_chemicals.jpg',
		productCount: 142,
	},
]
