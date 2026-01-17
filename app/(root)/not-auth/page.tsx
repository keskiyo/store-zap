import { InfoBlock } from '@/components/shared'

export default function NotAuth() {
	return (
		<div className='flex flex-col items-center justify-center mt-40'>
			<InfoBlock
				title='Доступ запрещён'
				text='Для просмотра данной страницы необходимо авторизоваться'
				imageUrl='/assets/images/lock.png'
			/>
		</div>
	)
}
