import { Id } from '@/convex/_generated/dataModel';
import { create } from 'zustand';
interface Attachment {
	name?: string;
	contentType?: string;
	url: string;
}
type response = {
	chats: messages[];
	updateChat: (val: messages[]) => void;
	panel: Boolean;
	showPanel: () => void;
	prevId: Id<'documents'> | undefined;
	setPrevId: (val: Id<'documents'> | undefined) => void;
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
	updateChat: (val) => {
		set(() => ({ chats: val }));
	},
	panel: false,
	showPanel: () => {
		set((state) => ({ panel: !state.panel }));
	},
	prevId: undefined,
	setPrevId: (val) => {
		set(() => ({ prevId: val }));
	},
}));
