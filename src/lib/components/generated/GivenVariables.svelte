<script lang="ts">
	interface VariableRow {
		variable: string;
		meaning: string;
		value: number;
		unit: string;
	}

	interface Props {
		title?: string;
		variables: VariableRow[];
	}

	let { title = 'Gegeben', variables }: Props = $props();

	function handleCopy() {
		console.log('Copy clicked');
	}
</script>

<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-lg font-sans">
	<div class="flex justify-between items-center mb-6">
		<h2 class="text-xl font-semibold text-[#1a2035]">{title}</h2>
		<button onclick={handleCopy} class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Kopieren">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
				<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
			</svg>
		</button>
	</div>

	<table class="w-full text-left border-collapse">
		<thead>
			<tr class="border-b border-gray-100">
				<th class="pb-3 font-medium text-gray-500 w-1/4">Variable</th>
				<th class="pb-3 font-medium text-gray-500 w-1/2">Bedeutung</th>
				<th class="pb-3 font-medium text-gray-500 w-1/4">Wert</th>
			</tr>
		</thead>
		<tbody class="text-[#1a2035]">
			{#each variables as row}
				<tr class="border-b border-gray-50 last:border-0">
					<td class="py-4 italic font-serif">{row.variable}</td>
					<td class="py-4 text-gray-600">{row.meaning}</td>
					<td class="py-4">
						<span class="text-[#4154f1] font-medium">{row.value}</span>
						<span class="text-gray-500 ml-1">{row.unit}</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
