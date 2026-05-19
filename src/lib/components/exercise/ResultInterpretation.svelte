<script lang="ts">
	import { inlineMath } from '$lib/data2/types';

	interface Props {
		interpretation: string;
	}

	let { interpretation }: Props = $props();
	let expanded = $state(false);
</script>

<div class="bg-[#fafbff] border border-indigo-100/80 rounded-3xl p-6 lg:p-8 shadow-sm transition-all">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div role="button" class="flex items-center gap-4 w-full text-left cursor-pointer group" onclick={() => expanded = !expanded}>
		<div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200/50 group-hover:scale-105 transition-transform">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 18h6" />
				<path d="M10 22h4" />
				<path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.45.62 2.84 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
			</svg>
		</div>
		<h3 class="text-indigo-700 font-bold text-[17px] tracking-tight shrink-0 group-hover:text-indigo-800 transition-colors">Interpretation</h3>
		<div class="flex-1 h-px bg-indigo-200/50 ml-2"></div>
		<div class="shrink-0 text-indigo-400 group-hover:text-indigo-600 transition-colors">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform duration-200" class:rotate-180={expanded} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="m6 9 6 6 6-6"/>
			</svg>
		</div>
	</div>

	{#if expanded}
		<div class="mt-5 text-slate-700 leading-relaxed text-[15px] pl-0 sm:pl-14 pr-2">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html inlineMath(interpretation)}
		</div>
	{/if}
</div>