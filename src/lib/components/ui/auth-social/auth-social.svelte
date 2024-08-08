<script>
	import GoogleSign from './google-sign.svelte';
	import FacebookSign from './fb-sign.svelte';
	import AppleSign from './apple-sign.svelte';
	import GithubSign from './github-sign.svelte';

	export let isLoading = false;
</script>

<FacebookSign {isLoading} />
<AppleSign {isLoading} />
<GoogleSign {isLoading} />
<GithubSign {isLoading} />