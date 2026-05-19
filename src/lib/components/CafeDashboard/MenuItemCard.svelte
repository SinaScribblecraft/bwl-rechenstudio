<script lang="ts">
	import type { Snippet } from 'svelte';
	import RequiredIngredient from './RequiredIngredient.svelte';
	import PriceStepper from './PriceStepper.svelte';

	export interface IngredientItem {
		id: string;
		requiredAmount: number;
		stockAmount: number;
		icon?: Snippet;
	}

	interface Props {
		idNumber: number;
		title: string;
		description: string;
		imageSnippet?: Snippet;
		ingredients: IngredientItem[];
		ingredientCost: number;
		sellPrice?: number;
		isActive?: boolean;
	}

	let {
		idNumber,
		title,
		description,
		imageSnippet,
		ingredients,
		ingredientCost,
		sellPrice = $bindable(0),
		isActive = $bindable(false)
	}: Props = $props();

	let profit = $derived(Math.max(0, sellPrice - ingredientCost));

	let formattedCost = $derived(ingredientCost.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
	let formattedSell = $derived(sellPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
	let formattedProfit = $derived(profit.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

	function toggleActive() {
		isActive = !isActive;
	}
</script>

<div class="relative bg-[#e9deb6] rounded-2xl p-4 shadow-sm border border-[#cfc09f] w-full">

	<!-- Nummer Badge Oben Links -->
	<div class="absolute -top-2 -left-2 w-8 h-8 flex items-center justify-center bg-[#5c4a40] text-[#cfc09f] font-bold rounded-lg shadow-md border-2 border-[#1a1513] transform rotate-3">
		{idNumber}
	</div>

	<!-- GRID LAYOUT -->
	<div class="grid grid-cols-[1.5fr_1.5fr_1fr] gap-6 pl-6">

		<!-- Spalte 1: Info (Bild + Text) -->
		<div class="flex gap-4 items-center">
			<div class="w-20 h-20 bg-[#dcd2ba] rounded-full flex-shrink-0 flex items-center justify-center border-2 border-[#cfc09f]">
				{#if imageSnippet}
					{@render imageSnippet()}
				{:else}
					<div class="w-10 h-10 bg-[#9a8677] rounded-full mask mask-circle"></div>
				{/if}
			</div>

			<div class="flex flex-col justify-center">
				<h3 class="text-xl font-bold text-[#362720] flex items-center gap-2">
					{title}
					<!-- Kleines Blatt-Icon Dummy -->
					<svg class="w-4 h-4 text-[#8fb359]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10z" clip-rule="evenodd"></path></svg>
				</h3>
				<p class="text-sm text-[#7a6a5d] leading-snug mt-1">
					{description}
				</p>
			</div>
		</div>

		<!-- Spalte 2: Zutaten & Kosten -->
		<div class="flex flex-col justify-center border-l border-[#cfc09f] pl-6 border-r pr-6">
			<div class="flex items-center gap-2 mb-3">
				<span class="text-sm font-medium text-[#7a6a5d]">Zutatenkosten</span>
				<div class="flex items-center gap-1">
					<div class="w-4 h-4 bg-[#d4af37] rounded-full border border-[#b8860b]"></div> <!-- Coin dummy -->
					<span class="font-bold text-[#362720]">{formattedCost}</span>
				</div>
			</div>

			<div class="flex gap-4">
				{#each ingredients as ing (ing.id)}
					<RequiredIngredient
						requiredAmount={ing.requiredAmount}
						stockAmount={ing.stockAmount}
						icon={ing.icon}
					/>
				{/each}
			</div>
		</div>

		<!-- Spalte 3: Verkaufspreis, Profit & Controls -->
		<div class="flex flex-col justify-center relative">

			<div class="flex items-center justify-between mb-3">
				<div class="flex items-center gap-2">
					<span class="text-sm font-medium text-[#7a6a5d]">Verkaufspreis</span>
					<div class="flex items-center gap-1">
						<div class="w-4 h-4 bg-[#d4af37] rounded-full border border-[#b8860b]"></div>
						<span class="font-bold text-[#362720]">{formattedSell}</span>
					</div>
				</div>

				<!-- Toggle Switch -->
				<button
					type="button"
					class="w-12 h-6 rounded-full transition-colors relative {isActive ? 'bg-[#8fb359]' : 'bg-[#9a8677]'}"
					onclick={toggleActive}
				>
					<div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#f2e8d5] rounded-full transition-all {isActive ? 'left-[26px]' : 'left-1'}"></div>
				</button>
			</div>

			<PriceStepper bind:value={sellPrice} min={0} step={0.10} />

			<div class="flex items-center justify-between mt-3">
				<span class="text-sm font-medium text-[#7a6a5d]">Gewinn</span>
				<div class="flex items-center gap-1">
					<div class="w-4 h-4 bg-[#d4af37] rounded-full border border-[#b8860b]"></div>
					<span class="font-bold text-[#362720]">{formattedProfit}</span>
				</div>
			</div>

			<!-- Expand Button (Bottom Right) -->
			<button
				type="button"
				class="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center bg-[#dcd2ba] rounded-lg border border-[#cfc09f] text-[#7a6a5d] hover:bg-[#cfc09f] hover:text-[#362720] transition-colors"
				onclick={() => console.log('Expand clicked')}
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
			</button>

		</div>

	</div>
</div>
