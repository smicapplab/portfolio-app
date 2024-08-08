<script>
	import { Icons } from '$lib/components/icons';
	import Button from '$lib/components/ui/button/button.svelte';

	export let isLoading = false;
</script>

<Button
	variant="outline"
	type="button"
	disabled={isLoading}
	class="font-bold text-white bg-red-500 rounded hover:bg-red-600 hover:text-gray-200"
>
	<Icons.google class="w-5 h-5" />
	<span class="ml-3">Google</span>
</Button>
