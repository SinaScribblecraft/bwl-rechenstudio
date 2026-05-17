<script lang="ts">
	import type { SubTask, DataTable } from '$lib/types';
	import FinalResult from '$lib/components/exercise/FinalResult.svelte';

	interface Props {
		title: string;
		description: string;
		dataTable?: DataTable;
		subTasks: SubTask[];
		onShowSolution: (index: number) => void;
	}

	let { title, description, dataTable, subTasks, onShowSolution }: Props = $props();
</script>

<div class="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 lg:p-10 mb-8">

	<div class="flex justify-between items-start mb-8">
		<div>
			<span class="text-xs font-bold text-indigo-500 uppercase tracking-wider">Übungsaufgabe</span>
			<h2 class="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">{title}</h2>
		</div>

		<div class="hidden sm:flex text-[40px] gap-1 -mt-2 -mr-2 select-none pointer-events-none drop-shadow-md">
			<span class="transform -rotate-12 translate-y-3 z-10">🧮</span>
			<span class="transform rotate-12">📝</span>
		</div>
	</div>

	<div class="mb-10 bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-100/60 shadow-inner">
		<h3 class="font-bold text-slate-800 mb-2 text-[15px] flex items-center gap-2">
			<span class="text-lg">📌</span> Gegeben:
		</h3>
		<p class="text-slate-600 leading-relaxed">{description}</p>

		{#if dataTable}
			<div class="mt-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
				<table class="w-full text-left text-sm whitespace-nowrap">
					<thead class="bg-white border-b border-slate-200 text-slate-700">
					<tr>
						{#each dataTable.headers as header}
							<th class="px-4 py-3 font-bold">{header}</th>
						{/each}
					</tr>
					</thead>
					<tbody class="divide-y divide-slate-100 bg-white/50">
					{#each dataTable.rows as row}
						<tr class="hover:bg-white transition-colors">
							{#each row as cell, colIndex}
								<td class="px-4 py-3 text-slate-600 {colIndex === 0 ? 'font-semibold text-slate-800' : ''}">
									{cell}
								</td>
							{/each}
						</tr>
					{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-6">
		{#each subTasks as task, index (task.label)}

			<div class="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-s   ">

				<div class="flex items-start gap-4 mb-2">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 border border-indigo-100/60 text-indigo-700 font-extrabold text-sm shrink-0 shadow-sm">
          {task.label}
        </span>
					<span class="font-semibold text-slate-700 leading-relaxed pt-2 text-[15px]">
          {task.question}
        </span>
				</div>

				<div class="pl-14 flex flex-col xl:flex-row items-center gap-4 mt-4 w-full">

					{#if task.finalResultText || task.finalResultMath}
						<div class="flex-1 w-full min-w-[250px]">
							<FinalResult
								finalResultText={task.finalResultText}
								finalResultMath={task.finalResultMath}
							/>
						</div>
					{/if}

					<button
						onclick={() => onShowSolution(index)}
						class="shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 bg-white hover:bg-indigo-50/50 text-indigo-600 text-sm font-bold rounded-xl border-2 border-indigo-100 hover:border-indigo-300 transition-all w-full xl:w-auto mt-2 xl:mt-0"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
						Lösung Schritt für Schritt
					</button>

				</div>

			</div>

		{/each}
	</div>

</div>