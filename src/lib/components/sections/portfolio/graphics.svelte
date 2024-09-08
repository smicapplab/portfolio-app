<script>
	import { theme } from '$lib/stores/theme';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';
	import { isVideo } from '$lib/util';
	import { Icons } from '$lib/components/icons';

	let show = false;
	/**
	 * @type {Element}
	 */
	let sectionRef;
	/**
	 * @type {null}
	 */
	let selectedMedia = null;
	let mediaLoaded = false;

	/**
	 * @type {(any | string)[]}
	 */
	const graphics = [];

	/**
	 * @type {string | any[]}
	 */
	let visibleCards = [];

	/**
	 * @param {any[]} mediaList
	 */
	function preloadMedia(mediaList) {
		let loadedCount = 0;
		mediaList.forEach((src) => {
			if (isVideo(src)) {
				const video = document.createElement('video');
				video.onloadeddata = handleLoaded;
				video.src = src;
			} else {
				const img = new Image();
				img.onload = handleLoaded;
				img.src = src;
			}
		});

		function handleLoaded() {
			loadedCount++;
			if (loadedCount === mediaList.length) {
				mediaLoaded = true;
				if (show) {
					animateCards();
				}
			}
		}
	}

	// Trigger animation when section is in view
	onMount(() => {
		for (let i = 1; i < 13; i++) {
			graphics.push(`${assets}/images/portfolio/graphics/${i}.png`);
		}
		graphics.push(`${assets}/images/portfolio/graphics/13.mp4`);

		preloadMedia(graphics);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						show = true;
						if (mediaLoaded) {
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
		const interval = setInterval(() => {
			if (visibleCards.length < graphics.length) {
				visibleCards = [...visibleCards, graphics[visibleCards.length]];
			} else {
				clearInterval(interval);
			}
		}, 150);
	}

	/**
	 * @param {any} media
	 */
	function openModal(media) {
		selectedMedia = media;
	}

	function closeModal() {
		selectedMedia = null;
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
	 * @param {{ stopPropagation: () => void; }} event
	 */
	function stopPropagation(event) {
		event.stopPropagation();
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
			Graphics/Videos
		</div>

		{#if mediaLoaded && show}
			<div class="lg:col-span-2">
				<div class="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 xl:grid-cols-3">
					{#each visibleCards as media, i (i)}
						<div
							class="h-[300px] w-full overflow-hidden rounded-xl shadow-lg"
							in:fly={{ x: 100, duration: 500, easing: cubicOut }}
						>
							<button
								class="w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-300"
								on:click={() => openModal(media)}
								on:keydown={(e) => handleKeydown(e, media)}
							>
								{#if isVideo(media)}
									<video src={media} class="object-cover object-center w-full h-full">
										<track kind="captions" />
										Your browser does not support the video tag.
									</video>
								{:else}
									<img
										src={media}
										alt="photo-{i}"
										class="object-cover object-center w-full h-full"
									/>
								{/if}
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

{#if selectedMedia}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-100"
		on:keydown={(e) => e.key === 'Escape' && closeModal()}
		tabindex="-1"
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="relative flex h-full max-h-[90vh] max-w-[90vw] items-center justify-center"
			on:click={stopPropagation}
		>
			{#if isVideo(selectedMedia)}
				<!-- svelte-ignore a11y-media-has-caption -->
				<div class="relative inline-block">
					<video src={selectedMedia} controls class="object-contain max-w-full max-h-screen">
						Your browser does not support the video tag.
					</video>
					<button
						class="absolute text-white bg-black btn btn-circle right-4 top-4"
						on:click={closeModal}
					>
						<Icons.x />
					</button>
				</div>
			{:else}
				<div class="relative inline-block">
					<img
						src={selectedMedia}
						alt={selectedMedia}
						class="object-contain max-w-full max-h-screen"
					/>
					<button
						class="absolute text-white bg-black btn btn-circle right-4 top-4"
						on:click={closeModal}
					>
						<Icons.x />
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	section {
		min-height: 80vh;
	}
</style>
