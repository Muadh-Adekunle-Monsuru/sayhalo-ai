'use client';
import { quickSearchResponse } from '@/app/actions';
import { messages, useStore } from '@/lib/store';
import { useChat } from 'ai/react';
import { readStreamableValue } from 'ai/rsc';
import {
	ChartBarDecreasingIcon,
	Icon,
	PlaneTakeoff,
	Ruler,
	Sparkles,
} from 'lucide-react';
import React from 'react';
import { nanoid } from 'nanoid';
import { CoreMessage } from 'ai';

function Card({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	const { updateChat } = useStore();
	const handleClick = async (content: string) => {
		const newMessage: messages[] = [{ content, role: 'user', id: nanoid() }];
		updateChat(newMessage);

		const result = await quickSearchResponse(newMessage as CoreMessage[]);

		for await (const content of readStreamableValue(result)) {
			updateChat([
				...newMessage,
				{ role: 'assistant', content: content as string, id: nanoid() },
			]);
		}
	};
	return (
		<div
			className=' md:h-36 w-3/4 md:w-44 rounded-2xl shadow-lg bg-white/50 cursor-pointer flex flex-row md:flex-col items-center md:items-start gap-2 md:justify-between overflow-hidden p-3'
			onClick={() => handleClick(title)}
		>
			{icon}
			<h1 className='md:font-semibold leading-none text-sm select-none'>
				{title}
			</h1>
			<p className='text-[0.6rem] hidden md:block text-muted-foreground'>
				{description}
			</p>
		</div>
	);
}

export default function QuickSearch() {
	return (
		<div className='flex flex-col md:flex-row items-center justify-center gap-4'>
			<Card
				icon={<PlaneTakeoff className='size-9 text-purple-300' />}
				title='Briefly explain GenAi'
				description='Must-Visit Places'
			/>
			<Card
				icon={<Sparkles className='size-9 text-purple-300' />}
				title='5 facts about the Roman Empire'
				description='Key Differentiators'
			/>
			<Card
				icon={<Ruler className='size-9 text-purple-300' />}
				title='Explain the keto diet in simple terms'
				description='Art & Craft'
			/>
		</div>
	);
}
