<script>
	import { Icons } from '$lib/components/icons';
	import Input from '$lib/components/ui/input/input.svelte';
	import { guestBookSchema } from '$lib/schemas/contact';
	import { theme } from '$lib/stores/theme';
	import { addToast, ToastType } from '$lib/stores/toastStores';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let data = {
		fullName: '',
		email: '',
		message: ''
	};

	let isLoading = false;

	const {
		form: formData,
		errors,
		enhance
	} = superForm(data, {
		validators: zodClient(guestBookSchema),
		dataType: 'json',
		onSubmit: () => {
			isLoading = true;
		},
		onResult: (result) => {
			isLoading = false;
			// @ts-ignore
			const { result: formResult } = result;
			if (formResult.type === 'success') {
				addToast(ToastType.success, 'Awesome! Thank you for leaving a message. ');
				// @ts-ignore
				$formData = {};
			} else {
				addToast(
					ToastType.error,
					'Oops! Something went wrong while submitting the form. Please check your details and try again.'
				);
			}
		}
	});
</script>

<section
	class="justify-center py-10 {$theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}"
>
	<div class="container p-4 mx-auto">
		<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
			<div
				class="justify-center h-auto pt-5 text-4xl font-bold text-center section-label lg:text-5xl"
			>
				Guestbook
				<p class="py-10 text-base font-normal text-left">
					I would love to hear from you! Please leave your contact details and any feedback or
					messages you’d like to share. Your thoughts help us improve and connect with you better!
				</p>
			</div>
			<div class="p-5 pl-10">
				<form method="POST" class="grid gap-2 py-5" use:enhance action="?/leaveMessage">
					<Input label="Full Name" name="fullName" {formData} {errors} icon={Icons.idCard} />
					<Input label="Email" name="email" {formData} {errors} icon={Icons.email} />

					<textarea 
						name="message"
						rows="10"
						class="textarea textarea-bordered {$errors.message ? 'textarea-error' : ''} {$theme ===
						'light'
							? 'bg-white'
							: 'bg-base-100'}"
						placeholder="Your Message"
						bind:value={$formData.message}
					></textarea>
					{#if $errors.message}
						<span class="text-red-600 label-text-alt">{$errors.message}</span>
					{/if}

					<button
						type="submit"
						class="btn mt-2 max-w-60 text-white {$theme === 'light'
							? 'btn-secondary'
							: 'btn-neutral'}"
						disabled={isLoading}
						aria-label="submit"
					>
						{#if isLoading}
							<span class="loading loading-dots loading-lg"></span>
						{:else}
							Submit <Icons.send />
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
