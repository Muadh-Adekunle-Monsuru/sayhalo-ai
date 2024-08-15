'use client';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Link, MoveUpRight, PlusCircle, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { useChat } from 'ai/react';
import { useStore } from '@/lib/store';
import NewChatButton from './NewChatButton';
import { useRef, useState } from 'react';

export default function BottomBar() {
	const { chats, setChat } = useStore();
	const [files, setFiles] = useState<FileList | undefined>(undefined);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		setMessages,
	} = useChat();

	useEffect(() => {
		setChat(messages);
	}, [messages]);

	return (
		<div className='flex w-full  items-center gap-2 justify-center py-4'>
			<form
				onSubmit={(event) => {
					handleSubmit(event, {
						experimental_attachments: files,
					});

					setFiles(undefined);

					if (fileInputRef.current) {
						fileInputRef.current.value = '';
					}
				}}
				className='p-1 rounded-3xl bg-white flex items-center justify-between w-full md:w-1/2   shadow-sm'
			>
				<div className='flex items-center gap-1 w-full'>
					<div
						className='bg-gray-100 cursor-pointer size-10 flex items-center justify-center rounded-full border'
						onClick={() => document.getElementById('fileInput')!.click()}
					>
						<Link className='size-4' />
						<input
							type='file'
							className='hidden'
							onChange={(event) => {
								if (event.target.files) {
									setFiles(event.target.files);
								}
							}}
							multiple
							ref={fileInputRef}
							id='fileInput'
						/>
					</div>
					<input
						className=' flex-grow w-full h-10 outline-none '
						placeholder='Ask anything...'
						value={input}
						onChange={handleInputChange}
						multiple
					/>
				</div>
				<Button className='rounded-3xl' type='submit' disabled={isLoading}>
					{!isLoading && (
						<>
							<span className='text-sm font-medium'>Send</span>
							<MoveUpRight className='size-3 ml-1' />
						</>
					)}
					{isLoading && (
						<Sparkles className='size-4 text-orange-400 animate-pulse' />
					)}
				</Button>
			</form>
			{chats.length > 0 && <NewChatButton onClick={setMessages} />}
		</div>
	);
}
