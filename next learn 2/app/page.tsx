/**
 * 作用：根路径 / 的页面（首页）
 * - 文件位置 app/page.tsx 决定 URL 为 /
 * - Server Component，仅做导航链接到 /quiz3、/quiz4
 */
export default function Page() {
	return (
		<main>
			<div> 新手小例子</div>
			<div>
				<a href='/quiz3'>Quiz3：评论列表 + 表单校验</a>
			</div>
			<div>
				<a href='/quiz4'>Quiz4：联系人搜索（baseline vs optimized）</a>
			</div>
		</main>
	)
}


