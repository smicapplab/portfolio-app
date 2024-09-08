<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/ui/layout/navbar/navbar.svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import Toast from '$lib/components/ui/toast/toast.svelte';
	import { page } from '$app/stores';
	import { assets } from '$app/paths';

	// You can make these dynamic if needed
	let siteTitle = 'Beanca Torrefranca | Multimedia Artist & Content Creator Portfolio';
	let siteDescription = 'Explore the portfolio of Beanca Torrefranca, a versatile Multimedia Arts graduate specializing in graphic design, social media management, and event organization. View projects in illustration, video production, and brand revitalization.';
	let siteKeywords = 'Beanca Torrefranca, Multimedia Arts, Graphic Design, Social Media Content, Event Organization, Portfolio, TikTok Creator, Adobe Illustrator, Procreate, Figma';
	let siteImage = `${assets}/images/bea.jpg`;

	onMount(async () => {
		if (browser) {
			theme.initialize();

			const link = document.createElement('link');
			link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap';
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

<svelte:head>
	<title>{siteTitle}</title>
	<meta name="description" content={siteDescription} />
	<meta name="keywords" content={siteKeywords} />
	<meta name="author" content="Beanca Torrefranca" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={siteTitle} />
	<meta property="og:description" content={siteDescription} />
	<meta property="og:image" content={siteImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content={siteTitle} />
	<meta name="twitter:description" content={siteDescription} />
	<meta name="twitter:image" content={siteImage} />

	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<div
	class="h-screen {$theme === 'light'
		? 'bg-white text-black'
		: 'bg-black text-white'} leading-normal"
>
	<Navbar />
	<Toast />
	<div class="pt-10 lg:pt-20">
		<slot></slot>
	</div>
</div>
