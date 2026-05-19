<script lang="ts">
	import {
		type GivenItem,
		inlineMath,
		isGivenValue,
		isGivenFormula,
		math
	} from '$lib/data2/types';
	interface Props {
		given?: GivenItem[];

	}

	let {given} : Props = $props();

</script>
<details class="group mt-6 bg-blue-50/50 rounded-xl border border-blue-100 open:bg-white open:shadow-sm transition-all duration-200">
			<summary class="cursor-pointer list-none flex items-center gap-3 p-4 text-blue-800 font-medium select-none">
				<span class="text-xl group-open:rotate-90 transition-transform text-blue-500">▶</span>
				💡 Lösungshinweis: Gegebene Parameter anzeigen
			</summary>
			<div class="p-4 pt-1 border-t border-blue-100/50">
				<div class="overflow-x-auto rounded-lg border border-slate-200">
					<table class="w-full text-left text-sm whitespace-nowrap">
						<thead class="bg-slate-50 border-b border-slate-200 text-slate-700">
							<tr>
								<th class="px-4 py-2 font-bold">Symbol</th>
								<th class="px-4 py-2 font-bold">Wert</th>
								<th class="px-4 py-2 font-bold">Einheit</th>
								<th class="px-4 py-2 font-bold">Bezeichnung</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-100 bg-white">
							{#each given as item (item.symbol)}
								<tr class="hover:bg-slate-50 transition-colors">
									<td class="px-4 py-2 font-semibold font-mono text-slate-700">{@html math(item.symbol)}</td>
									{#if isGivenValue(item)}
										<td class="px-4 py-2 text-slate-600">{item.value}</td>
										<td class="px-4 py-2 text-slate-500">{item.unit || '-'}</td>
									{:else if isGivenFormula(item)}
										<td class="px-4 py-2 text-slate-600 col-span-2" colspan="2">{@html inlineMath(item.math)}</td>
									{/if}
									<td class="px-4 py-2 text-slate-500">{item.label}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</details>