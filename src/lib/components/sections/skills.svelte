<script>
	import { assets } from '$app/paths';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let show = false;
	/**
	 * @type {Element}
	 */
	let sectionSkillsRef;
	let imagesLoaded = false;

	const proficientIn = [
		{ name: 'Adobe After Effects', logo: `${assets}/images/logos/after-effects.png` },
		{ name: 'Canva', logo: `${assets}/images/logos/canva.png` },
		{ name: 'Figma', logo: `${assets}/images/logos/figma.png` },
		{ name: 'Adobe Illustrator', logo: `${assets}/images/logos/illustrator.png` },
		{ name: 'Procreate', logo: `${assets}/images/logos/procreate.png` }
	];

	/**
	 * @type {string | any[]}
	 */
	let visibleCards = [];

	function preloadImages() {
		let loadedCount = 0;
		const totalImages = proficientIn.length;

		proficientIn.forEach((skill) => {
			const img = new Image();
			img.onload = () => {
				loadedCount++;
				if (loadedCount === totalImages) {
					imagesLoaded = true;
					if (show) {
						animateCards();
					}
				}
			};
			img.src = skill.logo;
		});
	}


	// Trigger animation when section is in view
	onMount(() => {
		preloadImages();
		
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						show = true;
						if (imagesLoaded) {
							animateCards();
						}
						observer.unobserve(entry.target); // Stop observing once triggered
					}
				});
			},
			{
				root: null,
				threshold: 0.5
			}
		);

		observer.observe(sectionSkillsRef);
	});

	function animateCards() {
		let delay = 0;
		const interval = setInterval(() => {
			if (visibleCards.length < proficientIn.length) {
				visibleCards = [...visibleCards, proficientIn[visibleCards.length]];
			} else {
				clearInterval(interval);
			}
		}, 150);
	}
</script>

<section
	bind:this={sectionSkillsRef}
	class="flex items-center justify-center py-10 {$theme === 'light'
		? 'bg-gray-100'
		: 'bg-pink-800'}"
>
	<div class="container p-4 mx-auto">
		<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
			<div
				class="justify-center h-auto pt-5 text-4xl font-bold text-center section-label lg:text-left lg:text-5xl"
			>
				Skills
			</div>
			<div class="p-5 pl-10 lg:col-span-2">
				<h2 class="text-xl font-bold lg:text-2xl">Proficient in</h2>
				{#if show}
					<div class="w-full min-h-36">
						<div class="grid grid-cols-3 gap-5 py-5 md:grid-cols-4 xl:grid-cols-5">
							{#each visibleCards as pre, i (pre.name)}
								<div class="w-auto max-w-24" in:fly={{ x: 100, duration: 500, easing: cubicOut }}>
									<div class="tooltip" data-tip={pre.name}>
										<img src={pre.logo} alt={pre.name} class="rounded-full shadow-xl" />
									</div>
								</div>
							{/each}
						</div>
					</div>
				{:else}
					<div class="w-full h-36"></div>
				{/if}

				<h2 class="mb-3 text-xl font-bold lg:text-2xl">Technical Skills</h2>
				<ul class="mb-5 list-disc list-inside">
					<li>Project Management</li>
					<li>Graphic Design</li>
					<li>Illustration</li>
					<li>Web Development</li>
				</ul>

				<h2 class="mb-3 text-xl font-bold lg:text-2xl">Soft Skills</h2>
				<ul class="mb-5 list-disc list-inside">
					<li>Multitasking</li>
					<li>Adaptability</li>
					<li>Leadership</li>
					<li>Communication</li>
					<li>Customer Service</li>
					<li>Task Delegation</li>
				</ul>

				<h2 class="mb-3 text-xl font-bold lg:text-2xl">Languages</h2>
				<ul class="mb-5 list-disc list-inside">
					<li>English</li>
					<li>Filipino</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		min-height: 50vh;
	}
</style>
