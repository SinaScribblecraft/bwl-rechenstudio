<script lang="ts">

	import type { SolutionStep } from '$lib/types';

	import ExerciseSolutionStep from '$lib/components/exercise/ExerciseSolutionStep.svelte';

	interface Props {
		steps: SolutionStep[];
	}

	let { steps }: Props = $props();

	let openedSteps = $state(new Set<number>());
	let revealedSteps = $state(new Set<number>());

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
	<div class="px-6 py-5 border-b border-slate-100 bg-white flex justify-between items-center">
		<h2 class="text-xl font-bold text-slate-800 tracking-tight">Lösungsweg</h2>
		<button onclick={reset}
		        class="group flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-indigo-600 transition-colors">
			<span class="group-hover:rotate-180 transition-transform duration-500">🔄</span>
			Reset
		</button>
	</div>

	<div class="p-6 flex flex-col gap-6">
		{#each steps as step , index (step.title)}
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
</div>