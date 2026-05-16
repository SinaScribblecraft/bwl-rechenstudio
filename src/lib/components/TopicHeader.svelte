<script lang="ts">
	interface Props {
		title: string;
		subtitle: string;
		activeTab: 'explanation' | 'exercises';
		onTabChange: (tab: 'explanation' | 'exercises') => void;
	}

	let { title, subtitle, activeTab, onTabChange }: Props = $props();
</script>

<div class="mb-8 border-b border-slate-200">
	<div class="mb-6">
		<h1 class="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
		<p class="text-slate-500 text-sm">{subtitle}</p>
	</div>

	<div class="flex gap-6">
		<button
			onclick={() => onTabChange('explanation')}
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'explanation' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}"
		>
            <span class="flex items-center gap-2">
                📖 Erklärung
            </span>
			{#if activeTab === 'explanation'}
				<div class="absolute bottom-[-1px] left-0 w-full h-0.5 bg-indigo-600 rounded-t-full"></div>
			{/if}
		</button>

		<button
			onclick={() => onTabChange('exercises')}
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'exercises' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}"
		>
            <span class="flex items-center gap-2">
                ✍️ Übungsaufgaben
            </span>
			{#if activeTab === 'exercises'}
				<div class="absolute bottom-[-1px] left-0 w-full h-0.5 bg-indigo-600 rounded-t-full"></div>
			{/if}
		</button>
	</div>
</div>