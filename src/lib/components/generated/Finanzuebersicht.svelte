<script lang="ts">
	interface Props {
		title?: string;
		tabs?: string[];
		activeTab?: string;
		chartLabels?: string[];
		chartYLabels?: string[];
		profitLabel?: string;
		profitValue?: string;
		incomeLabel?: string;
		incomeValue?: string;
		expensesLabel?: string;
		expensesValue?: string;
	}

	let {
		title = 'FINANZÜBERSICHT',
		tabs = ['Woche', 'Monat', 'Jahr'],
		activeTab = 'Woche',
		chartLabels = ['15. Apr', '22. Apr', '29. Apr', '6. Mai', '12. Mai'],
		chartYLabels = ['20.000', '10.000', '0', '-10.000'],
		profitLabel = 'Gewinn diese Woche',
		profitValue = '£ 8.230',
		incomeLabel = 'Einnahmen',
		incomeValue = '£ 28.450',
		expensesLabel = 'Ausgaben',
		expensesValue = '£ 20.220'
	}: Props = $props();
</script>

<div class="w-[500px] max-w-full bg-[#fcfbf9] border border-[#f0e8db] rounded-sm p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] font-serif text-[#4a4238] flex flex-col gap-8 relative overflow-hidden">
	<!-- Decorative subtle corners to match image style -->
	<div class="absolute top-1 left-1 w-6 h-6 border-t border-l border-[#e8dfcf] rounded-tl-xl opacity-50"></div>
	<div class="absolute top-1 right-1 w-6 h-6 border-t border-r border-[#e8dfcf] rounded-tr-xl opacity-50"></div>
	<div class="absolute bottom-1 left-1 w-6 h-6 border-b border-l border-[#e8dfcf] rounded-bl-xl opacity-50"></div>
	<div class="absolute bottom-1 right-1 w-6 h-6 border-b border-r border-[#e8dfcf] rounded-br-xl opacity-50"></div>

	<h2 class="text-[1.1rem] tracking-[0.15em] font-semibold uppercase text-[#332e27]">{title}</h2>

	<div class="flex gap-6 border-b border-[#f0e8db] pb-2 text-[15px]">
		{#each tabs as tab}
			<button
				class="hover:text-black transition-colors {activeTab === tab ? 'text-black border-b border-[#8b7d6b] pb-[0.45rem] -mb-[9px]' : 'text-gray-500'}"
				onclick={() => {
					/* Tab switch logic placeholder */
					console.log('Tab geklickt:', tab);
				}}
			>
				{tab}
			</button>
		{/each}
	</div>

	<!-- Chart Area -->
	<div class="relative h-[220px] w-full flex">
		<!-- Y-Axis -->
		<div class="flex flex-col justify-between text-[13px] text-gray-500 pt-[10px] pb-[35px] pr-4 h-full z-10 w-[70px] text-right">
			{#each chartYLabels as label}
				<span>{label}</span>
			{/each}
		</div>

		<!-- Grid & Chart Content -->
		<div class="flex-1 relative h-full">
			<!-- Horizontal grid lines -->
			<div class="absolute inset-0 flex flex-col justify-between pt-[20px] pb-[44px]">
				{#each chartYLabels as _}
					<div class="w-full border-t border-gray-100"></div>
				{/each}
			</div>

			<!-- Chart SVG Placeholder -->
			<div class="absolute inset-0 pt-[15px] pb-[44px]">
				<svg class="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" preserveAspectRatio="none">
					<!-- Fill -->
					<path
						d="M0,65 L3,61 L6,62 L10,55 L13,57 L16,56 L19,65 L22,66 L25,71 L28,73 L31,69 L34,58 L37,59 L40,54 L43,56 L46,55 L49,50 L52,53 L55,59 L58,45 L61,43 L64,30 L67,31 L70,33 L73,20 L76,23 L79,20 L82,30 L85,40 L88,38 L91,44 L94,36 L97,38 L100,45 L100,100 L0,100 Z"
						fill="#e6ecd8"
						opacity="0.6"
					/>
					<!-- Line -->
					<path
						d="M0,65 L3,61 L6,62 L10,55 L13,57 L16,56 L19,65 L22,66 L25,71 L28,73 L31,69 L34,58 L37,59 L40,54 L43,56 L46,55 L49,50 L52,53 L55,59 L58,45 L61,43 L64,30 L67,31 L70,33 L73,20 L76,23 L79,20 L82,30 L85,40 L88,38 L91,44 L94,36 L97,38 L100,45"
						fill="none"
						stroke="#557a55"
						stroke-width="1.5"
					/>
				</svg>
			</div>

			<!-- X-Axis Labels -->
			<div class="absolute bottom-0 left-0 right-0 flex justify-between text-[13px] text-gray-500">
				{#each chartLabels as label}
					<span>{label}</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Divider -->
	<div class="w-full border-t border-[#f0e8db] -mt-2"></div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-3 gap-4">
		<div class="flex flex-col gap-2 pr-4 border-r border-[#f0e8db]">
			<span class="text-[14px] text-gray-600">{profitLabel}</span>
			<span class="text-[17px] font-semibold text-[#326941]">{profitValue}</span>
		</div>
		<div class="flex flex-col gap-2 pr-4 border-r border-[#f0e8db] pl-2">
			<span class="text-[14px] text-gray-600">{incomeLabel}</span>
			<span class="text-[17px] text-[#332e27]">{incomeValue}</span>
		</div>
		<div class="flex flex-col gap-2 pl-2">
			<span class="text-[14px] text-gray-600">{expensesLabel}</span>
			<span class="text-[17px] text-[#332e27]">{expensesValue}</span>
		</div>
	</div>

	<!-- View Report Button -->
	<button
		class="w-full py-3 mt-1 bg-[#f4eedb] hover:bg-[#ede5ce] transition-colors rounded-sm text-[#5f5240] text-[15px] border border-[#e8dfcf]"
		onclick={() => {
			console.log('Finanzbericht anzeigen geklickt');
		}}
	>
		Finanzbericht anzeigen
	</button>
</div>
