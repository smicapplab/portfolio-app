<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/ui/layout/navbar/navbar.svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import Toast from '$lib/components/ui/toast/toast.svelte';

	onMount(async () => {
		if (browser) {
			theme.initialize();

			const link = document.createElement('link');
			link.href =
				'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap';
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.media = 'all';
			link.onload = () => {
				document.body.classList.add('font-loaded');
			};
			document.head.appendChild(link);
		}
	});
</script>

<div class="h-screen {$theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'} leading-normal">
	<Navbar />
	<Toast />
	<div class="pt-10 lg:pt-20">
		<slot></slot>
	</div>
</div>
