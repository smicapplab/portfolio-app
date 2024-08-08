<script>
	import '../../app.css';
	import MainAppBar from '$lib/components/ui/mainappbar/main-app-bar.svelte';
	import MainSideBar from '$lib/components/ui/mainsidebar/main-side-bar.svelte';

	import * as Resizable from '$lib/components/ui/resizable/index.js';

	let isCollapsed = false;

	/**
	 * Handles the layout change by updating the document cookie with the new sizes.
	 *
	 * @param {number[]} sizes - An array of numbers representing the layout sizes.
	 */
	function onLayoutChange(sizes) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:collapsed=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}
</script>

<MainAppBar />
<div class="flex flex-col w-screen h-screen">
	<Resizable.PaneGroup direction="horizontal" class="flex-grow w-full h-full">
		<Resizable.Pane
			collapsedSize={3}
			collapsible
			defaultSize={15}
			minSize={10}
			maxSize={20}
			{onCollapse}
			{onExpand}
		>
			<MainSideBar {isCollapsed} />
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={85}>
			<slot></slot>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
