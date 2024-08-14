import {
	ChartBarDecreasingIcon,
	Icon,
	PlaneTakeoff,
	Ruler,
	Sparkles,
} from 'lucide-react';
import React from 'react';

function Card({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className=' aspect-square h-36 w-44 rounded-2xl shadow-lg bg-white/50 cursor-pointer flex flex-col justify-between overflow-hidden p-3'>
			{icon}
			<h1 className='font-semibold leading-none'>{title}</h1>
			<p className='text-[0.6rem] text-muted-foreground'>{description}</p>
		</div>
	);
}

export default function QuickSearch() {
	return (
		<div className='flex items-center justify-center gap-4'>
			<Card
				icon={<PlaneTakeoff className='size-9 text-purple-300' />}
				title='Best Costal Destinations this Summer'
				description='Must-Visit Places'
			/>
			<Card
				icon={<Sparkles className='size-9 text-purple-300' />}
				title='SayHalo AI: What Sets Us Apart'
				description='Key Differentiators'
			/>
			<Card
				icon={<Ruler className='size-9 text-purple-300' />}
				title='Trending Paper Origami Ideas'
				description='Art & Craft'
			/>
		</div>
	);
}
