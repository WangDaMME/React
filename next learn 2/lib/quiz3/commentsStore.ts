/**
 * 作用：评论的读写层（服务端用）
 * - 数据源：直接 import lib/data/quiz3.json，不再 readJsonFile；写仍用 writeJsonFile 持久化
 * - listComments：返回内存中的评论列表（初始来自 import，新增的来自 createComment）
 * - createComment：追加一条并写回文件
 */
import type { Comment, NewComment } from '@/types/comment'
import { writeJsonFile } from '@/lib/server/jsonFile'
import commentsData from '@/lib/data/quiz3.json'

const COMMENTS_JSON_PATH = 'lib/data/quiz3.json'

const commentsList: Comment[] = [...(commentsData as Comment[])]

export async function listComments(): Promise<Comment[]> {
	return commentsList
}

function nextId(comments: Comment[]): number {
	let max = 0
	for (const c of comments) max = Math.max(max, c.id)
	return max + 1
}

export async function createComment(input: NewComment): Promise<Comment> {
	const comment: Comment = {
		id: nextId(commentsList),
		author: input.author,
		content: input.content,
		timestamp: new Date().toISOString(),
	}
	commentsList.unshift(comment)
	await writeJsonFile(COMMENTS_JSON_PATH, commentsList)
	return comment
}

