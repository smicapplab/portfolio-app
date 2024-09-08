<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { navItems } from './navigation';
	import { browser } from '$app/environment';
	import ThemeSwitcher from '../../theme-switcher/theme-switcher.svelte';
	import { theme } from '$lib/stores/theme';
	import { Icons } from '$lib/components/icons';
	import { assets } from '$app/paths';

	let isScrolled = false;

	const handleScroll = () => {
		if (browser) {
			isScrolled = window.scrollY > 0;
		}
	};

	function downloadCV() {
		// Assuming your CV is named "cv.pdf" and is in the "static" folder
		const link = document.createElement('a');
		link.href = `${assets}/Beanca-Torrefranca.pdf`; // This path is relative to your public directory
		link.download = 'Beanca-Torrefranca.pdf'; // The name the file will have when downloaded
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});
</script>

<div
	class="navbar fixed top-0 z-100 shadow-md {$theme === 'light'
		? 'bg-white'
		: 'bg-black'} bg-opacity-70 backdrop-blur-sm"
>
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden" aria-label="Toggle Menu">
				<Icons.menu color={$theme === 'light' ? '#000' : '#fff'} />
			</div>
			<ul
				class="menu dropdown-content menu-md z-[1] mt-3 w-56 rounded-box shadow {$theme === 'light'
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
				<li>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a
						href="#"
						on:click|preventDefault={downloadCV}
						class="btn btn-ghost flex w-full justify-start text-left {$theme === 'light'
							? 'text-black'
							: 'text-white'}">Download CV</a
					>
				</li>
			</ul>
		</div>
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
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a
					href="#"
					on:click|preventDefault={downloadCV}
					class={$theme === 'light' ? 'text-black' : 'text-white'}>Download CV</a
				>
			</li>
		</ul>
	</div>
	<div class="navbar-end">
		<ThemeSwitcher />
	</div>
</div>
