# Next.js 学习项目（React 转 Next 入门）

面向有 React 基础、想搞懂 Next.js 路由与 Server/Client 组件、数据流的说明与示例。

---

## 一、Next.js 路由：基于文件结构（App Router）

Next.js 使用 **文件系统即路由**：`app/` 下的文件夹和文件名直接决定 URL，不需要手写 `<Route>`。

--------------------------------------------------------
app/
  a/
    page.tsx   --->  返回一个ui
  api/
    users/
      route.ts  --> http get 返回数据
--------------------------------------


### 规则速查

| 文件/文件夹 | 作用 | 对应 URL |
|------------|------|----------|
| `app/page.tsx` | **根页面**，必须叫 `page` | `/` |
| `app/layout.tsx` | **根布局**，包裹所有页面（如 `<html>`, `<body>`） | 不占 URL，每页都会套这个布局 |
| `app/quiz3/page.tsx` | 名为 `page` 的文件 = 该段路径的页面 | `/quiz3` |
| `app/quiz4/page.tsx` | 同上 | `/quiz4` |
| `app/api/health_check/route.ts` | **API 路由**：`route.ts` 里导出 `GET`/`POST` 等 | `/api/health_check` |
| `app/api/quiz3/comments/list/route.ts` | 同上 | `/api/quiz3/comments/list` |
| `app/api/quiz3/comments/post/route.ts` | 同上 | `/api/quiz3/comments/post` |
| `app/api/quiz4/query_baseline/route.ts` | 同上 | `/api/quiz4/query_baseline` |
| `app/api/quiz4/query_optimized/route.ts` | 同上 | `/api/quiz4/query_optimized` |

### 要点

- **页面**：路径段里要有 `page.tsx`（或 `page.js`），该段才会变成可访问的页面。
- **布局**：`layout.tsx` 包住当前段及子段，可放导航、公共样式等；**不**对应 URL 的一段。
- **API**：在任意 `app/.../route.ts` 里 `export async function GET/POST(...)` 即可得到对应 URL 的接口。

每个相关文件在源码里都有**文件头注释**，说明「这段文件在路由/数据流里起什么作用」。

---

## 二、Server Component 与 Client Component

props 传递
1. server -> server
2. Client Component → Server Component ❌ 不允许 不可以 import
3. server -> client： 不能把**函数**或**不可序列化**的对象从 Server 传到 Client 子组件
  3.1- onClick: Server Component 在 服务器执行，而 Client Component 在 浏览器执行。
  3.2- JSON.stringify(data) 的 ， 不可 比如 map，set, promise,dom node...

redux
Redux store 只能在 Client Components 使用，Server Components 不能使用 Redux

### 默认是 Server Component

- `app/**/page.tsx`、`app/layout.tsx` 以及没有 `'use client'` 的组件，都是 **Server Component**。
- 只在**服务端**执行，可 `async`、直接调数据库/读文件，**不能**用 `useState`、`useEffect`、`onClick` 等。

### 需要交互时用 Client Component

- 在**第一行**写 `'use client'` 的组件是 **Client Component**。
- 会发到浏览器，可以用 React 的 `useState`、`useEffect`、事件、`useRouter` 等。

### 本项目的对应关系

| 文件 | 类型 | 说明 |
|------|------|------|
| `app/page.tsx` | Server | 首页，只做链接 |
| `app/quiz3/page.tsx` | Server | 服务端拉评论列表，再渲染；把列表和 `<CommentForm />` 拼在一起 |
| `app/quiz4/page.tsx` | Server | 只做壳，内部用 `<ContactSearch />` |
| `app/quiz3/CommentForm.tsx` | Client（`'use client'`） | 表单、校验、调 POST API、`router.refresh()` |
| `app/quiz4/ContactSearch.tsx` | Client（`'use client'`） | 输入、选模式、调查询 API、展示结果 |

---

## 三、数据怎么来：Server 拉数据 vs Client 调 API


### Server Component 如何拿数据

- **直接 async + 函数调用**，不经过浏览器。
- 例如 `app/quiz3/page.tsx` 里：
  - `const comments = await listComments()` 在**服务端**执行；
  - `listComments()` 内部读 `lib/data/quiz3.json`；
  - 渲染出的 HTML 里已经带好评论列表，**没有**在浏览器里再发一次「拉列表」的请求。

特点：

- 可以 **async function Page()**，直接 `await` 任何服务端逻辑（读文件、数据库、内部 API 等）。
- **有 props**：和普通 React 一样，父组件（包括别的 Server Component）可以 `<Page xxx={yyy} />` 传 props；这些 props 在服务端就定好了，不会把函数、不可序列化的东西传到客户端。

### Client Component 如何拿数据

- 在浏览器里发请求：`fetch('/api/...')`。
- 例如：
  - `CommentForm`：提交时 `fetch('/api/quiz3/comments/post', { method: 'POST', body: ... })`，成功后 `router.refresh()` 让上面的 Server 页面重新拉一次数据，列表就更新了。
  - `ContactSearch`：点「查询」时 `fetch('/api/quiz4/query_baseline' 或 query_optimized)', { method: 'POST', body: ... })`，把结果放进 `useState` 再渲染表格。

所以：

