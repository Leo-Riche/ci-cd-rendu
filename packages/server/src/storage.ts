import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, './data');
const TODOS_FILE = join(DATA_DIR, 'todos.json');

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

export async function readTodos() {
  await ensureDataDir();

  if (!existsSync(TODOS_FILE)) {
    return [];
  }

  const data = await readFile(TODOS_FILE, 'utf-8');
  return JSON.parse(data);
}

export async function writeTodos(todos: unknown[]) {
  await ensureDataDir();
  await writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), 'utf-8');
}
