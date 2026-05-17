<script lang="ts">
	interface Ingredient {
		id: string;
		name: string;
		amount: string;
		status: 'Gut' | 'Niedrig' | 'Aufgebraucht';
		icon: string;
	}

	interface Props {
		ingredients?: Ingredient[];
	}

	let {
		ingredients = [
			{ id: '1', name: 'Kaffeebohnen', amount: '250 g', status: 'Gut', icon: '🫘' },
			{ id: '2', name: 'Milch', amount: '1,2 L', status: 'Gut', icon: '🥛' },
			{ id: '3', name: 'Zucker', amount: '450 g', status: 'Gut', icon: '🧂' },
			{ id: '4', name: 'Matcha Pulver', amount: '120 g', status: 'Niedrig', icon: '🍵' },
			{ id: '5', name: 'Mehl', amount: '300 g', status: 'Gut', icon: '🌾' },
			{ id: '6', name: 'Kakao Pulver', amount: '80 g', status: 'Niedrig', icon: '🥣' },
			{ id: '7', name: 'Himbeeren', amount: '90 g', status: 'Gut', icon: '🍓' },
			{ id: '8', name: 'Eier', amount: '4 Stk.', status: 'Niedrig', icon: '🥚' },
			{ id: '9', name: 'Karamellsirup', amount: '150 ml', status: 'Gut', icon: '🍯' }
		]
	}: Props = $props();

	let filter = $state<'Alle' | 'Niedrig' | 'Aufgebraucht'>('Alle');

	let filteredIngredients = $derived(
		ingredients.filter((i) => {
			if (filter === 'Alle') return true;
			return i.status === filter;
		})
	);
</script>

<div class="max-w-md w-full bg-[#2a2b3d] text-slate-200 rounded-xl p-4 font-sans shadow-xl">
	<!-- Header -->
	<div class="flex items-center gap-3 mb-4">
		<div class="text-3xl">📦</div>
		<h1 class="text-2xl font-bold text-[#e1d5c9]">Zutatenlager</h1>
	</div>

	<!-- Tabs -->
	<div class="flex bg-[#1e1f2f] rounded-lg p-1 mb-5 border border-slate-700">
		{#each ['Alle', 'Niedrig', 'Aufgebraucht'] as tab}
			<button
				class="flex-1 py-1.5 text-sm rounded-md transition-colors {filter === tab ? 'bg-[#3b3c54] text-[#e1d5c9] shadow-sm' : 'text-slate-400 hover:text-slate-300'}"
				onclick={() => { filter = tab as 'Alle' | 'Niedrig' | 'Aufgebraucht'; }}
			>
				{tab}
			</button>
		{/each}
	</div>

	<!-- List --->
	<div class="flex flex-col gap-2 overflow-y-auto max-h-[60vh] pr-1">
		{#each filteredIngredients as item (item.id)}
			<div class="grid grid-cols-[auto_1fr_auto] items-center gap-4 bg-[#33344a] border border-[#44465e] rounded-lg p-3">
				<div class="text-2xl drop-shadow-md flex items-center justify-center w-8">{item.icon}</div>

				<div class="font-medium text-[#e1d5c9]">{item.name}</div>

				<div class="text-right flex flex-col items-end">
					<div class="text-sm text-slate-300">{item.amount}</div>
					<div class="text-xs flex items-center gap-1.5 mt-0.5 {item.status === 'Gut' ? 'text-[#8cc274]' : item.status === 'Niedrig' ? 'text-[#e69f52]' : 'text-red-400'}">
						<div class="w-2 h-2 rounded-full {item.status === 'Gut' ? 'bg-[#8cc274]' : item.status === 'Niedrig' ? 'bg-[#e69f52]' : 'bg-red-400'}"></div>
						{item.status}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Action Button -->
	<button
		class="w-full mt-5 bg-[#3b3c54] hover:bg-[#4a4b69] border border-[#565876] text-[#e1d5c9] py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
		onclick={() => console.log('Zutaten einkaufen clicked')}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
			<path d="M3 6h18" />
			<path d="M16 10a4 4 0 0 1-8 0" />
		</svg>
		Zutaten einkaufen
	</button>
</div>

