'use server';

import { google } from '@ai-sdk/google';
import { CoreMessage, generateText } from 'ai';

export async function generateTitle(message: string) {
	const { text } = await generateText({
		model: google('models/gemini-1.5-pro-latest'),
		prompt: `Generate a short 4 words or less title for the following question: {question:${message}} if the question is empty return 'Untitled'`,
	});

	return text;
}
