<script>
	import { assets } from '$app/paths';
	import { onMount } from 'svelte';
	import { quartIn } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { Icons } from '../icons';
	const lines = ['Beanca', '', 'Espirito Santo', '', 'Torrefranca'];

	let show = false;
	onMount(() => {
		show = true;
	});
</script>

<section class="flex py-10">
	<div class="container p-4 mx-auto">
		<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
			<div class="text-4xl font-bold text-left lg:text-center lg:text-5xl">
				<div class="lines">
					{#each lines as line}
						<div class="overflow">
							<span class="line">
								{line}
							</span>
						</div>
					{/each}
					<div class="overflow">
						<div class="py-5 text-base font-light text-left line lg:px-10">
							Versatile Multimedia Arts graduate with hands-on experience in graphic design, social
							media content creation, and event management. Demonstrated success in increasing
							social media engagement and managing profitable merchandise booths at conventions.
							Skilled in various design software and adept at collaborating with teams to produce
							creative content. Combines strong technical abilities with excellent communication
							skills to deliver effective visual solutions and engaging customer experiences.
						</div>
					</div>
					<div class="w-full overflow">
						<div
							class="flex items-center justify-center w-full py-5 space-x-4 text-base font-normal text-center line"
						>
							<a class="btn btn-ghost" href="https://www.linkedin.com/in/bea-torrefranca-006ba12a1" target="blank" aria-label="link-linkedin"><Icons.linkedin /></a>
							<a class="btn btn-ghost" href="https://www.facebook.com/LunarKurapika" target="blank" aria-label="link-fb"><Icons.facebook /></a>
							<a class="btn btn-ghost" href="https://www.instagram.com/beanca_franca/" aria-label="link-instagram"><Icons.instagram /></a>
							<a class="btn btn-ghost" href="mailto:torrefrancabeanca@gmail.com" aria-label="link-email"><Icons.email /></a>
							<a class="btn btn-ghost" href="tel:+639484146382" aria-label="link-phone"><Icons.phone /></a>
						</div>
					</div>
				</div>
			</div>
			<div
				class="flex items-center justify-center h-auto pt-5 text-4xl font-bold text-center lg:text-left lg:text-5xl"
			>
				{#if show}
					<img
						in:fly={{ duration: 800, easing: quartIn }}
						src="{assets}/images/bea.jpg"
						alt="Beanca"
						class="w-1/2 rounded-full lg:w-2/3"
					/>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.overflow {
		display: inline-block;
		overflow: hidden;
		vertical-align: bottom;
	}

	.line {
		display: inline-block;
		margin: 0.2rem;
		animation: reveal 0.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s forwards;
		transform: translateY(100%);
	}

	@keyframes reveal {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	/* Stagger the animation for each line */
	.overflow:nth-child(1) .line {
		animation-delay: 0.1s;
	}
	.overflow:nth-child(3) .line {
		animation-delay: 0.2s;
	}
	.overflow:nth-child(5) .line {
		animation-delay: 0.3s;
	}
	.overflow:nth-child(6) .line {
		animation-delay: 0.4s;
	}

	.overflow:nth-child(7) .line {
		animation-delay: 0.5s;
	}
</style>
