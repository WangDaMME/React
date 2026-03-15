/**
 * 作用：在 Node 环境（Server / API Route）下按项目根路径读、写 JSON 文件
 * - 只读的 data 请用直接 import（如 import data from '@/lib/data/xxx.json'），本模块仅用于需要运行时读写的情况
 * - 仅服务端使用，不要在 'use client' 组件里引用
 */
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

