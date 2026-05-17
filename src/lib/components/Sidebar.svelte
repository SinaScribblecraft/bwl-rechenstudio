<script lang="ts">
	import type { CourseUnit } from '$lib/data2/types';
	import { page } from '$app/state';
	import { sidebarData } from '$lib/data2/exercises';

	// const units: CourseUnit[] = [
	// 	{
	// 		id: 'ke1',
	// 		title: 'KE1 Grundlagen',
	// 		icon: '⏱️',
	// 		topics: [
	// 			{ id: 'gewinn', title: 'Gewinn vs. Rentabilität', href: '/ke1/gewinn' },
	// 			{ id: 'prognose', title: 'Prognoseverfahren', href: '/ke1/prognose' },
	// 			{ id: 'gozinto', title: 'Gozinto', href: '/ke1/gozinto' },
	// 			{ id: 'andler', title: 'Andler-Formel', href: '/ke1/andler' },
	// 			{ id: 'expo', title: 'Exponential Glättung', href: '/ke1/expo' }
	// 		]
	// 	},
	// 	{
	// 		id: 'ke2',
	// 		title: 'KE2 - Leistungsprozess',
	// 		icon: '📈',
	// 		topics: [
	// 			{ id: 'prozesse', title: 'Prozesse & Aktivitäten', href: '/ke2/prozesse' },
	// 			{ id: 'ketten', title: 'Prozessketten & Wertschöpfung', href: '/ke2/ketten' }
	// 		]
	// 	}
	// ];

	const units = sidebarData;

	let expandedUnits = $state<Record<string, boolean>>({
		'ke1': true,
		'ke2': true
	});

	// NEU: State für die Sidebar-Breite
	let isSidebarOpen = $state(true);

	function toggleUnit(id: string) {
		// Wenn die Sidebar zu ist, klappen wir sie auf, statt nur die Unit zu toggeln
		if (!isSidebarOpen) {
			isSidebarOpen = true;
			expandedUnits[id] = true;
		} else {
			expandedUnits[id] = !expandedUnits[id];
		}
	}
</script>

<aside class="h-screen border-r border-slate-200 flex flex-col gap-6 font-sans bg-white transition-all duration-300 relative z-20 shrink-0
              {isSidebarOpen ? 'w-[300px] p-6' : 'w-[80px] p-4 items-center'}">

	<button
		onclick={() => isSidebarOpen = !isSidebarOpen}
		class="absolute top-8 -right-3 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all z-30"
	>
   <span class="text-xs transition-transform duration-300 {isSidebarOpen ? '' : 'rotate-180'}">
    ◀
   </span>
	</button>

	<div class="flex items-center gap-3 w-full">
		<div class="text-2xl shrink-0">📖</div>
		<div
			class="overflow-hidden whitespace-nowrap transition-all duration-300 {isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}">
			<h1 class="m-0 text-lg font-bold text-slate-900">BWL</h1>
			<p class="m-0 text-sm text-slate-500">Rechenstudio</p>
		</div>
	</div>

	<div
		class="w-full transition-all duration-300 overflow-hidden {isSidebarOpen ? 'h-[42px] opacity-100' : 'h-0 opacity-0'}">
		<input
			type="text"
			placeholder="🔍 Suchen..."
			class="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
		/>
	</div>

	<nav class="flex-1 overflow-y-auto overflow-x-hidden w-full {isSidebarOpen ? 'pr-2' : ''}">
		<a href="/" class="flex items-center gap-3 p-3 text-slate-900 font-semibold hover:bg-slate-50 rounded-lg transition-colors no-underline
                      {isSidebarOpen ? '' : 'justify-center'}">
			<span class="shrink-0">🏠</span>
			<span
				class="whitespace-nowrap transition-all duration-300 {isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 hidden'}">
     Dashboard
    </span>
		</a>

		{#each units as unit}
			<div class="mt-4">
				<button
					class="w-full flex items-center gap-3 p-3 bg-indigo-50/50 hover:bg-indigo-50 rounded-lg cursor-pointer text-indigo-700 font-semibold transition-colors border-none
             {isSidebarOpen ? '' : 'justify-center'}"
					onclick={() => toggleUnit(unit.id)}
				>
					<span class="shrink-0">{unit.icon}</span>
					<span
						class="whitespace-nowrap transition-all duration-300 {isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 hidden'}">
       {unit.title}
      </span>
					<span
						class="ml-auto transition-transform duration-200 {expandedUnits[unit.id] ? 'rotate-180' : ''} {isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 hidden'}">
       ⌄
      </span>
				</button>

				{#if expandedUnits[unit.id] && isSidebarOpen}
					<ul class="list-none mt-2 mb-0 ml-[22px] p-0 border-l-2 border-slate-200">
						{#each unit.topics as topic }
							{@const isActive = page.url.pathname === topic.href}

							<li class="relative">
         <span class="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full
                      {isActive ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-slate-300'}">
         </span>

								<a
									href={topic.href}
									class="block py-3 pr-3 pl-6 text-sm no-underline transition-colors whitespace-nowrap overflow-hidden text-ellipsis
                 {isActive ? 'text-indigo-700 font-semibold bg-slate-50 rounded-r-lg' : 'text-slate-500 hover:text-slate-800 hover:bg-indigo-50'}"
								>
									{topic.title}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</nav>
</aside>