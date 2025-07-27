import { MainPage } from '@/components/shared'
import { Categories } from '@/components/shared'

export default function Home() {
	return (
		<main className='py-8'>
			<div className='container'>
				{/* <MainPage /> */}
				<Categories />
			</div>
		</main>
	)
}
