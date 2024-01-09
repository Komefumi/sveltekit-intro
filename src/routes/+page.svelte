<script>
	import TodoForm from '../components/todo-form.svelte';
	import Todo from '../components/todo.svelte';
	import { loadTodos, todos } from '../stores/todo';
	import { supabase } from '../lib';
	import { onMount } from 'svelte';
	console.log(supabase);

	onMount(() => {
		loadTodos();
	});
</script>

<main>
	<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">My Todos</h1>
	<TodoForm />
	{#each $todos as todo (todo.id)}
		<Todo {todo} />
	{/each}
</main>
