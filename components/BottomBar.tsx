'use client';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Link, MoveUpRight, PlusCircle, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { useChat } from 'ai/react';
import { useStore } from '@/lib/store';
import NewChatButton from './NewChatButton';
import { useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { Id } from '@/convex/_generated/dataModel';
import { generateTitle } from '@/app/actions';

export default function BottomBar() {
	const { user } = useUser();
	const { chats, updateChat, prevId, setPrevId } = useStore();
	const [done, setDone] = useState(false);
	const [docTitle, setDocTitle] = useState('');
	const [files, setFiles] = useState<FileList | undefined>(undefined);
	const mutation = useMutation(api.data.createRecord);
	const updateData = useMutation(api.data.updateRecord);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		setMessages,
	} = useChat({
		async onFinish(message, options) {
			setDone((prev) => !prev);
		},
		initialMessages: chats,
	});

	const isMounted = useRef(false);
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}
		updateChat(messages);
		console.log('messages', messages);
		console.log('chats', chats);
	}, [messages]);

	useEffect(() => {
		const change = async () => {
			if (chats.length < 0 || !user?.id || !docTitle) return;

			if (prevId) {
				updateData({ id: prevId, messages: JSON.stringify(chats) });
				return;
			}
			const response = await mutation({
				messages: JSON.stringify(chats),
				title: docTitle,
				userId: user?.id!,
			});

			setPrevId(response);
		};
		change();
	}, [done]);

	const handleReset = () => {
		setPrevId(undefined);
		updateChat([]);
	};
	return (
		<div className='flex w-full  items-center gap-2 justify-center py-4'>
			<form
				onSubmit={async (event) => {
					handleSubmit(event, {
						experimental_attachments: files,
					});

					const title = await generateTitle(input);
					setDocTitle(title);

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
			{chats.length > 0 && <NewChatButton onClick={handleReset} />}
		</div>
	);
}
