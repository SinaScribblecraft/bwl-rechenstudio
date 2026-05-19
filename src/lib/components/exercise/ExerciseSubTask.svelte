<script lang="ts">
	import { type Formula, inlineMath, type Step, type SubTask } from '$lib/data2/types.ts';
import ResultInterpretation from '$lib/components/exercise/ResultInterpretation.svelte';
import FinalResult from '$lib/components/exercise/FinalResult.svelte';
	import ExerciseFormulas from '$lib/components/exercise/ExerciseFormulas.svelte';

interface Props {
	task: SubTask;
	results: Step[];
	formulas: Formula[];
}

let { task, results,formulas}: Props = $props();

</script>



<div class="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-s   ">

	<div class="flex items-start gap-4 mb-2">
        <span
					class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 border border-indigo-100/60 text-indigo-700 font-extrabold text-sm shrink-0 shadow-sm">
          {task.label}
        </span>
		<span class="font-semibold text-slate-700 leading-relaxed pt-2 text-[15px]">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html inlineMath(task.question)}
        </span>
	</div>

	<ExerciseFormulas formulas={formulas} />

	<div class="flex flex-col gap-4 mt-6 w-full">

		{#each results as result}
			<div class="flex-1 w-full min-w-[250px]">
				<FinalResult
					finalResultText={result.description}
					finalResultMath={result.math}
				/>
			</div>
		{/each}

		{#if task.interpretation }
			<ResultInterpretation interpretation={task.interpretation} />
		{/if}
	</div>


</div>