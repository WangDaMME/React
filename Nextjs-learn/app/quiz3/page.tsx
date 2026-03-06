import CommentForm from './CommentForm'
import { listComments } from '@/lib/quiz3/commentsStore'

export const dynamic = 'force-dynamic'

export default async function Page() {
	const comments = await listComments()

	return (
		<main className="px-4 py-10">
			<div className="mx-auto max-w-4xl space-y-6">
				<div className="space-y-2">
					<h1 className="text-3xl font-semibold tracking-tight">Quiz3：评论列表 + 表单校验</h1>
					<p className="text-sm text-neutral-600 dark:text-neutral-300">
						这是一个 Server Component 页面：负责在服务端拉取数据并渲染列表。
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
							href="/quiz4"
						>
							去 Quiz4（联系人查询）
						</a>
					</div>
				</div>

				<CommentForm />

				<section className="rounded-xl border border-neutral-200 bg-white/70 p-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/60">
					<div className="flex items-baseline justify-between">
						<h2 className="text-base font-semibold tracking-tight">评论列表（来自 `lib/data/quiz3.json`）</h2>
						<span className="text-sm text-neutral-600 dark:text-neutral-300">
							共 {comments.length} 条
						</span>
					</div>
					<div className="mt-3 divide-y divide-neutral-200 dark:divide-neutral-800">
						{comments.map((c) => (
							<div key={c.id} className="py-3">
								<div className="flex flex-wrap items-center justify-between gap-2">
									<div className="text-sm font-medium">{c.author}</div>
									<time className="text-xs text-neutral-500 dark:text-neutral-400">
										{new Date(c.timestamp).toLocaleString()}
									</time>
								</div>
								<p className="mt-1 text-sm text-neutral-700 dark:text-neutral-200">{c.content}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</main>
	)
}

