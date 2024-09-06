<script>
	import { removeToast, toasts, ToastType } from '$lib/stores/toastStores';

	export let horizontal = 'center';
	export let vertical = 'top';

	// @ts-ignore
	const getAlignmentClass = ({ horizontal, vertical }) => {
		const horizontalAlignment = horizontal || 'center';
		const verticalAlignment = vertical || 'top';

		const horizontalClass =
			horizontalAlignment === 'left'
				? 'toast-start'
				: horizontalAlignment === 'right'
					? 'toast-end'
					: 'toast-center';

		const verticalClass =
			verticalAlignment === 'top'
				? 'toast-top'
				: verticalAlignment === 'bottom'
					? 'toast-bottom'
					: 'toast-middle';

		return `${verticalClass} ${horizontalClass}`;
	};

	// @ts-ignore
	const getPath = (type) => {
		switch (type) {
			case ToastType.success:
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`;
			case ToastType.warning:
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`;
			case ToastType.info:
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
			case ToastType.error:
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />`;
			default:
				return `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z" />`;
		}
	};

	// @ts-ignore
	const getScheme = (type) => {
		switch (type) {
			case ToastType.success:
				return `text-white alert alert-success`;
			case ToastType.warning:
				return `text-white alert alert-warning`;
			case ToastType.info:
				return `text-black alert alert-info`;
			case ToastType.error:
				return `text-white alert alert-error`;
		}
	};
</script>

<div
	class={`toast z-100 ${getAlignmentClass({
		horizontal,
		vertical
	})}`}
>
	{#each $toasts as toast, index}
		<div
			class="{getScheme(toast.type)} flex w-full max-w-md items-start space-x-2 overflow-auto p-2"
		>
			<svg
				aria-labelledby="koredor-toast-{index}"
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 h-6 stroke-current shrink-0"
				fill="none"
				viewBox="0 0 24 24"
			>
				{@html getPath(toast.type)}
			</svg>
			<span class="flex-1 break-words whitespace-normal">{toast.message}</span>
			<button
				aria-label="close={index}"
				on:click={() => removeToast(toast.id)}
				class="ml-auto btn btn-circle btn-ghost btn-sm"
			>
				&times;
			</button>
		</div>
	{/each}
</div>

<style>
	.toast {
		position: fixed;
		display: flex;
		flex-direction: column;
		right: 10px;
		width: 300px;
		max-width: 100%;
	}

	.toast-start {
		align-items: flex-start;
	}

	.toast-end {
		align-items: flex-end;
	}

	.toast-center {
		align-items: center;
	}

	.toast-top {
		justify-content: flex-start;
	}

	.toast-middle {
		justify-content: center;
	}

	.toast-bottom {
		justify-content: flex-end;
	}

	.toast > div {
		display: flex;
		flex-wrap: wrap;
		word-wrap: break-word; /* Forces long words to wrap */
		overflow-wrap: anywhere; /* Break lines at any point */
		max-width: 100%;
	}

	.break-words {
		overflow-wrap: anywhere;
		word-break: break-word; /* Break long words */
		white-space: normal; /* Allow text to wrap normally */
	}
</style>
