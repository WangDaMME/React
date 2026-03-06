import ContactSearch from './ContactSearch'

export default function Page() {
	return (
		<main className="px-4 py-10">
			<div className="mx-auto max-w-4xl space-y-6">
				<div className="space-y-2">
					<h1 className="text-3xl font-semibold tracking-tight">Quiz4：用 `lib/data` 做查询</h1>
					<p className="text-sm text-neutral-600 dark:text-neutral-300">
						这里用 `lib/data/quiz2.json` 作为“假数据库”，通过两个 API 路由演示 baseline vs optimized 查询。
					</p>
					<div className="flex flex-wrap gap-2 text-sm">
						<a
							className="rounded-lg border border-neutral-200 bg-white/70 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950/60"
							href="/"
						>
							返回首页
						</a>
						<a
							className="rounded-lg border border-neutral-200 bg-white/70 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950/60"
							href="/quiz3"
						>
							去 Quiz3（评论）
						</a>
					</div>
				</div>

				<ContactSearch />
			</div>
		</main>
	)
}

