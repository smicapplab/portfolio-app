<script>
	import Graphics from '$lib/components/sections/portfolio/graphics.svelte';
	import FullBody from '$lib/components/sections/portfolio/illustrations/full-body.svelte';
	import Headshots from '$lib/components/sections/portfolio/illustrations/headshots.svelte';
	import Illustrations from '$lib/components/sections/portfolio/illustrations/illustrations.svelte';
	import Intern from '$lib/components/sections/portfolio/intern/intern.svelte';
	import Tiktok from '$lib/components/sections/portfolio/intern/tiktok.svelte';

	let activeTab = 0;
	const toggleMenu = (/** @type {number} */ tab) => {
		activeTab = tab;
	};
</script>

<div class="z-10 flex justify-center w-full py-10">
	<ul
		class="fixed text-white shadow-lg l top-30 menu menu-horizontal z-100 rounded-box bg-base-200"
	>
		<li>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-missing-attribute -->
			<a
				aria-label="graphics"
				class="btn {activeTab === 0 ? 'btn-secondary ' : 'btn-ghost'}"
				on:click={() => toggleMenu(0)}>Graphics/Videos</a
			>
		</li>
		<li>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-missing-attribute -->
			<a
				class="btn {activeTab === 1 ? 'btn-secondary ' : 'btn-ghost'}"
				on:click={() => toggleMenu(1)}>Illustrations</a
			>
		</li>
		<li>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-missing-attribute -->
			<a
				class="btn {activeTab === 2 ? 'btn-secondary ' : 'btn-ghost'}"
				on:click={() => toggleMenu(2)}>Internship Works</a
			>
		</li>
	</ul>
</div>

{#if activeTab === 0}
	<Graphics />
{/if}

{#if activeTab === 1}
	<Illustrations />
	<FullBody />
	<Headshots />
{/if}

{#if activeTab === 2}
	<Intern />
	<Tiktok />
{/if}
