<script lang="ts">
	import type { CourseUnit } from '$lib/types';
	import { page } from '$app/state';

	const units: CourseUnit[] = [
		{
			id: 'ke1',
			title: 'KE1 Grundlagen',
			icon: '⏱️',
			topics: [
				{ id: 'gewinn', title: 'Gewinn vs. Rentabilität', href: '/ke1/gewinn' },
				{ id: 'prognose', title: 'Prognoseverfahren', href: '/ke1/prognose' },
				{ id: 'gozinto', title: 'Gozinto', href: '/ke1/gozinto' },
				{ id: 'andler', title: 'Andler-Formel', href: '/ke1/andler' },
				{ id: 'expo', title: 'Exponential Glättung', href: '/ke1/expo' }
			]
		},
		{
			id: 'ke2',
			title: 'KE2 - Leistungsprozess',
			icon: '📈',
			topics: [
				{ id: 'prozesse', title: 'Prozesse & Aktivitäten', href: '/ke2/prozesse' },
				{ id: 'ketten', title: 'Prozessketten & Wertschöpfung', href: '/ke2/ketten' }
			]
		}
	];

	let expandedUnits = $state<Record<string, boolean>>({
		'ke1': true,
		'ke2': true
	});

	function toggleUnit(id: string) {
		expandedUnits[id] = !expandedUnits[id];
	}
</script>

<aside class="w-[300px] h-screen border-r border-slate-200 p-6 flex flex-col gap-6 font-sans bg-white">

	<div class="flex items-center gap-3">
		<div class="text-2xl">📖</div>
		<div>
			<h1 class="m-0 text-lg font-bold text-slate-900">BWL</h1>
			<p class="m-0 text-sm text-slate-500">Rechenstudio</p>
		</div>
	</div>

	<div class="w-full">
		<input
			type="text"
			placeholder="🔍 Suchen..."
			class="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
		/>
	</div>

	<nav class="flex-1 overflow-y-auto pr-2">
		<a href="/" class="flex gap-3 p-3 text-slate-900 font-semibold hover:bg-slate-50 rounded-lg transition-colors no-underline">
			🏠 Dashboard
		</a>

		{#each units as unit}
			<div class="mt-4">
				<button
					class="w-full flex items-center gap-3 p-3 bg-indigo-50/50 hover:bg-indigo-50 rounded-lg cursor-pointer text-indigo-700 font-semibold transition-colors border-none"
					onclick={() => toggleUnit(unit.id)}
				>
					<span>{unit.icon}</span>
					<span>{unit.title}</span>
					<span class="ml-auto transition-transform duration-200 {expandedUnits[unit.id] ? 'rotate-180' : ''}">⌄</span>
				</button>

				{#if expandedUnits[unit.id]}
					<ul class="list-none mt-2 mb-0 ml-[22px] p-0 border-l-2 border-slate-200">
						{#each unit.topics as topic }
							{@const isActive = page.url.pathname === topic.href}

							<li class="relative">
                                <span class="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full
                                    {isActive ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-slate-300'}">
                                </span>

								<a
									href={topic.href}
									class="block py-3 pr-3 pl-6 text-sm no-underline transition-colors
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