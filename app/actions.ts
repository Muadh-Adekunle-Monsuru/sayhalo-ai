'use server';

import { google } from '@ai-sdk/google';
import { CoreMessage, generateText } from 'ai';

import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

export async function generateTitle(message: string) {
	const { text } = await generateText({
		model: google('models/gemini-1.5-pro-latest'),
		prompt: `Generate a short 4 words or less title for the following question: {question:${message}} if the question is empty return 'Untitled'`,
	});

	return text;
}

export async function quickSearchResponse(messages: CoreMessage[]) {
	const result = await streamText({
		model: google('models/gemini-1.5-pro-latest'),
		messages,
	});

	const stream = createStreamableValue(result.textStream);
	return stream.value;
}
