<script>
	import { Icons } from '$lib/components/icons';
	import Button from '$lib/components/ui/button/button.svelte';
	export let isLoading = false;
</script>

<Button
	variant="outline"
	type="submit"
	disabled={isLoading}
	class="font-bold text-white bg-blue-600 rounded hover:bg-blue-700 hover:text-gray-200"
	formaction="?/loginWithProvider&provider=facebook"
>
	<Icons.facebook/>
	<span class="ml-3">Facebook</span>
</Button>
