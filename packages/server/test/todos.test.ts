import { describe, it, expect, afterEach } from 'vitest';
import {getAllTodos, addTodo, toggleTodo, deleteTodo} from '../src/todos.ts';
import { readTodos, writeTodos } from '../src/storage.js';


describe('Todo Functions', () => {
  afterEach(async () => {
    await writeTodos([]);
  });

  it('should add a new todo', async () => {
    const newTodo = await addTodo('Test Todo');
    expect(newTodo).toHaveProperty('id');
    expect(newTodo.text).toBe('Test Todo');
    expect(newTodo.completed).toBe(false);
  });

  it('should toggle a todo', async () => {
    const newTodo = await addTodo('Toggle Todo');
    const toggledTodo = await toggleTodo(newTodo.id);
    expect(toggledTodo?.completed).toBe(true);
  });

  it('should delete a todo', async () => {
    const newTodo = await addTodo('Delete Todo');
    const response = await deleteTodo(newTodo.id);
    expect(response.success).toBe(true);
    const todos = await getAllTodos();
    expect(todos).toHaveLength(0);
  });
});
