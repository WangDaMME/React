'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { validateNewComment } from '@/lib/validation/comments'

type FieldErrors = Record<string, string>

export default function CommentForm() {
	const router = useRouter()
	const [author, setAuthor] = useState('')
	const [content, setContent] = useState('')
	const [errors, setErrors] = useState<FieldErrors>({})
	const [isPending, startTransition] = useTransition()

	const canSubmit = useMemo(() => {
		const parsed = validateNewComment({ author, content })
		return parsed.ok
	}, [author, content])

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setErrors({})

		const parsed = validateNewComment({ author, content })
		if (!parsed.ok) {
			setErrors(parsed.errors)
			return
		}

		const res = await fetch('/api/quiz3/comments/post', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(parsed.data),
		})

		if (!res.ok) {
			const data = (await res.json().catch(() => null)) as { errors?: FieldErrors } | null
			setErrors(data?.errors ?? { form: '提交失败，请稍后再试' })
			return
		}

		setAuthor('')
		setContent('')
		startTransition(() => router.refresh())
	}

	return (
		<form
			onSubmit={onSubmit}
			className="rounded-xl border border-neutral-200 bg-white/70 p-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/60"
		>
			<div className="flex items-start justify-between gap-3">
				<div>
					<h2 className="text-base font-semibold tracking-tight">新增评论</h2>
					<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
						这是一个 Client Component：负责表单输入、调用 API、并触发刷新。
					</p>
				</div>
				<button
					type="submit"
					disabled={!canSubmit || isPending}
					className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
				>
					{isPending ? '刷新中…' : '提交'}
				</button>
			</div>

			{errors.form ? (
				<div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
					{errors.form}
				</div>
			) : null}

			<div className="mt-4 grid gap-3">
				<label className="grid gap-1">
					<span className="text-sm font-medium">作者</span>
					<input
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						placeholder="例如：小明"
						className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:ring-neutral-700"
					/>
					{errors.author ? (
						<span className="text-xs text-red-600 dark:text-red-300">{errors.author}</span>
					) : null}
				</label>

				<label className="grid gap-1">
					<span className="text-sm font-medium">内容</span>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="写点什么…"
						rows={4}
						className="w-full resize-y rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:ring-neutral-700"
					/>
					{errors.content ? (
						<span className="text-xs text-red-600 dark:text-red-300">{errors.content}</span>
					) : null}
				</label>
			</div>
		</form>
	)
}

