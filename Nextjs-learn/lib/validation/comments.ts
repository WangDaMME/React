import type { NewComment } from '@/types/comment'

export type ValidationOk<T> = { ok: true; data: T }
export type ValidationErr = { ok: false; errors: Record<string, string> }
export type ValidationResult<T> = ValidationOk<T> | ValidationErr

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizeText(value: unknown): string {
	if (typeof value !== 'string') return ''
	return value.trim()
}

export function validateNewComment(input: unknown): ValidationResult<NewComment> {
	if (!isRecord(input)) {
		return { ok: false, errors: { form: '请求体必须是 JSON object' } }
	}

	const author = normalizeText(input.author)
	const content = normalizeText(input.content)

	const errors: Record<string, string> = {}
	if (author.length < 2) errors.author = '作者至少 2 个字'
	if (author.length > 24) errors.author = '作者最多 24 个字'
	if (content.length < 1) errors.content = '内容不能为空'
	if (content.length > 240) errors.content = '内容最多 240 个字'

	if (Object.keys(errors).length > 0) return { ok: false, errors }
	return { ok: true, data: { author, content } }
}

