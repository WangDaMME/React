/**
 * 评论相关类型：供 lib/quiz3、API、校验层使用
 */
export type Comment = {
	id: number
	author: string
	content: string
	timestamp: string
}

export type NewComment = {
	author: string
	content: string
}

export type ApiListResponse = {
	comments: Comment[]
}

export type ApiPostResponse =
	| { comment: Comment }
	| { errors: Record<string, string> }
