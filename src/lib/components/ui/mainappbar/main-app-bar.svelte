<script>
	import { cn } from '$lib/utils';
	import { Icons } from '$lib/components/icons';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Icon } from 'lucide-svelte';

    let className = undefined;
	export { className as class };

	const logout = async () => {};
</script>

<div class="border-b">
	<div class="flex items-center h-16 px-4">
		<nav class={cn('flex items-center', className)}>
            <Icons.hamburger/>
			<a href="/dashboard" class="text-xl font-bold text-orange-700 transition-colors md:text-2xl hover:text-primary">
				Portfolio
			</a>
		</nav>
		<div class="flex items-center ml-auto">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar.Root class="cursor-pointer">
                        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
                        <Avatar.Fallback>CN</Avatar.Fallback>
                    </Avatar.Root>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Group>
                    <DropdownMenu.Label>My Account</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>Profile</DropdownMenu.Item>
                    <DropdownMenu.Item>Billing</DropdownMenu.Item>
                    <DropdownMenu.Item>Team</DropdownMenu.Item>
                    <DropdownMenu.Item>Subscription</DropdownMenu.Item>
                  </DropdownMenu.Group>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            <Avatar.Root></Avatar.Root>
		</div>
	</div>
</div>
