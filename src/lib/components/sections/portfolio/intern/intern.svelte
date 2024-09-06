<script>
	// @ts-nocheck

	import { theme } from '$lib/stores/theme';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';
	
	let show = false;
	let sectionRef;
	let selectedMedia = null;

	const internships = [
		`${assets}/images/portfolio/internship/1.png`,
		`${assets}/images/portfolio/internship/2.png`,
		`${assets}/images/portfolio/internship/3.png`,
		`${assets}/images/portfolio/internship/4.mp4`,
		`${assets}/images/portfolio/internship/5.png`,
		`${assets}/images/portfolio/internship/6.jpg`,
		`${assets}/images/portfolio/internship/7.mp4`,
		`${assets}/images/portfolio/internship/8.png`
	];

	let visibleCards = [];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						show = true;
						animateCards();
						observer.unobserve(entry.target);
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
			if (visibleCards.length < internships.length) {
				visibleCards = [...visibleCards, internships[visibleCards.length]];
			} else {
				clearInterval(interval);
			}
		}, 150);
	}

	function openModal(media) {
		selectedMedia = media;
	}

	function closeModal() {
		console.log('>>>>>> Close <<<<<<');
		selectedMedia = null;
	}

	function handleKeydown(event, media) {
		if (event.key === 'Enter' || event.key === ' ') {
			openModal(media);
		}
	}

	function isVideo(file) {
		return file.toLowerCase().endsWith('.mp4');
	}

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
			Student Internship Works
		</div>
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
								<video src={media} class="object-cover object-center w-full h-full" controls>
									<track kind="captions" />
									Your browser does not support the video tag.
								</video>
							{:else}
								<img src={media} alt="media-{i}" class="object-cover object-center w-full h-full" />
							{/if}
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

{#if selectedMedia}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-100"
		on:click={closeModal}
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
				<video src={selectedMedia} controls class="object-contain max-w-full max-h-full">
					Your browser does not support the video tag.
				</video>
			{:else}
				<img src={selectedMedia} alt={selectedMedia} class="object-contain max-w-full max-h-full" />
			{/if}
		</div>
	</div>
{/if}

<style>
	section {
		min-height: 50vh;
	}
</style>
