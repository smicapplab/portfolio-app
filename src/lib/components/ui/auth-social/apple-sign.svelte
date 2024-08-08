<script>
	import { Icons } from '$lib/components/icons';
	import Button from '$lib/components/ui/button/button.svelte';
	export let isLoading = false;
</script>

<Button
	variant="outline"
	type="button"
	disabled={isLoading}
	class="font-bold text-white bg-black rounded hover:bg-black hover:text-gray-200"
>
	<Icons.apple class="w-5 h-5" />
	<span class="ml-3">Apple</span>
</Button>
