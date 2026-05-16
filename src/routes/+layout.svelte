
<script lang="ts">
	import './layout.css';
	import 'katex/dist/katex.min.css';
	import favicon from '$lib/assets/favicon.svg';

	import Sidebar from '$lib/components/Sidebar.svelte';
	let { children } = $props();
</script>

<div class="flex h-screen overflow-hidden bg-white text-slate-900 font-sans">
	<Sidebar />

	<main class="flex-1 overflow-y-auto bg-slate-50 p-8">
		{@render children()}
	</main>
</div>