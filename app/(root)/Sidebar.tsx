'use client';
import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useChat } from 'ai/react';
import { Id } from '@/convex/_generated/dataModel';

export default function Sidebar() {
	const { user } = useUser();
	const { updateChat, setPrevId, prevId, chats } = useStore();
	const query = useQuery(api.data.getAllUserRecords, {
		userId: `${user?.id}` || '',
	});
	const deleteItem = useMutation(api.data.deleteRecord);

	const handleClick = (data: any, id: Id<'documents'>) => {
		updateChat(JSON.parse(data));
		setPrevId(id);
	};
	return (
		<div className='bg-gray-400/20 h-full w-full  flex flex-col gap-1'>
			<h1 className='text-lg font-semibold py-5 px-3 '>History</h1>
			{query?.map(({ _id, title, messages }) => (
				<div
					key={_id}
					className={`group cursor-pointer p-2 pl-3 w-full rounded-sm hover:bg-gray-500/20 flex justify-between relative ${prevId == _id ? 'bg-gray-500/20' : ''}`}
					onClick={() => handleClick(messages, _id)}
				>
					<p className='truncate text-sm'>{title}</p>
					<X
						className='opacity-0 group-hover:opacity-100 absolute top-2 right-2 size-5 text-muted-foreground hover:text-black'
						onClick={(e) => {
							e.stopPropagation();
							deleteItem({ id: _id });
						}}
					/>
				</div>
			))}
			{!query ||
				(query.length == 0 && (
					<p className=' italic text-xs text-center'>
						No history yet, start asking!
					</p>
				))}
		</div>
	);
}
