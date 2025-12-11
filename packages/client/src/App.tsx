import { useEffect, useState } from 'react';
import { fetchTodos, createTodo, toggleTodoStatus, removeTodo, Todo } from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { CheckSquare } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(text: string) {
    try {
      const newTodo = await createTodo(text);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  }

  async function handleToggle(id: string) {
    try {
      await toggleTodoStatus(id);
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await removeTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <CheckSquare className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">New Todo List</h1>
          </div>

          <TodoForm onAdd={handleAdd} />

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : todos.length === 0 ? (
            <p className="text-center text-gray-500">No todos yet. Add one above!</p>
          ) : (
            <div className="space-y-2">
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
