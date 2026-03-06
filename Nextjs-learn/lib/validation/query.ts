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

function normalizeLimit(value: unknown): number | undefined {
	if (typeof value !== 'number' || !Number.isFinite(value)) return undefined
	return Math.max(1, Math.min(50, Math.floor(value)))
}

export function validateQuery(input: unknown): ValidationResult<{ q: string; limit?: number }> {
	if (!isRecord(input)) return { ok: false, errors: { form: '请求体必须是 JSON object' } }

	const q = normalizeText(input.q)
	const limit = normalizeLimit(input.limit)
	const errors: Record<string, string> = {}

	if (q.length === 0) errors.q = '请输入关键词'
	if (q.length > 60) errors.q = '关键词太长（最多 60 个字符）'

	if (Object.keys(errors).length > 0) return { ok: false, errors }
	return { ok: true, data: { q, limit } }
}

