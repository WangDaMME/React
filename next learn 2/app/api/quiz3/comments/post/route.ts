/**
 * 作用：API 路由，URL = /api/quiz3/comments/post
 * - 导出 POST 即提供 POST /api/quiz3/comments/post，接收 JSON body，校验后写入评论（commentsStore）
 */
import { NextResponse } from 'next/server'
import { ApiPostResponse } from '@/types/comment'
import { validateNewComment } from '@/lib/validation/comments'
import { createComment } from '@/lib/quiz3/commentsStore'

// export const runtime = 'nodejs' // 默认就是 node.js 环境

export async function POST(request: Request) {
	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json<ApiPostResponse>(
			{ errors: { form: 'JSON 解析失败' } },
			{ status: 400 },
		)
	}

	const parsed = validateNewComment(body)
	if (!parsed.ok) {
		return NextResponse.json<ApiPostResponse>(
			{ errors: parsed.errors },
			{ status: 400 },
		)
	}

	const comment = await createComment(parsed.data)
	return NextResponse.json<ApiPostResponse>({ comment }, { status: 201 })
}


