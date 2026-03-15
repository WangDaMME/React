/**
 * 作用：联系人查询层（服务端用）
 * - 数据源：lib/data/quiz2.json（只读，直接 import）
 * - searchContactsBaseline：逐条匹配；searchContactsOptimized：建索引后匹配，供 API route 调用
 */
import type { Contact } from '@/types/contact'
import { readJsonFile } from '@/lib/server/jsonFile'
import contactsData from '@/lib/data/quiz2.json'

const contacts = contactsData as Contact[]

export async function listContacts(): Promise<Contact[]> {
	return contacts
}

function normalize(s: string): string {
	return s.trim().toLowerCase()
}

function toSearchText(c: Contact): string {
	return normalize(`${c.name} ${c.email} ${c.phone} ${c.id}`)
}

export async function searchContactsBaseline(
	q: string,
	limit = 20,
): Promise<Contact[]> {
	const needle = normalize(q)
	const all = await listContacts()
	const results: Contact[] = []
	for (const c of all) {
		if (toSearchText(c).includes(needle)) {
			results.push(c)
			if (results.length >= limit) break
		}
	}
	return results
}

let cachedIndex: { builtAt: number; items: Array<{ contact: Contact; search: string }> } | null =
	null

async function getIndex() {
	if (cachedIndex) return cachedIndex
	const all = await listContacts()
	cachedIndex = {
		builtAt: Date.now(),
		items: all.map((c) => ({ contact: c, search: toSearchText(c) })),
	}
	return cachedIndex
}

export async function searchContactsOptimized(
	q: string,
	limit = 20,
): Promise<{ results: Contact[]; indexBuiltAt: number }> {
	const needle = normalize(q)
	const index = await getIndex()
	const results: Contact[] = []
	for (const item of index.items) {
		if (item.search.includes(needle)) {
			results.push(item.contact)
			if (results.length >= limit) break
		}
	}
	return { results, indexBuiltAt: index.builtAt }
}

