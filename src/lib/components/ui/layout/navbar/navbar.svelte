<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { navItems } from './navigation';
	import { browser } from '$app/environment';
	import ThemeSwitcher from '../../theme-switcher/theme-switcher.svelte';
	import { theme } from '$lib/stores/theme';
	import { Icons } from '$lib/components/icons';

	let isScrolled = false;

	const handleScroll = () => {
		if (browser) {
			isScrolled = window.scrollY > 0;
		}
	};

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});
</script>

<div class="navbar fixed top-0 z-100 shadow-md {$theme === 'light' ? 'bg-white' : 'bg-black'} bg-opacity-70 backdrop-blur-sm">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden" aria-label="Toggle Menu">
				<Icons.menu color={$theme === 'light' ? '#000' : '#fff'} />
			</div>
			<ul
				class="dropdown-content z-[1] mt-3 menu menu-md rounded-box w-56 shadow {$theme ===
				'light'
					? 'bg-white'
					: 'bg-black'}"
			>
				{#each navItems as navItem}
					<li>
						<a
							aria-label={navItem.name}
							href={navItem.href}
							class="btn btn-ghost flex w-full justify-start text-left {$theme === 'light'
								? 'text-black'
								: 'text-white'}"
						>
							{navItem.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<a class="btn btn-link" href="/" aria-label="logo-link">
			{#if isScrolled}
				<!-- <Icons.koredorwhite /> -->
			{:else}
				<!-- <Icons.koredor /> -->
			{/if}
		</a>
	</div>
	<div class="hidden navbar-center lg:flex">
		<ul class="px-1 menu menu-horizontal">
			{#each navItems as navItem, index}
				<li>
					<a
						href={navItem.href}
						class={$theme === 'light' ? 'text-black' : 'text-white'}
						aria-label={navItem.name}
					>
						{navItem.name}</a
					>
				</li>
			{/each}
		</ul>
	</div>
	<div class="navbar-end">
		<ThemeSwitcher />
	</div>
</div>

<!-- <style>
	ul.menu li details ul li a {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		height: 50px;
		max-width: 100%;
		line-height: 30px;
	}
	.menu.dropdown-content .p-2 li a {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		max-width: 100%;
		height: 50px;
		line-height: 40px;
	}
</style> -->
