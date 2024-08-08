<script>
	import { cn } from '$lib/utils';
	import { primaryRoutes } from '../../../../routes/(secured)/dashboard/config';
	import Button from '../button/button.svelte';
	
	export let isCollapsed = false;


</script>

<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
	<nav
		class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
	>
		{#each primaryRoutes as route}
			{#if isCollapsed}
				<Button
					href="#"
					variant={route.variant}
					size="icon"
					class={cn(
						'size-9',
						route.variant === 'default' &&
							'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
					)}
				>
					<i class={cn('fa', route.icon)}></i>
				</Button>
			{:else}
				<Button
					href="#"
					variant={route.variant}
					class={cn('justify-start', {
						'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white':
							route.variant === 'default'
					})}
				>
					<i class={cn('fa', route.icon)}></i>
					<span class="pl-5">{route.title}</span>
					{#if route.label}
						<span
							class={cn('ml-auto', {
								'text-background dark:text-white': route.variant === 'default'
							})}
						>
							{route.label}
						</span>
					{/if}
				</Button>
			{/if}
		{/each}
	</nav>
</div>
