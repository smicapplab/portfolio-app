<script>
	// @ts-nocheck
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { tiktokLinks } from './tiktok';

	let videoInfo = [];
	let show = false;

	async function fetchVideoInfo() {
		const fetchedVideos = [];
		for (const link of tiktokLinks) {
			try {
				const response = await fetch(
					`https://www.tiktok.com/oembed?url=${encodeURIComponent(link)}`
				);
				const data = await response.json();
				fetchedVideos.push({
					url: link,
					thumbnail: data.thumbnail_url,
					title: data.title,
					author: data.author_name
				});
			} catch (error) {
				console.error('Error fetching video info:', error);
			}
		}
		videoInfo = fetchedVideos;
	}

	function openVideoInNewTab(url) {
		window.open(url, '_blank');
	}

	onMount(async () => {
		await fetchVideoInfo();
		show = true;
	});
</script>

<section
	class="justify-center py-10 {$theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}"
>
	<div class="container p-4 mx-auto">
		<div
			class="justify-center h-auto py-5 text-4xl font-bold text-center section-label lg:text-left lg:text-5xl"
		>
			TikTok
		</div>
		{#if show}
			<div class="lg:col-span-2">
				<div class="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 xl:grid-cols-3">
					{#each videoInfo as video, i}
						<div class="group relative h-[300px] w-full overflow-hidden rounded-xl shadow-lg">
							<button
								class="w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-300"
								on:click={() => openVideoInNewTab(video.url)}
							>
								<img
									src={video.thumbnail}
									alt="photo-{i}"
									class="object-cover object-center w-full h-full"
								/>
								<div
									class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
								>
									<span class="text-lg font-bold text-white">Play Video</span>
								</div>
							</button>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="flex h-[calc(100vh-200px)] flex-col items-center justify-center lg:col-span-2">
				<div class="mb-4">Fetching TikTok Metadata...</div>
				<div class="loading loading-spinner loading-lg"></div>
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		min-height: 50vh;
	}
</style>
