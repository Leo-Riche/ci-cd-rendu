const API_URL = 'http://localhost:3001/api/todos';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createTodo(text: string): Promise<Todo> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function toggleTodoStatus(id: string): Promise<Todo> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH'
  });
  return response.json();
}

export async function removeTodo(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}
