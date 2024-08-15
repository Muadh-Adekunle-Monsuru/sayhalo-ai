'use client';
import BottomBar from '@/components/BottomBar';
import Chat from '@/components/Chat';
import Header from '@/components/Header';
import QuickSearch from '@/components/QuickSearch';
import WelcomeBody from '@/components/WelcomeBody';
import { useStore } from '@/lib/store';
import Image from 'next/image';

export default function Home() {
	const { chats } = useStore();
	return (
		<main className='flex h-screen max-h-screen flex-col justify-between backdrop-blur-3xl px-3'>
			<Header />
			{chats.length > 0 ? (
				<>
					<Chat />
				</>
			) : (
				<>
					<WelcomeBody />
					<QuickSearch />
				</>
			)}

			<BottomBar />
		</main>
	);
}
