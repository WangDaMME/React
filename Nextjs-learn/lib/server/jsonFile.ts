import { promises as fs } from 'node:fs'
import path from 'node:path'

function toAbsolutePath(relativeFromProjectRoot: string) {
	return path.join(process.cwd(), relativeFromProjectRoot)
}

export async function readJsonFile<T>(relativeFromProjectRoot: string): Promise<T> {
	const abs = toAbsolutePath(relativeFromProjectRoot)
	const raw = await fs.readFile(abs, 'utf8')
	return JSON.parse(raw) as T
}

export async function writeJsonFile(
	relativeFromProjectRoot: string,
	value: unknown,
): Promise<void> {
	const abs = toAbsolutePath(relativeFromProjectRoot)
	const json = JSON.stringify(value, null, 2) + '\n'
	await fs.writeFile(abs, json, 'utf8')
}

