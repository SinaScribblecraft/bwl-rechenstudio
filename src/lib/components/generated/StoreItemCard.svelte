<script lang="ts">
	interface Ingredient {
		name: string;
		current: number;
		max: number;
	}

	interface Props {
		level?: number;
		title?: string;
		description?: string;
		cost?: number;
		price?: number;
		profit?: number;
		ingredients?: Ingredient[];
		isActive?: boolean;
	}

	let {
		level = 2,
		title = 'Raspberry Chocolate Cake',
		description = 'Saftiger Schokokuchen mit Himbeerfüllung.',
		cost = 2.3,
		price = 6.9,
		profit = 4.6,
		ingredients = [
			{ name: 'Chocolate', current: 6, max: 25 },
			{ name: 'Raspberry', current: 10, max: 25 },
			{ name: 'Flour', current: 12, max: 30 },
			{ name: 'Sugar', current: 15, max: 40 }
		],
		isActive = true
	}: Props = $props();

	function handleDecrease() {
		console.log('Decrease price');
	}

	function handleIncrease() {
		console.log('Increase price');
	}

	function handleToggle() {
		console.log('Toggle active');
	}

	function handleExpand() {
		console.log('Expand details');
	}
</script>

<div class="flex flex-row items-stretch bg-[#f4ebd8] border-2 border-[#b8ae9c] rounded-xl shadow-sm p-4 gap-6 w-[900px] font-sans text-[#332f2c] overflow-hidden relative">
	<!-- Left Side: Level Ribbon, Drag Handle, Main Image -->
	<div class="flex flex-row gap-3 relative min-w-[140px]">
		<!-- Level Ribbon -->
		<div class="absolute -top-4 -left-3 bg-[#8b6567] border-2 border-[#543b3d] text-[#f2e2be] font-bold text-center px-2 py-3 w-8 flex flex-col items-center shadow-md rounded-b" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);">
			<span class="text-sm mt-1">{level}</span>
		</div>

		<!-- Drag Handle -->
		<div class="flex flex-col justify-center gap-[2px] mt-8 ml-8 text-[#988a7c]">
			<div class="w-1.5 h-1.5 rounded-full bg-current"></div>
			<div class="w-1.5 h-1.5 rounded-full bg-current"></div>
			<div class="w-1.5 h-1.5 rounded-full bg-current"></div>
		</div>
		<div class="flex flex-col justify-center gap-[2px] mt-8 -ml-2 text-[#988a7c]">
			<div class="w-1.5 h-1.5 rounded-full bg-current"></div>
			<div class="w-1.5 h-1.5 rounded-full bg-current"></div>
			<div class="w-1.5 h-1.5 rounded-full bg-current"></div>
		</div>

		<!-- Main Image Placeholder -->
		<div class="w-24 h-24 bg-gradient-to-br from-[#5c4033] to-[#3a2015] rounded-lg border-2 border-[#4a3023] mt-2 relative">
			<!-- Cake Representation -->
			<div class="absolute bottom-2 left-2 right-2 h-10 bg-[#e43f5a] rounded-sm"></div>
			<div class="absolute bottom-4 left-2 right-2 h-12 bg-[#2a1b15] rounded-t-sm"></div>
		</div>
	</div>

	<!-- Title and Description -->
	<div class="flex flex-col gap-2 w-48 shrink-0 py-1">
		<h2 class="text-xl font-semibold leading-tight flex items-start gap-1">
			{title}
			<!-- Leaf Icon -->
			<svg class="w-4 h-4 text-[#60994f] mt-1 shrink-0" viewBox="0 0 24 24" fill="currentColor">
				<path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 7.05,10.62 11,12C14.69,13.29 17,8 17,8Z" />
			</svg>
		</h2>
		<p class="text-sm text-[#5c544d]">{description}</p>
	</div>

	<!-- Ingredients Divider -->
	<div class="w-px bg-[#d4c8b6] my-2"></div>

	<!-- Ingredients section -->
	<div class="flex flex-col gap-3 shrink-0 py-1">
		<div class="flex items-center gap-2 text-sm">
			<span>Zutatenkosten</span>
			<div class="flex items-center gap-1 font-medium">
				<!-- Coin Icon -->
				<svg class="w-4 h-4 text-[#e0a82e]" viewBox="0 0 24 24" fill="currentColor" stroke="#906511" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<circle cx="12" cy="12" r="6" fill="#f4c453" stroke="none"/>
				</svg>
				{cost.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
			</div>
		</div>

		<div class="flex flex-row gap-2">
			{#each ingredients as ing}
				<div class="flex flex-col gap-1 items-center">
					<!-- Box -->
					<div class="w-12 h-12 bg-[#e8deca] border border-[#c1b5a2] rounded flex items-center justify-center p-1 shadow-inner">
						<div class="w-8 h-8 bg-[#8a6b5d] rounded-sm opacity-60"></div>
					</div>
					<!-- Label -->
					<div class="bg-[#c2b4a3] text-[#4a423a] text-[10px] font-bold px-2 py-0.5 rounded-full">
						{ing.current}/{ing.max}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Price Divider -->
	<div class="w-px flex-1"></div> <!-- Flexible spacer -->

	<!-- Pricing & Adjustments -->
	<div class="flex flex-col justify-between py-1 w-48 shrink-0 border-l border-[#d4c8b6] pl-6 relative">
		<div class="flex items-center justify-between text-sm">
			<span>Verkaufspreis</span>
			<div class="flex items-center gap-1 font-medium">
				<svg class="w-4 h-4 text-[#e0a82e]" viewBox="0 0 24 24" fill="currentColor" stroke="#906511" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<circle cx="12" cy="12" r="6" fill="#f4c453" stroke="none"/>
				</svg>
				{price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
			</div>
		</div>

		<div class="flex flex-row items-center justify-between mt-2">
			<button class="w-8 h-8 bg-[#332c45] text-white rounded-lg font-bold flex items-center justify-center hover:bg-[#433b5c] transition-colors shadow-md border-b-2 border-[#161224]" onclick={handleDecrease}>−</button>
			<div class="w-20 h-8 bg-[#dad0bc] border-2 border-[#b8ae9c] rounded-lg text-center font-bold text-lg flex items-center justify-center shadow-inner">
				{price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
			</div>
			<button class="w-8 h-8 bg-[#332c45] text-white rounded-lg font-bold flex items-center justify-center hover:bg-[#433b5c] transition-colors shadow-md border-b-2 border-[#161224]" onclick={handleIncrease}>+</button>
		</div>

		<div class="w-full h-px bg-[#c8bcab] mt-3 mb-2"></div>

		<div class="flex items-center justify-between text-sm font-medium">
			<span>Gewinn</span>
			<div class="flex items-center gap-1 text-[#338127]">
				<svg class="w-4 h-4 text-[#e0a82e]" viewBox="0 0 24 24" fill="currentColor" stroke="#906511" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<circle cx="12" cy="12" r="6" fill="#f4c453" stroke="none"/>
				</svg>
				{profit.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
			</div>
		</div>
	</div>

	<!-- Right Controls -->
	<div class="flex flex-col justify-between items-end pl-4 shrink-0 py-1">
		<button
			class="w-12 h-6 rounded-full border-2 border-[#38432a] relative transition-colors shadow-sm {isActive ? 'bg-[#7f9958]' : 'bg-[#a39789]'}"
			onclick={handleToggle}
		>
			<div class="absolute top-[2px] w-4 h-4 bg-[#fcf9f1] border border-[#a29986] rounded-full transition-all shadow-sm {isActive ? 'left-[26px]' : 'left-[4px]'}"></div>
		</button>

		<button class="w-8 h-8 bg-[#d8eed4] border-2 border-[#766b5e] rounded flex items-center justify-center shadow-md bg-[#c7baaa] hover:bg-[#b0a495] transition-colors" onclick={handleExpand}>
			<svg class="w-5 h-5 text-[#3d3630]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	</div>
</div>
