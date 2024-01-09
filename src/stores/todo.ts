import { writable, type Subscriber, type Unsubscriber } from 'svelte/store';
import type { ITodo } from '../types/store';

export const todos = writable<ITodo[]>([]);
export function addTodo(text: string) {
	todos.update((current) => [...current, { text, completed: false, id: Date.now() }]);
}
export function deleteTodo(id: number) {
	todos.update((current) => current.filter((todo) => todo.id !== id));
}
export function toggleTodoCompleted(id: number) {
	todos.update((todos) => {
		const index = todos.findIndex((todo) => todo.id === id);
		if (index === -1) return todos;
		const item = todos[index];
		return [
			...todos.slice(0, index),
			{ ...item, completed: !item.completed },
			...todos.slice(index + 1)
		];
	});
}
export function subscribeToTodos(run: Subscriber<ITodo[]>): Unsubscriber {
	return todos.subscribe(run);
}
