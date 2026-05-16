<script lang="ts">
	import type { SubTask, DataTable } from '$lib/types';

	interface Props {
		title: string;
		description: string;
		dataTable?: DataTable;
		subTasks: SubTask[];
	}

	let { title, description, dataTable, subTasks }: Props = $props();
</script>

<div class="mb-10">
	<div class="text-sm text-indigo-500 mb-2 uppercase tracking-wider font-bold">
		Übungsaufgabe
	</div>

	<h1 class="text-3xl font-bold text-slate-900 mb-4">{title}</h1>

	<div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
		<h3 class="font-bold text-slate-700 mb-2">Gegeben:</h3>

		<p class="text-slate-600 leading-relaxed">{description}</p>

		{#if dataTable}
			<div class="mt-6 overflow-x-auto rounded-lg border border-slate-200 shadow-inner">
				<table class="w-full text-left text-sm whitespace-nowrap">
					<thead class="bg-slate-50 border-b border-slate-200 text-slate-700">
					<tr>
						{#each dataTable.headers as header}
							<th class="px-4 py-3 font-bold">{header}</th>
						{/each}
					</tr>
					</thead>
					<tbody class="divide-y divide-slate-100 bg-white">
					{#each dataTable.rows as row}
						<tr class="hover:bg-slate-50/50 transition-colors">
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

		<div class="mt-6 flex flex-col gap-3">
			{#each subTasks as task (task.label)}
				<div class="flex items-start gap-3">
      <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border text-indigo-700 border-indigo-200 bg-indigo-50 font-bold text-sm shrink-0 mt-0.5 shadow-sm">
       <span class="relative -top-px leading-none">{task.label}</span>
      </span>
					<span class="font-semibold text-slate-700 leading-relaxed pt-1">{task.question}</span>
				</div>
			{/each}
		</div>

	</div>
</div>