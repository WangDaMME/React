'use client'

import { useMemo, useState } from 'react'
import type { ApiContactQueryResponse, Contact } from '@/types/contact'

type Mode = 'baseline' | 'optimized'

export default function ContactSearch() {
	const [q, setQ] = useState('Mary')
	const [limit, setLimit] = useState(20)
	const [mode, setMode] = useState<Mode>('optimized')
	const [results, setResults] = useState<Contact[]>([])
	const [count, setCount] = useState(0)
	const [error, setError] = useState<string | null>(null)
	const [ms, setMs] = useState<number | null>(null)
	const [loading, setLoading] = useState(false)

	const endpoint = useMemo(() => {
		return mode === 'baseline'
			? '/api/quiz4/query_baseline'
			: '/api/quiz4/query_optimized'
	}, [mode])

	async function run() {
		setError(null)
		setLoading(true)
		setMs(null)
		try {
			const t0 = performance.now()
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ q, limit }),
			})
			const t1 = performance.now()
			setMs(Math.round(t1 - t0))

			if (!res.ok) {
				const data = (await res.json().catch(() => null)) as { errors?: Record<string, string> } | null
				setError(data?.errors?.q ?? data?.errors?.form ?? '请求失败')
				return
			}

			const data = (await res.json()) as ApiContactQueryResponse
			setResults(data.results)
			setCount(data.count)
		} catch {
			setError('网络错误或服务未启动')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="rounded-xl border border-neutral-200 bg-white/70 p-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/60">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-1">
					<h2 className="text-base font-semibold tracking-tight">联系人搜索（Quiz4）</h2>
					<p className="text-sm text-neutral-600 dark:text-neutral-300">
						这是一个 Client Component：输入关键词后调用 `route.ts` API。
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => setMode('baseline')}
						className={`rounded-lg border px-3 py-2 text-sm ${
							mode === 'baseline'
								? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
								: 'border-neutral-200 bg-white/70 dark:border-neutral-800 dark:bg-neutral-950/60'
						}`}
					>
						Baseline
					</button>
					<button
						type="button"
						onClick={() => setMode('optimized')}
						className={`rounded-lg border px-3 py-2 text-sm ${
							mode === 'optimized'
								? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
								: 'border-neutral-200 bg-white/70 dark:border-neutral-800 dark:bg-neutral-950/60'
						}`}
					>
						Optimized
					</button>
					<button
						type="button"
						onClick={run}
						disabled={loading}
						className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
					>
						{loading ? '查询中…' : '查询'}
					</button>
				</div>
			</div>

			<div className="mt-4 grid gap-3 sm:grid-cols-3">
				<label className="grid gap-1 sm:col-span-2">
					<span className="text-sm font-medium">关键词（q）</span>
					<input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:ring-neutral-700"
						placeholder="例如：Mary / outlook / 218"
					/>
				</label>
				<label className="grid gap-1">
					<span className="text-sm font-medium">最多返回（limit）</span>
					<input
						value={limit}
						onChange={(e) => setLimit(Number(e.target.value))}
						type="number"
						min={1}
						max={50}
						className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:ring-neutral-700"
					/>
				</label>
			</div>

			{error ? (
				<div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
					{error}
				</div>
			) : null}

			<div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-neutral-600 dark:text-neutral-300">
				<div>
					模式：<span className="font-medium text-neutral-900 dark:text-white">{mode}</span>
					<span className="mx-2">·</span>
					接口：<span className="font-mono text-xs">{endpoint}</span>
				</div>
				<div>
					结果：<span className="font-medium text-neutral-900 dark:text-white">{count}</span>
					{ms !== null ? (
						<>
							<span className="mx-2">·</span>
							耗时：<span className="font-medium text-neutral-900 dark:text-white">{ms}ms</span>
						</>
					) : null}
				</div>
			</div>

			<div className="mt-3 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
				<table className="w-full text-left text-sm">
					<thead className="bg-neutral-50 text-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-200">
						<tr>
							<th className="px-3 py-2 font-medium">Name</th>
							<th className="px-3 py-2 font-medium">Email</th>
							<th className="px-3 py-2 font-medium">Phone</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
						{results.map((c) => (
							<tr key={c.id} className="bg-white/70 dark:bg-neutral-950/60">
								<td className="px-3 py-2 font-medium">{c.name}</td>
								<td className="px-3 py-2">{c.email}</td>
								<td className="px-3 py-2">{c.phone}</td>
							</tr>
						))}
						{results.length === 0 ? (
							<tr className="bg-white/70 dark:bg-neutral-950/60">
								<td className="px-3 py-6 text-center text-neutral-500 dark:text-neutral-400" colSpan={3}>
									暂无结果（点击“查询”试试）
								</td>
							</tr>
						) : null}
					</tbody>
				</table>
			</div>
		</div>
	)
}

