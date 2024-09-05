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
				'Created two TikTok videos per day',
				'Contributed to a 70% increase in video and profile views for the TikTok account',
				'Created two Facebook and Instagram content per day'
			]
		},
		{
			company: 'O.B. Montessori Center Inc.',
			dates: 'Jan 2022 - Sept 2023',
			role: 'Student',
			description: [
				'Assisted with food service during the Grade 6 Food Fair',
				'Led creative direction for an annual Entrepreneur Fair booth'
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
			? 'bg-base-200'
			: 'bg-pink-200'}"
	>
		<div class="container p-4 mx-auto">
			<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
				<div
					class="section-label h-auto justify-center pt-5 text-center text-4xl font-bold lg:text-left lg:text-5xl {$theme ===
					'light'
						? 'text-white'
						: 'text-black'}"
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
