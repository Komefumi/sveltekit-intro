<script lang="ts">
	import { user } from '../stores/auth';
	import { addTodo } from '../stores/todo';

	let todo = '';
	let submitting = false;
	async function handleSubmit() {
		try {
			submitting = true;
			await addTodo(todo, $user!.id);
			todo = '';
		} catch (error) {
			console.error(error);
		} finally {
			submitting = false;
		}
	}
</script>

<form class="my-6" on:submit|preventDefault={handleSubmit}>
	<div class="flex flex-col text-sm mb-2">
		<label class="font-bold mb-2 text-gray-800" for="todo">Todo</label>
		<input
			class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
			type="text"
			name="todo"
			id=""
			bind:value={todo}
			placeholder="Watcha gotta do?"
		/>
	</div>
	<button
		type="submit"
		class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
		disabled={submitting}>Submit</button
	>
</form>
