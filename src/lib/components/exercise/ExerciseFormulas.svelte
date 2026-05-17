<script lang="ts">
	import { math } from '$lib/actions/math';
	import type { Formula } from '$lib/data2/types';

	interface Props {
		formulas: Formula[];
	}

	let { formulas } : Props = $props();
	let isOpen = $state(false);

	// Speicher für die Breite der Formel-Karten-Elemente
	let cardWidths = $state<number[]>([]);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

{#if formulas && formulas.length > 0}
	<div class="mb-8">
		<button
			onclick={toggle}
			class="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg transition-colors border border-indigo-100"
		>
			💡 {isOpen ? 'Formel-Tipps ausblenden' : 'Tipp: Benötigte Formeln anzeigen'}
			<span class="text-lg leading-none transition-transform duration-200 {isOpen ? 'rotate-180' : ''}">
      ⌄
    </span>
		</button>

		{#if isOpen}
			<div class="mt-4 flex flex-col gap-6">
				{#each formulas as f, index}
					<div
						bind:clientWidth={cardWidths[index]}
						class="bg-white rounded-xl border border-slate-200 p-0 shadow-sm overflow-hidden"
					>

						<div class="bg-slate-50 border-b border-slate-200 px-6 py-4">
							<h4 class="text-lg font-bold text-slate-800 m-0">
								{f.name}
							</h4>
						</div>

						<div
							class="p-6 grid gap-8"
							class:grid-cols-1={!cardWidths[index] || cardWidths[index] < 650}
							class:grid-cols-[1.2fr_1fr]={cardWidths[index] >= 650}
						>

							<div class="flex flex-col items-center justify-center text-center w-full">

								<div class="flex flex-row items-center justify-center gap-2 text-indigo-900 font-bold text-[15px] mb-1 [&_.katex-display]:!m-0 [&_.katex-display]:!inline-block">
									<span use:math={f.result?.symbol}></span>
									<span>= {f.result.description}</span>
								</div>

								<div class="text-indigo-200 text-lg mb-4">↓</div>

								<div class="bg-slate-50/50 p-6 rounded-lg border border-slate-100 w-full shadow-inner">
									<div class="text-xl overflow-x-auto w-full text-center pb-2">
										<span use:math={f.math}></span>
									</div>
								</div>

							</div>

							<div
								class="flex flex-col justify-center"
								class:border-t={cardWidths[index] < 650}
								class:border-slate-50={cardWidths[index] < 650}
								class:pt-6={cardWidths[index] < 650}
								class:pl-8={cardWidths[index] >= 650}
							>
								<h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
									Parameter
								</h5>

								<div class="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-3 items-center text-sm">
									{#each f.params as p}
										<div class="font-bold text-slate-800 text-right mt-0.5">
											<span use:math={p.symbol}></span>
										</div>

										<div class="text-slate-300 font-mono">
											=
										</div>

										<div class="text-slate-600 leading-snug">
											{p.description}
										</div>
									{/each}
								</div>
							</div>

						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}