import { PlusCircle } from 'lucide-react';
import React from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Message } from 'ai';

export default function NewChatButton({
	onClick,
}: {
	onClick: (messages: Message[] | ((messages: Message[]) => Message[])) => void;
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div
						className='size-10 flex items-center justify-center rounded-full cursor-pointer bg-black hover:bg-black/80'
						onClick={() => onClick([])}
					>
						<PlusCircle className='size-4 text-white' />
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>New Chat</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
