<script>
	import { supabase } from '$lib';

	let loading = false;
	async function logout() {
		try {
			loading = true;
			await supabase.auth.signOut();
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}
</script>

<div class="my-4 flex justify-end">
	<button
		class="shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
		on:click={logout}
		disabled={loading}>Log out</button
	>
</div>
