<script lang="ts">

	import type { Step } from '$lib/data2/types';

	import ExerciseSolutionStep from '$lib/components/exercise/ExerciseSolutionStep.svelte';

	interface Props {
		steps: Step[];
	}

	let { steps }: Props = $props();

	let openedSteps = $state(new Set<number>());
	let revealedSteps = $state(new Set<number>());
	let isSectionOpen = $state(false);

	function toggleStep(id: number) {
		if (openedSteps.has(id)) {
			openedSteps.delete(id);
		} else {
			openedSteps.add(id);
		}
		openedSteps = new Set(openedSteps);
	}

	function reveal(id: number) {
		revealedSteps.add(id);
		revealedSteps = new Set(revealedSteps);
	}

	function reset() {
		openedSteps = new Set();
		revealedSteps = new Set();
	}
</script>

<div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
	<div class="px-6 py-5 border-b border-slate-100 bg-white flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
		 role="button" tabindex="0"
		 onclick={() => isSectionOpen = !isSectionOpen}
		 onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); isSectionOpen = !isSectionOpen; } }}>
		<h2 class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
			Lösungsweg
			<span class="text-slate-400 text-lg transition-transform duration-300 {isSectionOpen ? 'rotate-180' : ''}">▼</span>
		</h2>
		<button onclick={(e) => { e.stopPropagation(); reset(); }}
		        class="group flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-indigo-600 transition-colors">
			<span class="group-hover:rotate-180 transition-transform duration-500">🔄</span>
			Reset
		</button>
	</div>

	{#if isSectionOpen}
	<div class="p-6 flex flex-col gap-6">
		{#each steps as step , index }
			{@const stepNumber = index + 1}
			{@const isOpen = openedSteps.has(stepNumber)}
			{@const isRevealed = revealedSteps.has(stepNumber)}

			<ExerciseSolutionStep
				{step} {stepNumber} {isOpen} {isRevealed}
				onReveal={() => reveal(stepNumber)}
				onToggle={() => toggleStep(stepNumber)}
				isLast={index === steps.length - 1}
			/>

		{/each}

	</div>
	{/if}
</div>