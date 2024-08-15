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
		<div className=' md:h-36 w-3/4 md:w-44 rounded-2xl shadow-lg bg-white/50 cursor-pointer flex flex-row md:flex-col items-center md:items-start gap-2 md:justify-between overflow-hidden p-3'>
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
