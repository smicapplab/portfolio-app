<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { cn } from '$lib/utils';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registrationFormSchema } from '$lib/schemas/profile';
	import Divider from '../ui/divider/divider.svelte';
	import AuthSocial from '../ui/auth-social/auth-social.svelte';
	import { Icons } from '../icons';

	let isLoading = false;
	let showPassword = false;

	export let data = $$props;
	const form = superForm(data, {
		validators: zodClient(registrationFormSchema),
		onSubmit: () => {
			isLoading = true;
		},
		onResult: (result) => {
			isLoading = false;
			const { result: formResult } = result;
			console.log(formResult);
		}
	});

	const { form: formData, enhance } = form;

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};
</script>

<div class={cn('grid gap-6', data)}>
	<form method="POST" class="grid gap-2" use:enhance action="?/registration">
		<Form.Field {form} name="firstName">
			<Form.Control let:attrs>
				<Label>First Name</Label>
				<Input {...attrs} bind:value={$formData.firstName} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="lastName">
			<Form.Control let:attrs>
				<Label>Last Name</Label>
				<Input {...attrs} bind:value={$formData.lastName} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Label>Email</Label>
				<Input {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Label>Password</Label>
				<div class="flex items-center w-full max-w-sm space-x-2">
					<Input
						{...attrs}
						bind:value={$formData.password}
						type={showPassword ? 'text' : 'password'}
					/>
					<Button
						type="button"
						class={cn(
							'disabled:pointer-events-none disabled:opacity-50',
							'bg-secondary text-secondary-foreground hover:bg-secondary/80',
							data
						)}
						on:click={togglePasswordVisibility}
					>
						{#if showPassword}
							<Icons.eyeOff />
						{:else}
							<Icons.eye />
						{/if}
					</Button>
				</div>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="mobile">
			<Form.Control let:attrs>
				<Label>Mobile Number</Label>
				<Input {...attrs} bind:value={$formData.mobile} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<p class="text-[0.7rem]">
			By creating an account, you agree to the Terms of Service. For more information about this
			site's privacy practices, see the Privacy Statement. We'll occasionally send you
			account-related emails.
		</p>
		<Form.Button disabled={isLoading}>
			{#if isLoading}
				<Icons.loaderPinwheel class="animate-spin" />
			{:else}
				Sign Up with Email
			{/if}
		</Form.Button>
	</form>
	<Divider dividerLabel="Or sign in with" />
	<AuthSocial {isLoading} />
</div>
