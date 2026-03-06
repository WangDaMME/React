import type { Comment, NewComment } from '@/types/comment'
import { readJsonFile, writeJsonFile } from '@/lib/server/jsonFile'

const COMMENTS_JSON_PATH = 'lib/data/quiz3.json'

export async function listComments(): Promise<Comment[]> {
	return await readJsonFile<Comment[]>(COMMENTS_JSON_PATH)
}

function nextId(comments: Comment[]): number {
	let max = 0
	for (const c of comments) max = Math.max(max, c.id)
	return max + 1
}

export async function createComment(input: NewComment): Promise<Comment> {
	const comments = await listComments()
	const comment: Comment = {
		id: nextId(comments),
		author: input.author,
		content: input.content,
		timestamp: new Date().toISOString(),
	}
	const updated = [comment, ...comments]
	await writeJsonFile(COMMENTS_JSON_PATH, updated)
	return comment
}

