'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sparkles, User, WavesIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SignIn,
	SignInButton,
	useAuth,
	useClerk,
	UserButton,
} from '@clerk/nextjs';
import { useStore } from '@/lib/store';
export default function Header() {
	const { isSignedIn, isLoaded } = useAuth();
	const { setChat } = useStore();
	return (
		<nav className='w-full p-4 lg:px-10 flex items-center justify-between'>
			<div
				className='flex items-center gap-1 cursor-pointer blur-[0.3px]'
				onClick={() => setChat([])}
			>
				<Sparkles className='size-8 text-purple-900' />
				<p className='font-medium text-xl select-none'>Halo</p>
			</div>
			{isSignedIn && isLoaded ? (
				<UserButton />
			) : (
				<div className='bg-gray-50/30 rounded-full size-8 flex items-center justify-center cursor-pointer'>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<User className='size-4' />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<SignInButton
									mode='modal'
									fallbackRedirectUrl={'http://localhost:3000/'}
								/>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</nav>
	);
}
