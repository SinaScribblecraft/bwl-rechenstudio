<script lang="ts">
	interface Props {
		title: string;
		subtitle: string;
		activeTab: 'explanation' | 'exercises';
		onTabChange: (tab: 'explanation' | 'exercises') => void;
	}

	let { title, subtitle, activeTab, onTabChange }: Props = $props();
</script>

<div class="relative bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden mb-8">

	<div class="absolute inset-0 right-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_left,black,transparent_60%)] pointer-events-none"></div>

	<div class="px-8 pt-8 relative z-10">
		<div class="flex items-center justify-between">

			<div class="flex items-center gap-5">
				<div class="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-200 shrink-0">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="20" x2="18" y2="10"></line>
						<line x1="12" y1="20" x2="12" y2="4"></line>
						<line x1="6" y1="20" x2="6" y2="14"></line>
						<polyline points="4 16 10 9 16 14 22 4"></polyline>
					</svg>
				</div>

				<div>
					<h1 class="text-[26px] font-extrabold text-slate-900 mb-1 tracking-tight">{title}</h1>
					<p class="text-slate-500 text-sm font-medium">{subtitle}</p>
				</div>
			</div>

			<div class="hidden lg:flex items-end gap-6 pointer-events-none select-none opacity-90 pr-4">

				<div class="text-5xl -rotate-12 translate-y-1 drop-shadow-sm">🌿</div>

				<div class="flex items-end gap-1.5 h-14">
					<div class="w-4 h-6 bg-indigo-400 rounded-t-md"></div>
					<div class="w-4 h-10 bg-emerald-400 rounded-t-md"></div>
					<div class="w-4 h-14 bg-indigo-500 rounded-t-md"></div>
				</div>

				<div class="w-12 h-12 rounded-full shadow-sm ml-2"
				     style="background: conic-gradient(#fbbf24 0 25%, #34d399 25% 35%, #818cf8 35% 100%);">
				</div>

			</div>
		</div>

		<div class="flex gap-8 mt-8 border-b border-slate-100">
			<button
				onclick={() => onTabChange('explanation')}
				class="pb-4 text-[15px] font-bold transition-colors relative {activeTab === 'explanation' ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-800'}"
			>
            <span class="flex items-center gap-2">
                📖 Erklärung
            </span>
				{#if activeTab === 'explanation'}
					<div class="absolute bottom-[-1px] left-0 w-full h-[3px] bg-indigo-600 rounded-t-full"></div>
				{/if}
			</button>

			<button
				onclick={() => onTabChange('exercises')}
				class="pb-4 text-[15px] font-bold transition-colors relative {activeTab === 'exercises' ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-800'}"
			>
            <span class="flex items-center gap-2">
                ✍️ Übungsaufgaben
            </span>
				{#if activeTab === 'exercises'}
					<div class="absolute bottom-[-1px] left-0 w-full h-[3px] bg-indigo-600 rounded-t-full"></div>
				{/if}
			</button>
		</div>
	</div>
</div>