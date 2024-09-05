<script>
	// @ts-nocheck
	import { Icons } from '$lib/components/icons';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	function toggleTheme() {
		theme.toggleTheme();
	}
</script>

<button class="btn btn-ghost" on:click={toggleTheme}>
	{#if $theme === 'light'}
		<Icons.moon color={$theme === 'light' ? '#000' : '#fff'} />
	{:else}
		<Icons.sun color={$theme === 'light' ? '#000' : '#fff'} />
	{/if}
</button>
