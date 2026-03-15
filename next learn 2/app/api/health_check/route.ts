/**
 * 作用：API 路由，URL = /api/health_check
 * - app/api/health_check/route.ts 中 export GET 即提供 GET /api/health_check
 * - 用于检查服务是否存活
 */
import { NextResponse } from 'next/server'

export async function GET() {
	return NextResponse.json({
		status: 'ok',
		timestamp: new Date().toISOString(),
	})
}


