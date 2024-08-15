import { create } from 'zustand';
interface Attachment {
	name?: string;
	contentType?: string;
	url: string;
}
type response = {
	chats: messages[];
	setChat: (val: messages[]) => void;
	experimental_attachments?: Attachment[];
};

type messages = {
	experimental_attachments?: Attachment[];
	id: string;
	content: string;
	createdAt?: Date | undefined;
	role: 'function' | 'system' | 'user' | 'assistant' | 'data' | 'tool';
};

export const useStore = create<response>((set) => ({
	chats: [],
	setChat: (val) => {
		set(() => ({ chats: val }));
	},
	experimental_attachments: [],
}));
