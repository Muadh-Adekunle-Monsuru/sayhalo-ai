import BottomBar from '@/components/BottomBar';
import Header from '@/components/Header';
import QuickSearch from '@/components/QuickSearch';
import WelcomeBody from '@/components/WelcomeBody';
import Image from 'next/image';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col justify-between backdrop-blur-3xl'>
			<Header />
			<WelcomeBody />
			<QuickSearch />
			<BottomBar />
		</main>
	);
}
