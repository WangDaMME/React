/**
 * 作用：App Router 的根布局（Root Layout）
 * - 对应整站，不占 URL；所有 app 下的页面都会被包在 <html><body>{children}</body></html> 里
 * - 默认是 Server Component，可在这里放全局样式、字体、meta 等
 * 代码里几乎没有组件 显式 import RootLayout。
 * 原因是：layout.tsx 是 Next.js 框架自动使用的，不需要你手动 import。
 */
import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}


