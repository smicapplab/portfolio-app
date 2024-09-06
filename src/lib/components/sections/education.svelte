<script>
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let show = false;

	const educations = [
		{
			school: 'De La Salle-College of Saint Benilde',
			dates: 'Jun 2019 - Feb 2024',
			course: 'Bachelors in Multimedia Arts',
			description: [
				'Produced three educational videos for Paaralang Elementaryang P. Villanueva',
				'Spearheaded a rebranding project, boosting brand visibility and online engagement',
				'Led the Website Development team, creating design elements and social media posts',
				'Developed and contributed artwork and articles to an online magazine for a thesis project'
			]
		},
		{
			school: 'O.B. Montessori Center Inc.',
			dates: 'Jan 2018 - Dec 2018',
			course: 'High School',
			description: [
				'Led the layout design for a school project magazine',
				'Conceptualized and executed two festival booths for the annual school event',
				'Directed video production for Buwan ng Wika and other group video projects'
			]
		}
	];

	onMount(() => {
		show = true;
	});
</script>

{#if show}
	<section
		in:fly={{ x: -300, duration: 800, easing: cubicOut }}
		class="flex items-center justify-center py-10 {$theme === 'light' ? 'bg-white' : 'bg-black'}"
	>
		<div class="container p-4 mx-auto">
			<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
				<div
					class="justify-center h-auto pt-5 text-4xl font-bold text-center section-label lg:text-left lg:text-5xl"
				>
					Education
				</div>
				<div class="lg:col-span-2">
					{#each educations as education}
						<div
							class="experience m-5 rounded-lg border border-black p-5 {$theme === 'light'
								? 'bg-white'
								: 'bg-black'}"
						>
							<h2 class="text-xl font-bold lg:text-2xl">
								{education.school} - {education.dates}
							</h2>
							<h3 class="pb-5 font-bold">{education.course}</h3>
							<ul class="list-disc list-inside">
								{#each education.description as description}
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
