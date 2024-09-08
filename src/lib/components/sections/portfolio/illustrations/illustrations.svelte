<script>
	import { theme } from '$lib/stores/theme';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';
	import { Icons } from '$lib/components/icons';

	let show = false;
	/**
	 * @type {Element}
	 */
	let sectionRef;
	/**
	 * @type {null}
	 */
	let selectedImage = null;

	/**
	 * @type {(any | string)[]}
	 */
	const illustrations = [];

	/**
	 * @type {string | any[]}
	 */
	let visibleCards = [];
	let imagesLoaded = false;

	// Trigger animation when section is in view
	onMount(() => {
		for (let i = 1; i < 6; i++) {
			illustrations.push(`${assets}/images/portfolio/illustrations/${i}.png`);
		}

		preloadImages(illustrations);

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

		observer.observe(sectionRef);
	});

	function animateCards() {
		let delay = 0;
		const interval = setInterval(() => {
			if (visibleCards.length < illustrations.length) {
				visibleCards = [...visibleCards, illustrations[visibleCards.length]];
			} else {
				clearInterval(interval);
			}
		}, 150);
	}

	/**
	 * @param {any} image
	 */
	function openModal(image) {
		selectedImage = image;
	}

	function closeModal() {
		selectedImage = null;
	}

	/**
	 * @param {{ key: string; }} event
	 * @param {any} image
	 */
	function handleKeydown(event, image) {
		if (event.key === 'Enter' || event.key === ' ') {
			openModal(image);
		}
	}

	/**
	 * @param {any[]} images
	 */
	function preloadImages(images) {
		let loadedCount = 0;
		images.forEach((src) => {
			const img = new Image();
			img.onload = () => {
				loadedCount++;
				if (loadedCount === images.length) {
					imagesLoaded = true;
					if (show) {
						animateCards();
					}
				}
			};
			img.src = src;
		});
	}
</script>

<section
	bind:this={sectionRef}
	class="justify-center py-10 {$theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}"
>
	<div class="container p-4 mx-auto">
		<div
			class="justify-center h-auto py-5 text-4xl font-bold text-center section-label lg:text-left lg:text-5xl"
		>
			Illustrations
		</div>
		{#if imagesLoaded && show}
			<div class="lg:col-span-2">
				<div class="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 xl:grid-cols-3">
					{#each visibleCards as photo, i (i)}
						<div
							class="h-[300px] w-full overflow-hidden rounded-xl shadow-lg"
							in:fly={{ x: 100, duration: 500, easing: cubicOut }}
						>
							<button
								class="w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-300"
								on:click={() => openModal(photo)}
								on:keydown={(e) => handleKeydown(e, photo)}
							>
								<img src={photo} alt="photo-{i}" class="object-cover object-center w-full h-full" />
							</button>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="flex h-[calc(100vh-200px)] items-center justify-center lg:col-span-2">
				<span class="loading loading-spinner loading-lg"></span>
			</div>
		{/if}
	</div>
</section>

{#if selectedImage}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-100"
		on:keydown={(e) => e.key === 'Escape' && closeModal()}
		tabindex="-1"
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="relative inline-block">
			<img src={selectedImage} alt={selectedImage} class="object-contain max-w-full max-h-screen" />
			<button
				class="absolute text-white bg-black btn btn-circle right-4 top-4"
				on:click={closeModal}
			>
				<Icons.x />
			</button>
		</div>
	</div>
{/if}

<style>
	section {
		min-height: 50vh;
	}
</style>
