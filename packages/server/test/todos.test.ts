<<<<<<< HEAD
import { describe, it, expect, afterEach } from "vitest";
import { getAllTodos, addTodo, toggleTodo, deleteTodo } from "../src/todos.ts";
import { writeTodos } from "../src/storage.js";

describe("Todo Functions", () => {
=======
import { describe, it, expect, afterEach } from 'vitest';
import {getAllTodos, addTodo, toggleTodo, deleteTodo} from '../src/todos.ts';
import { readTodos, writeTodos } from '../src/storage.js';


describe('Todo Functions', () => {
>>>>>>> 3370b78b77ed05b11d25599284e7bcb3b03df028
  afterEach(async () => {
    await writeTodos([]);
  });

<<<<<<< HEAD
  it("should return undefined when toggling a non-existing todo", async () => {
    const result = await toggleTodo("invalid-id");
    expect(result).toBeUndefined();
  });

  it("should add a new todo", async () => {
    const newTodo = await addTodo("Test Todo");
    expect(newTodo).toHaveProperty("id");
    expect(newTodo.text).toBe("Test Todo");
    expect(newTodo.completed).toBe(false);
  });

  it("should toggle a todo", async () => {
    const newTodo = await addTodo("Toggle Todo");
=======
  it('should add a new todo', async () => {
    const newTodo = await addTodo('Test Todo');
    expect(newTodo).toHaveProperty('id');
    expect(newTodo.text).toBe('Test Todo');
    expect(newTodo.completed).toBe(false);
  });

  it('should toggle a todo', async () => {
    const newTodo = await addTodo('Toggle Todo');
>>>>>>> 3370b78b77ed05b11d25599284e7bcb3b03df028
    const toggledTodo = await toggleTodo(newTodo.id);
    expect(toggledTodo?.completed).toBe(true);
  });

<<<<<<< HEAD
  it("should delete a todo", async () => {
    const newTodo = await addTodo("Delete Todo");
=======
  it('should delete a todo', async () => {
    const newTodo = await addTodo('Delete Todo');
>>>>>>> 3370b78b77ed05b11d25599284e7bcb3b03df028
    const response = await deleteTodo(newTodo.id);
    expect(response.success).toBe(true);
    const todos = await getAllTodos();
    expect(todos).toHaveLength(0);
  });
<<<<<<< HEAD

  it("should still return success when deleting a non-existing todo", async () => {
    const result = await deleteTodo("invalid-id");
    expect(result.success).toBe(true);
  });

  it("should handle empty todo text", async () => {
    const todo = await addTodo("");
    expect(todo.text).toBe("");
  });
=======
>>>>>>> 3370b78b77ed05b11d25599284e7bcb3b03df028
});
