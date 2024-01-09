import { writable, type Subscriber, type Unsubscriber } from 'svelte/store';
import type { INewTodo, ITodo } from '../types/store';
import { supabase, uuidDefault } from '../lib';
import { TableEnum } from '../types/backend';

export const todos = writable<ITodo[]>([]);

const { TODOS } = TableEnum;

export async function loadTodos() {
	const { data, error } = await supabase.from(TODOS).select();
	if (error) {
		console.error(error);
		return;
	}

	todos.set(data);
}

export async function addTodo(text: string, user_id: string = uuidDefault) {
	const newItem: INewTodo = { text, user_id, completed: false };
	const { data, error } = await supabase.from(TODOS).insert([newItem]).select('*').single();
	if (error) {
		console.error(error);
		return;
	}
	console.log({ data });
	if (data === null) {
		console.error('Data retrieved after insertion was null');
		return;
	}
	todos.update((current) => [...current, data]);
}

export async function deleteTodo(id: string) {
	console.log({ id });
	// WRITE AN ARTICLE ABOUT THIS!
	const result = await supabase.from(TODOS).delete().eq('id', id);
	// const result = await tables.todos.delete().eq('id', id).select();
	console.log({ result });
	const { error } = result;
	if (error) {
		console.error(error);
		return;
	}
	todos.update((current) => current.filter((todo) => todo.id !== id));
}

export async function toggleTodoCompleted(id: string) {
	let updated = false;
	const __unsubscribe = todos.subscribe((data) => {
		operate(data);
	});
	async function operate(todoList: ITodo[]) {
		if (updated) {
			return;
		}
		const index = todoList.findIndex((todo) => todo.id === id);
		if (index === -1) {
			__unsubscribe();
			return;
		}
		const item = todoList[index];
		const { error, data } = await supabase
			.from(TODOS)
			.update({ completed: !item.completed })
			.eq('id', item.id)
			.select('*');
		if (error) {
			console.error(error);
			__unsubscribe();
			return;
		}

		if (data === null) {
			console.error('Data after updation is null');
			__unsubscribe();
			return;
		}

		console.log({ data });

		updated = true;
		todos.set([
			...todoList.slice(0, index),
			{ ...(data[0] as ITodo) },
			...todoList.slice(index + 1)
		]);
		__unsubscribe();
	}
}
export function subscribeToTodos(run: Subscriber<ITodo[]>): Unsubscriber {
	return todos.subscribe(run);
}
