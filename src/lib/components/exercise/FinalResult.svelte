<script lang="ts">

	import { math } from '$lib/actions/math';

	interface Props {
		finalResultText?: string;
		finalResultMath?: string;

	}

	let {  finalResultText, finalResultMath }: Props = $props();
	let isRevealed = $state(false);


</script>
<div class="mt-4 p-6 lg:p-8 bg-[#f6fcf8] border border-emerald-100/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
	<div class="flex items-start sm:items-center gap-6">
		<div class="w-14 h-14 rounded-full bg-emerald-100/50 flex items-center justify-center shrink-0">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
				<path d="M5 12l5 5L20 7" />
			</svg>
		</div>

		<div class="flex flex-col gap-1">
			<span class="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Ergebnis</span>
			{#if isRevealed}
				<div class="animate-in fade-in flex flex-col gap-2 mt-1">
					<!--{#if finalResultText}-->
					<!--	<span class="text-[15px] text-slate-700 leading-relaxed font-medium">{finalResultText}</span>-->
					<!--{/if}-->
					{#if finalResultMath}
						<span class="text-2xl text-emerald-800 font-bold [&_.katex-display]:!m-0 [&_.katex-display]:!inline-block mt-1">
							<span use:math={finalResultMath}></span>
						</span>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="shrink-0 self-start sm:self-center ml-20 sm:ml-0">
		{#if !isRevealed}
			<button
				onclick={() => {isRevealed = true}}
				class="px-5 py-2.5 bg-emerald-100/60 hover:bg-emerald-200/60 border border-emerald-200/60 text-emerald-800 text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"/>
					<path d="M12 16v-4"/>
					<path d="M12 8h.01"/>
				</svg>
				Lösung prüfen
			</button>
		{:else}
			<button
				onclick={() => {isRevealed = false}}
				class="px-5 py-2.5 bg-emerald-100/60 hover:bg-emerald-200/60 border border-emerald-200/60 text-emerald-800 text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
					<path d="M22 4L12 14.01l-3-3"/>
				</svg>
				Lösung verbergen
			</button>
		{/if}
	</div>
</div>