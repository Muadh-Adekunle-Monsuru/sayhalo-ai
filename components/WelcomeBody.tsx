'use client';
import { useUser } from '@clerk/nextjs';
import { SparklesIcon } from 'lucide-react';
import React from 'react';

export default function WelcomeBody() {
	const { isSignedIn, isLoaded, user } = useUser();
	return (
		<div className='flex flex-col items-center justify-center gap-1 text-center '>
			<SparklesIcon className='size-14 text-purple-900 my-3' />
			<h1 className='font-bold text-4xl text-gray-700/40'>
				{isLoaded && isSignedIn ? `Hi, ${user.fullName}` : 'Hey there!'}{' '}
			</h1>
			<h2 className='font-semibold text-2xl md:text-3xl text-pink-950'>
				What can I help you with?
			</h2>
			<p className='text-[0.8rem] py-2 w-3/4 md:max-w-[25rem]  text-muted-foreground text-center leading-snug'>
				Ready to assist you with anything you need, from answering questions to
				providing recommendations. Let&apos;s get started!
			</p>
		</div>
	);
}
