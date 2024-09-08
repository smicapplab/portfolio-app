<script>
	// @ts-nocheck

	import { theme } from '$lib/stores/theme';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';
	import { Icons } from '../../icons';

	let show = false;
	/**
	 * @type {Element}
	 */
	let sectionRef;
	let selectedImage = null;
	let imagesLoaded = false;

	const events = [
		{
			name: 'Cosplay Matsuri',
			date: 'Dec 28-30, 2023',
			venue: 'SMX Convention Center',
			poster: `${assets}/images/events/matsuri.jpg`
		},
		{
			name: 'TwinFlames',
			date: 'Feb 17-18, 2024',
			venue: 'Ayala Malls 30th',
			poster: `${assets}/images/events/twin.jpg`
		},
		{
			name: 'Cosplay Carnival',
			date: 'March 23-24, 2024',
			venue: 'SMX Convention Center',
			poster: `${assets}/images/events/carnival.jpg`
		},
		{
			name: 'Fanfes',
			date: 'May 18-19, 2024',
			venue: 'Space at One Ayala',
			poster: `${assets}/images/events/fanfes.jpg`
		},
		{
			name: 'YaoiExpo',
			date: 'Sept 21-22, 2024',
			venue: 'Pasig Bayanihan Center',
			poster: `${assets}/images/events/yaoi.jpg`
		}
	];

	/**
	 * @type {string | any[]}
	 */
	let visibleCards = [];

	function preloadImages() {
		let loadedCount = 0;
		const totalImages = events.length;

		events.forEach((event) => {
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
			img.src = event.poster;
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

		observer.observe(sectionRef);
	});

	function animateCards() {
		let delay = 0;
		const interval = setInterval(() => {
			if (visibleCards.length < events.length) {
				visibleCards = [...visibleCards, events[visibleCards.length]];
			} else {
				clearInterval(interval);
			}
		}, 150);
	}

	function openModal(image) {
		selectedImage = image;
	}

	function closeModal() {
		selectedImage = null;
	}

	function handleKeydown(event, image) {
		if (event.key === 'Enter' || event.key === ' ') {
			openModal(image);
		}
	}

	/**
	 * @param {{ key: string; }} event
	 */
	function handleModalKeydown(event) {
		if (event.key === 'Escape') {
			closeModal();
		}
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
			Events
		</div>
		<div class="lg:col-span-2">
			<span>
				During multiple conventions and events, I successfully organized and managed booths at major
				gatherings, including Cosplay Matsuri 2023, TwinFlames 2024, Cosplay Carnival 2024, Fanfes
				2024, and YaoiExpo 2024. By overseeing the creation of custom fan-made merchandise and
				handling all logistics, I ensured smooth operations while significantly boosting brand
				visibility. My efforts resulted in a 200% return on investment, doubling the initial
				expenditure on materials and booth rental. Additionally, I developed an online catalog to
				engage customers, which expanded market reach through social media as buyers shared their
				merchandise hauls and tagged our brand.
			</span>
			{#if imagesLoaded && show}
				<div class="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 xl:grid-cols-3">
					{#each visibleCards as event, i (event.name)}
						<div
							class="w-auto overflow-hidden shadow-xl card card-compact bg-base-100"
							in:fly={{ x: 100, duration: 500, easing: cubicOut }}
						>
							<button
								class="w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-blue-300"
								on:click={() => openModal(event.poster)}
								on:keydown={(e) => handleKeydown(e, event.poster)}
							>
								<figure class="w-full h-60">
									<img src={event.poster} alt={event.name} class="object-cover w-full h-full" />
								</figure>
								<div class="text-white card-body">
									<h2 class="card-title">{event.name}</h2>
									<p>{event.date} at {event.venue}</p>
								</div>
							</button>
						</div>
					{/each}
				</div>
			{:else}
				<div class="flex h-[calc(100vh-200px)] items-center justify-center lg:col-span-2">
					<span class="loading loading-spinner loading-lg"></span>
				</div>
			{/if}
		</div>
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
		min-height: 80vh;
	}
</style>
