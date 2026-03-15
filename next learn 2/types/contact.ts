/**
 * 联系人相关类型：供 lib/quiz4、API、ContactSearch 使用
 */
export type Contact = {
	id: string
	name: string
	email: string
	phone: string
}

export type ApiContactQueryResponse = {
	q: string
	count: number
	results: Contact[]
}
