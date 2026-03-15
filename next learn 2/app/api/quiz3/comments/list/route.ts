/**
 * 作用：API 路由，URL = /api/quiz3/comments/list
 * - 导出 GET 即提供 GET /api/quiz3/comments/list，返回评论列表（供 Client 或其他服务调用）
 */
import { NextResponse } from 'next/server'
import { ApiListResponse } from '@/types/comment'
import { listComments } from '@/lib/quiz3/commentsStore'

export const runtime = 'nodejs'

export async function GET() {
	const comments = await listComments()
	return NextResponse.json<ApiListResponse>(
		{ comments },
		{ status: 200 },
	)
}


