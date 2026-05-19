<script lang="ts">
	import {
		type SubTask,
		type DataTable,
		type GivenItem,
		interpolate,
		inlineMath,
		type ExerciseSource, type Formula
	} from '$lib/data2/types';
	import ExerciseSubTask from '$lib/components/exercise/ExerciseSubTask.svelte';
	import ExerciseTitle from '$lib/components/exercise/ExerciseTitle.svelte';
	import ExerciseGIvenParameters from '$lib/components/exercise/ExerciseGIvenParameters.svelte';

	interface Props {
		title: string;
		descriptionTemplate: string;
		given: GivenItem[];
		dataTable?: DataTable | null;
		subTasks: SubTask[];
		verified: boolean;
		sourceType?: ExerciseSource;
		sourceDetails?: string | null;
		formulas: Formula[];
	}


	let {
		title,
		sourceType,
		sourceDetails,
		descriptionTemplate,
		formulas,
		dataTable,
		subTasks,
		verified,
		given
	}: Props = $props();
	const description = $derived(interpolate(descriptionTemplate, given));

</script>

<div class="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 lg:p-10 mb-8">

		<ExerciseTitle {title} {sourceType} {sourceDetails} {verified} />

	<div class="mb-10 bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-100/60 shadow-inner">
		<h3 class="font-bold text-slate-800 mb-2 text-[15px] flex items-center gap-2">
			<span class="text-lg">📌</span> Gegeben:
		</h3>
		<p class="text-slate-600 leading-relaxed">{@html inlineMath(description)}</p>

		{#if dataTable}
			<div class="mt-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
				<table class="w-full text-left text-sm whitespace-nowrap">
					<thead class="bg-white border-b border-slate-200 text-slate-700">
					<tr>
						{#each dataTable.headers as header (header)}
							<th class="px-4 py-3 font-bold">{@html inlineMath(header)}</th>
						{/each}
					</tr>
					</thead>
					<tbody class="divide-y divide-slate-100 bg-white/50">
					{#each dataTable.rows as row, rowIndex (rowIndex)}
						<tr class="hover:bg-white transition-colors">
							{#each row as cell, colIndex (colIndex)}
								<td class="px-4 py-3 text-slate-600 {colIndex === 0 ? 'font-semibold text-slate-800' : ''}">
									{interpolate(cell.toString(), given)}
								</td>
							{/each}
						</tr>
					{/each}
					</tbody>
				</table>
			</div>
		{/if}

		<ExerciseGIvenParameters {given} />

<!--		<details class="group mt-6 bg-blue-50/50 rounded-xl border border-blue-100 open:bg-white open:shadow-sm transition-all duration-200">-->
<!--			<summary class="cursor-pointer list-none flex items-center gap-3 p-4 text-blue-800 font-medium select-none">-->
<!--				<span class="text-xl group-open:rotate-90 transition-transform text-blue-500">▶</span>-->
<!--				💡 Lösungshinweis: Gegebene Parameter anzeigen-->
<!--			</summary>-->
<!--			<div class="p-4 pt-1 border-t border-blue-100/50">-->
<!--				<div class="overflow-x-auto rounded-lg border border-slate-200">-->
<!--					<table class="w-full text-left text-sm whitespace-nowrap">-->
<!--						<thead class="bg-slate-50 border-b border-slate-200 text-slate-700">-->
<!--							<tr>-->
<!--								<th class="px-4 py-2 font-bold">Symbol</th>-->
<!--								<th class="px-4 py-2 font-bold">Wert</th>-->
<!--								<th class="px-4 py-2 font-bold">Einheit</th>-->
<!--								<th class="px-4 py-2 font-bold">Bezeichnung</th>-->
<!--							</tr>-->
<!--						</thead>-->
<!--						<tbody class="divide-y divide-slate-100 bg-white">-->
<!--							{#each given as item (item.symbol)}-->
<!--								<tr class="hover:bg-slate-50 transition-colors">-->
<!--									<td class="px-4 py-2 font-semibold font-mono text-slate-700">{@html inlineMath(item.symbol)}</td>-->
<!--									{#if isGivenValue(item)}-->
<!--										<td class="px-4 py-2 text-slate-600">{item.value}</td>-->
<!--										<td class="px-4 py-2 text-slate-500">{item.unit || '-'}</td>-->
<!--									{:else if isGivenFormula(item)}-->
<!--										<td class="px-4 py-2 text-slate-600 col-span-2" colspan="2">{@html inlineMath(item.math)}</td>-->
<!--									{/if}-->
<!--									<td class="px-4 py-2 text-slate-500">{item.label}</td>-->
<!--								</tr>-->
<!--							{/each}-->
<!--						</tbody>-->
<!--					</table>-->
<!--				</div>-->
<!--			</div>-->
<!--		</details>-->
	</div>

	<div class="flex flex-col gap-6">
		{#each subTasks as task (task.label)}
			{@const results = task.steps.filter(x => x.type == 'result')}
			{@const subFormulas = formulas.filter(f => task.formulaRefs?.includes(f.id))}
			{#if subFormulas.length > 0 }
				<ExerciseSubTask {task} {results} formulas={subFormulas} />
			{/if}
		{/each}
	</div>

</div>