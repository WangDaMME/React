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


