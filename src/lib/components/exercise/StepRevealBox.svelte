<script lang="ts">
	import { math } from '$lib/actions/math';
	import type { Step } from '$lib/data2/types';

	interface Props {
		step: Step;
		isRevealed: boolean;
		onReveal: () => void;
	}

	let { step, isRevealed, onReveal }: Props = $props();
</script>

<div class="relative min-h-[80px] rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden bg-graph-paper">
	{#if isRevealed}
		<div class="p-4 w-full flex flex-col gap-5 animate-in fade-in duration-500 overflow-x-auto">

			{#if step.dataTable}
				<div class="rounded border border-indigo-100 bg-white/90 shadow-sm overflow-hidden backdrop-blur-sm">
					<table class="w-full text-left text-sm whitespace-nowrap">
						<thead class="bg-indigo-50/80 border-b border-indigo-100 text-indigo-900">
						<tr>
							{#each step.dataTable.headers as header}
								<th class="px-4 py-2 font-bold">{header}</th>
							{/each}
						</tr>
						</thead>
						<tbody class="divide-y divide-slate-100">
						{#each step.dataTable.rows as row}
							<tr>
								{#each row as cell, colIndex}
									<td class="px-4 py-2 text-slate-700 {colIndex === 0 ? 'font-semibold' : ''}">
										{cell}
									</td>
								{/each}
							</tr>
						{/each}
						</tbody>
					</table>
				</div>
			{/if}

			{#if step.math}
				<div class="w-full text-center">
					<span use:math={step.math} class="text-indigo-900 text-lg"></span>
				</div>
			{/if}

		</div>
	{:else}
		<button
			onclick={(e) => { e.stopPropagation(); onReveal(); }}
			class="px-5 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-all m-4"
		>
			Lösung einblenden
		</button>
	{/if}
</div>

<style>
    .bg-graph-paper {
        background-image: radial-gradient(#8c8393 0.5px, transparent 0.5px);
        background-size: 15px 15px;
        background-color: #fcfcfd;
    }
</style>