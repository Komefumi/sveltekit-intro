<script>
	import { supabase } from '$lib';
	import { onMount } from 'svelte';
	import Auth from '../components/auth.svelte';
	import { user } from '../stores/auth';
	import '../tailwind.css';
	import { loadTodos } from '../stores/todo';
	import Navbar from '../components/navbar.svelte';

	onMount(async () => {
		const { data, error } = await supabase.auth.getUser();
		const userFound = data.user;
		if (error) {
			console.error(error);
		}
		user.set(userFound);
		console.log({ userFoundFromOnMount: userFound });
	});

	supabase.auth.onAuthStateChange((_, session) => {
		const foundUser = session?.user || null;
		user.set(foundUser);
		if (foundUser) {
			loadTodos();
		}
	});
</script>

<div class="container mx-auto my-6 max-w-lg">
	{#if $user}
		<Navbar />
		<slot />
	{:else}
		<Auth />
	{/if}
</div>
