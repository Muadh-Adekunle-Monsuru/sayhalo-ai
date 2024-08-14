import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sparkles, User, WavesIcon } from 'lucide-react';

export default function Header() {
	return (
		<nav className='w-full p-4 lg:px-10 flex items-center justify-between'>
			<div className='flex items-center gap-1 cursor-pointer blur-[0.3px]'>
				<Sparkles className='size-8 text-purple-900' />
				<p className='font-medium text-xl select-none'>SayHalo</p>
			</div>
			<div className='bg-gray-50/30 rounded-full size-8 flex items-center justify-center cursor-pointer'>
				<User className='size-4' />
			</div>
		</nav>
	);
}
