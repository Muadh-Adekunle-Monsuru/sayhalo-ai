'use client';
import BottomBar from '@/components/BottomBar';
import Chat from '@/components/Chat';
import Header from '@/components/Header';
import QuickSearch from '@/components/QuickSearch';
import WelcomeBody from '@/components/WelcomeBody';
import { useStore } from '@/lib/store';
import { useUser } from '@clerk/nextjs';
import { useChat } from 'ai/react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

export default function Home() {
	const { chats, showPanel, panel } = useStore();
	const { isSignedIn } = useUser();
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
			{isSignedIn && (
				<div
					className='absolute bottom-5 left-5 hidden lg:flex  text-muted-foreground hover:text-black cursor-pointer size-10 rounded-full items-center justify-center'
					onClick={showPanel}
				>
					{panel ? (
						<PanelRightOpen className='size-5 ' />
					) : (
						<PanelRightClose className='size-5' />
					)}
				</div>
			)}
		</main>
	);
}
