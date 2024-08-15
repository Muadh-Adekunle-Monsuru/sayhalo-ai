'use client';
import { useStore } from '@/lib/store';
import ReactMarkdown from 'react-markdown';
import '../app/styles.css';
import { useUser } from '@clerk/nextjs';
import { Check, Copy, Sparkle, Sparkles, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { useState } from 'react';
export default function Chat() {
	const [copied, setCopied] = useState(false);
	const { chats } = useStore();
	const { user } = useUser();

	const handleCopy = (content: string) => {
		navigator.clipboard.writeText(content);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};
	return (
		<div className='h-[70rem] overflow-y-scroll w-full md:w-2/3  mx-auto custom-scrollbar backdrop-blur-3xl bg-gray-50/20 p-3'>
			{chats.map((m) => (
				<div key={m.id} className=''>
					<div className='flex gap-6 items-center font-medium'>
						{m.role === 'user' ? (
							<div className='flex gap-1 items-center'>
								<Avatar className='bg-gray-50/50'>
									<AvatarImage src={user?.imageUrl} />
									<AvatarFallback className='bg-gray-50/50'>
										<User className='size-4' />
									</AvatarFallback>
								</Avatar>
								{user ? user.fullName : 'User'}
							</div>
						) : (
							<div className='flex justify-between items-center w-full'>
								<div className='flex gap-1 items-center'>
									<div className='size-7  flex rounded-full items-center justify-center bg-gray-50/40'>
										<Sparkles className='size-4 text-orange-400 animate-pulse' />
									</div>
									<p>AI</p>
								</div>
								<div>
									{copied ? (
										<Check className='size-4' />
									) : (
										<Copy
											className='size-4 text-muted-foreground cursor-pointer hover:text-black'
											onClick={() => handleCopy(m.content)}
										/>
									)}
								</div>
							</div>
						)}
					</div>
					<ReactMarkdown className='p-4 prose rounded-lg'>
						{m.content}
					</ReactMarkdown>
					{m?.experimental_attachments
						?.filter((attachment: any) =>
							attachment?.contentType?.startsWith('image/')
						)
						.map((attachment, index) => (
							<div
								className='size-52 overflow-hidden mx-auto rounded-xl mb-4 border-2'
								key={index}
							>
								<img
									key={`${m.id}-${index}`}
									src={attachment.url}
									alt={attachment.name}
									className='object-contain w-full h-full'
								/>
							</div>
						))}
					{m.role !== 'user' && <Separator className=' bg-gray-300 my-5' />}
				</div>
			))}
		</div>
	);
}
