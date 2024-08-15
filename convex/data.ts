import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const createRecord = mutation({
	args: {
		messages: v.string(),
		userId: v.optional(v.string()),
		title: v.string(),
	},
	handler: async (ctx, args) => {
		const documentId = await ctx.db.insert('documents', {
			userId: args.userId,
			title: args.title,
			messages: args.messages,
		});

		return documentId;
	},
});

export const updateRecord = mutation({
	args: {
		messages: v.string(),
		id: v.id('documents'),
	},
	handler: async (ctx, args) => {
		const documentId = await ctx.db.patch(args.id, {
			messages: args.messages,
		});

		return documentId;
	},
});

export const getRecord = query({
	args: { documentId: v.id('documents') },
	handler: async (ctx, args) => {
		return await ctx.db.get(args.documentId);
	},
});

export const getAllUserRecords = query({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		const response = await ctx.db
			.query('documents')
			.filter((q) =>
				q.and(
					q.eq(q.field('userId'), args.userId),
					q.neq(q.field('title'), ''),
					q.neq(q.field('messages'), '[]')
				)
			)
			.order('desc')
			.collect();

		return response;
	},
});

export const deleteRecord = mutation({
	args: { id: v.id('documents') },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});