- **Server**：数据在服务端算好，随 HTML 一起下来，适合首屏、SEO、不依赖交互的数据。
- **Client**：用户操作后 `fetch` API，用 `useState` 存结果，适合搜索、表单提交、实时性数据。

---

## 四、数据流与“状态管理”（和 Redux / props 的关系）

### 没有全局 Redux 时的数据流

本项目**没有**用 Redux，数据流可以概括为：

1. **首屏 / 列表**
   - Server Component（如 `quiz3/page.tsx`）在服务端 `await listComments()`，得到 `comments`。
   - 把 `comments` 当**普通 React props** 用在当前页的 JSX 里（例如 `comments.map(...)`），不经过 Redux。

2. **用户操作后的更新（Quiz3 评论）**
   - Client 的 `CommentForm` 提交 → 调 `POST /api/quiz3/comments/post` → 服务端写文件。
   - 然后 `router.refresh()`：Next 会**重新跑一遍**当前页的 Server Component（再执行 `listComments()`），得到新列表，再渲染。
   - 所以「列表」的真相数据始终在 Server 端；Client 只负责触发「重跑 Server 组件」来刷新。

3. **用户操作后的查询（Quiz4 联系人）**
   - Client 的 `ContactSearch` 里 `useState` 存 `results`、`count` 等。
   - 点「查询」→ `fetch` 对应 API → 把返回的 `results` 设进 state → 表格更新。
   - 这里就是典型的「Client 自己管一块 UI 状态」，不涉及 Server 再渲染整页。

### Server Component 有 props 吗？

**有。** Server Component 和普通 React 组件一样可以接收 props，例如：

```tsx
// 父（可以是 layout 或另一个 page）
<SomePage initialCount={10} title="评论" />

// app/some/page.tsx
export default async function SomePage({ initialCount, title }: { initialCount: number; title: string }) {
  const data = await getData(initialCount)
  return <div>{title}: {data.length}</div>
}
```

注意：这些 props 在**服务端**就确定了，会参与服务端渲染；不能把**函数**或**不可序列化**的对象从 Server 传到 Client 子组件（传给 Client 组件的 props 必须可序列化）。

### 小结

- **数据从哪来**：Server 用 async + 直接调函数；Client 用 `fetch` 调 `app/api/.../route.ts`。
- **数据怎么管**：不用 Redux 时，Server 端数据靠「每次渲染时 async 拿」+ props 往下传；Client 端数据靠 `useState` + `fetch` 结果；需要整页更新时用 `router.refresh()` 让 Server 再跑一遍。

---

## 五、项目启动

### 环境要求

- Node.js 18+
- 已安装依赖（见下）

### 安装与运行

```bash
# 进入项目目录
cd /Users/dawang/Desktop/practice/Nextjs-learn

# 安装依赖（若尚未安装）
npm install

# 开发模式
npm run dev
```

浏览器打开：**http://localhost:3000**

- 首页：`/`，有到 Quiz3 / Quiz4 的链接。
- 评论页：`/quiz3`，Server 拉评论列表 + Client 表单提交，提交后 `router.refresh()` 刷新列表。
- 联系人搜索：`/quiz4`，Client 调 baseline / optimized 两个 API，看结果与耗时。

### 健康检查接口

```bash
curl http://localhost:3000/api/health_check
```

返回 `{ "status": "ok", "timestamp": "..." }` 表示服务正常。

---

## 六、目录结构简表（配合文件头注释阅读）

约定：**`app/`** 放页面、布局、API 路由（`.tsx` / `route.ts`）；**`lib/`** 只放 **`.ts`**（工具函数、数据读写、校验等），不放 React 组件。

```
app/
  layout.tsx         # 根布局，包住所有页面
  page.tsx           # 首页 /
  globals.css        # 全局样式（Tailwind）
  quiz3/
    page.tsx         # /quiz3 页面（Server：拉评论）
    CommentForm.tsx  # Client：评论表单 + 调 API + refresh
  quiz4/
    page.tsx         # /quiz4 页面（Server：壳）
    ContactSearch.tsx # Client：搜索表单 + 调 API + 展示结果
  api/
    health_check/route.ts
    quiz3/comments/list/route.ts   # GET 评论列表
    quiz3/comments/post/route.ts   # POST 新增评论
    quiz4/query_baseline/route.ts
    quiz4/query_optimized/route.ts

lib/                      # 只放 .ts：工具、数据层、校验等，不放页面/组件
  server/jsonFile.ts       # 服务端读/写 JSON 文件
  quiz3/commentsStore.ts   # 评论的读写（quiz3.json）
  quiz4/contactsStore.ts   # 联系人的查询（quiz2.json）
  validation/comments.ts   # 评论校验
  validation/query.ts      # 查询参数校验
  data/
    quiz2.json             # 联系人假数据
    quiz3.json             # 评论假数据
```

每个文件的**顶部注释**都写了该文件在「路由 / 数据流 / Server 或 Client」中的具体作用，便于你对照 README 和代码一起看。

7. layout.tsx
layout.tsx 不是每个目录都必须有，但整个 app 目录通常需要一个 root layout。

1️⃣ Root layout.tsx 基本是必须的
在 app 目录下通常需要一个 root layout：

app/
  layout.tsx
  page.tsx

8. lib 文件夹
可复用的业务逻辑 / 工具函数 / 服务层代码/数据库访问