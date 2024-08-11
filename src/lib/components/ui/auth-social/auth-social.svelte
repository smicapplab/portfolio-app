<script>
	import GoogleSign from './google-sign.svelte';
	import FacebookSign from './fb-sign.svelte';
	import AppleSign from './apple-sign.svelte';
	import GithubSign from './github-sign.svelte';

	let className = '';
	export { className as class };

	export let isLoading = false;
</script>

<div class={className}>
	<form method="POST" class="flex flex-col space-y-4">
		<FacebookSign {isLoading} />
		<!-- <AppleSign {isLoading} /> -->
		<GoogleSign {isLoading} />
		<GithubSign {isLoading} />
	</form>
</div>
