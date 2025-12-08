import { readTodos, writeTodos } from './storage.js';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export async function getAllTodos(): Promise<Todo[]> {
  return await readTodos();
}

export async function addTodo(text: string): Promise<Todo> {
  const todos = await readTodos() as Todo[];
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  await writeTodos(todos);
  return newTodo;
}

export async function toggleTodo(id: string): Promise<Todo | undefined> {
  const todos = await readTodos() as Todo[];
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    await writeTodos(todos);
  }
  return todo;
}

export async function deleteTodo(id: string): Promise<{ success: boolean }> {
  const todos = await readTodos() as Todo[];
  const filtered = todos.filter(t => t.id !== id);
  await writeTodos(filtered);
  return { success: true };
}
