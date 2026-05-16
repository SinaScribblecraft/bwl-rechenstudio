<script lang="ts">
	import ExerciseTask from '$lib/components/exercise/ExerciseTask.svelte';
	import ExerciseFormulas from '$lib/components/exercise/ExerciseFormulas.svelte';
	import ExerciseSolution from '$lib/components/exercise/ExerciseSolution.svelte';

	let { data } = $props();

	let activeIndex = $state(0);

	let activeSubTask = $derived(data.exercise.subTasks[activeIndex]);
</script>

<div class="max-w-7xl mx-auto px-4">
	<div class="text-xs text-slate-400 mb-6 uppercase tracking-widest font-bold">
		{data.unitId} / {data.topicId}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">

		<div class="flex flex-col">
			<ExerciseTask
				title={data.exercise.title}
				description={data.exercise.description}
				subTasks={data.exercise.subTasks}
				dataTable={data.exercise.dataTable}
			/>

			<ExerciseFormulas
				formulas={data.exercise.formulas}
			/>
		</div>

		<div class="lg:sticky lg:top-8 flex flex-col gap-4">

			{#if data.exercise.subTasks.length > 1}
				<div class="flex p-1 bg-slate-100 rounded-lg border border-slate-200">
					{#each data.exercise.subTasks as subTask, index}
						<button
							onclick={() => activeIndex = index}
							class="flex-1 py-2 px-4 rounded-md text-sm font-bold transition-all
                                   {activeIndex === index
                                    ? 'bg-white text-indigo-700 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}"
						>
							Aufgabe {subTask.label}
						</button>
					{/each}
				</div>
			{/if}

			<div class="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
				<span class="font-bold text-indigo-800 mr-2">{activeSubTask.label})</span>
				<span class="text-indigo-900 font-medium">{activeSubTask.question}</span>
			</div>

			{#key activeIndex}
				<ExerciseSolution
					steps={activeSubTask.steps}
					finalResultText={activeSubTask.finalResultText}
					finalResultMath={activeSubTask.finalResultMath}
				/>
			{/key}

		</div>
	</div>
</div>