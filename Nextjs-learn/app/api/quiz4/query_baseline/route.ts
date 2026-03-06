import { NextResponse } from 'next/server'
import type { ApiContactQueryResponse } from '@/types/contact'
import { validateQuery } from '@/lib/validation/query'
import { searchContactsBaseline } from '@/lib/quiz4/contactsStore'

export const runtime = 'nodejs'

export async function POST(request: Request) {
	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ errors: { form: 'JSON 解析失败' } }, { status: 400 })
	}

	const parsed = validateQuery(body)
	if (!parsed.ok) return NextResponse.json({ errors: parsed.errors }, { status: 400 })

	const results = await searchContactsBaseline(parsed.data.q, parsed.data.limit ?? 20)
	const res: ApiContactQueryResponse = {
		q: parsed.data.q,
		count: results.length,
		results,
	}
	return NextResponse.json(res, { status: 200 })
}
