<script>
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let show = false;

	const experiences = [
		{
			company: 'Jacinto & Lirio',
			dates: 'June 2024 - Aug 2024',
			role: 'Student Intern',
			description: [
				'Designed daily social media content for Facebook and Instagram, producing two TikTok videos per day',
				'Increased TikTok profile and video views by 70% after taking over content management',
				'Collaborated seamlessly with the marketing team to meet daily graphic design needs'
			]
		},
		{
			company: 'O.B. Montessori Center Inc.',
			dates: 'Jan 2022 - Sept 2023',
			role: 'Student',
			description: [
				'Assisted with food service during the Grade 6 Food Fair',
				'Led the creative direction for an Entrepreneur Fair booth, managing all aspects of design and execution'
			]
		}
	];

	onMount(() => {
		show = true;
	});
</script>

{#if show}
	<section
		in:fly={{ x: 300, duration: 800, easing: cubicOut }}
		class="flex items-center justify-center py-10 {$theme === 'light'
			? 'bg-gray-100'
			: 'bg-pink-800'}"
	>
		<div class="container p-4 mx-auto">
			<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
				<div
					class="justify-center h-auto pt-5 text-4xl font-bold text-center section-label lg:text-left lg:text-5xl"
				>
					WORK EXPERIENCE
				</div>
				<div class="lg:col-span-2">
					{#each experiences as experience}
						<div
							class="experience m-5 rounded-lg border border-black p-5 {$theme === 'light'
								? 'bg-white'
								: 'bg-black'}"
						>
							<h2 class="text-xl font-bold lg:text-2xl">
								{experience.company} - {experience.dates}
							</h2>
							<h3 class="pb-5 font-bold">{experience.role}</h3>
							<ul class="list-disc list-inside">
								{#each experience.description as description}
									<li>
										{description}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}
