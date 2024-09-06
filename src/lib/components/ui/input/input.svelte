<script>
	import { theme } from '$lib/stores/theme';

	// @ts-nocheck
	export let label = '';
	export let name = '';
	export let errors;
	export let icon;
	export let formData;
	export let prefix = undefined;
	export let type = 'text';
	export let placeholder = '';
</script>

<div class="mb-2">
	<label
		class="input input-bordered flex items-center gap-2 {$errors[name]
			? 'input-error'
			: ''} {$theme === 'light' ? 'bg-white' : 'bg-base-100'}"
	>
		{#if icon}
			<svelte:component this={icon} />
		{/if}
		{#if prefix}
			{prefix}
		{/if}
		{#if type === 'number'}
			<input
				type="number"
				{name}
				class="max-w-xs join-item grow"
				placeholder={placeholder || label}
				bind:value={$formData[name]}
			/>
		{:else}
			<input
				type="text"
				{name}
				class="max-w-xs join-item grow"
				placeholder={placeholder || label}
				bind:value={$formData[name]}
			/>
		{/if}
	</label>
	{#if $errors[name]}
		<span class="text-red-600 label-text-alt">{$errors[name]}</span>
	{/if}
</div>
