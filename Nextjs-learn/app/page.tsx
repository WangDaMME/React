export default function Page() {
	return (
		<main className="px-4 py-10">
			<div className="mx-auto max-w-4xl space-y-6">
				<div className="space-y-2">
					<h1 className="text-4xl font-semibold tracking-tight">Next.js 新手小例子</h1>
					<p className="text-sm text-neutral-600 dark:text-neutral-300">
						包含 App Router 的 `route.ts`、Server Component / Client Component、`lib/` 工具层、`lib/data` 假数据、以及 Tailwind UI。
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<a
						href="/quiz3"
						className="rounded-xl border border-neutral-200 bg-white/70 p-4 backdrop-blur transition hover:bg-white dark:border-neutral-800 dark:bg-neutral-950/60 dark:hover:bg-neutral-950"
					>
						<div className="text-base font-semibold tracking-tight">Quiz3：评论列表 + 表单校验</div>
						<div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
							API：GET/POST，写回 `lib/data/quiz3.json`（仅本地演示）
						</div>
					</a>
					<a
						href="/quiz4"
						className="rounded-xl border border-neutral-200 bg-white/70 p-4 backdrop-blur transition hover:bg-white dark:border-neutral-800 dark:bg-neutral-950/60 dark:hover:bg-neutral-950"
					>
						<div className="text-base font-semibold tracking-tight">Quiz4：联系人搜索（baseline vs optimized）</div>
						<div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
							API：POST 查询，数据来自 `lib/data/quiz2.json`
						</div>
					</a>
				</div>
			</div>
		</main>
	)
}


