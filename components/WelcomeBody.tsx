import { SparklesIcon } from 'lucide-react';
import React from 'react';

export default function WelcomeBody() {
	return (
		<div className='flex flex-col items-center justify-center gap-1 '>
			<SparklesIcon className='size-14 text-purple-900 my-3' />
			<h1 className='font-bold text-4xl text-gray-700/40'>Hey there! </h1>
			<h2 className='font-semibold text-3xl text-pink-950'>
				What can I help you with?
			</h2>
			<p className='text-[0.8rem] max-w-[25rem]  text-muted-foreground text-center leading-snug'>
				Ready to assist you with anything you need, from answering questions to
				providing recommendations. Let&apos;s get started!
			</p>
		</div>
	);
}
