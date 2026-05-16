<script lang="ts">
	import TopicHeader from '$lib/components/TopicHeader.svelte';
	import ExerciseTask from '$lib/components/exercise/ExerciseTask.svelte';
	import ExerciseFormulas from '$lib/components/exercise/ExerciseFormulas.svelte';
	import ExerciseSolution from '$lib/components/exercise/ExerciseSolution.svelte';

	let { data } = $props();

	let activeTab = $state<'explanation' | 'exercises'>('exercises');
	let activeExerciseIndex = $state(0);
	let activeSubTaskIndex = $state(0);

	// KORREKTUR: Hier greifen wir jetzt über data.exercise auf die Liste zu!
	let activeExercise = $derived(data.exercise.exercises[activeExerciseIndex]);
	let activeSubTask = $derived(activeExercise?.subTasks[activeSubTaskIndex]);

	$effect(() => {
		const _ = activeExerciseIndex;
		activeSubTaskIndex = 0;
	});
</script>

<div class="w-full max-w-[1600px] mx-auto px-6 py-8">

	<TopicHeader
		title={data.exercise.title}
		subtitle={data.exercise.subtitle}
		{activeTab}
		onTabChange={(tab) => activeTab = tab}
	/>

	{#if activeTab === 'explanation'}
		<div class="py-16 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner animate-in fade-in duration-300">
			<span class="text-3xl mb-3 block">📖</span>
			<h3 class="text-slate-700 font-bold mb-1">Theoretische Grundlagen</h3>
			<p class="text-sm max-w-md mx-auto leading-relaxed">
				Hier werden später die strukturierten Lehrbuchinhalte, Definitionen und Herleitungen des Themas eingebunden.
			</p>
		</div>
	{:else}
		<div class="flex flex-col gap-6 animate-in fade-in duration-300">

			{#if data.exercise.exercises.length > 1}
				<div class="flex flex-wrap gap-2">
					{#each data.exercise.exercises as _, index}
						<button
							onclick={() => activeExerciseIndex = index}
							class="px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm border
                                {activeExerciseIndex === index
                                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800'}"
						>
							Aufgabe {index + 1}
						</button>
					{/each}
				</div>
			{/if}

			<div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">

				<div class="flex flex-col gap-6">
					{#key activeExerciseIndex}
						<ExerciseTask
							title={activeExercise.title}
							description={activeExercise.description}
							dataTable={activeExercise.dataTable}
							subTasks={activeExercise.subTasks}
						/>

						{#if activeExercise.formulas && activeExercise.formulas.length > 0}
							<ExerciseFormulas formulas={activeExercise.formulas} />
						{/if}
					{/key}
				</div>

				<div class="lg:sticky lg:top-8 flex flex-col gap-4">
					{#key activeExerciseIndex}

						{#if activeExercise.subTasks.length > 1}
							<div class="flex p-1 bg-slate-100 rounded-xl border border-slate-200/60 shadow-inner">
								{#each activeExercise.subTasks as subTask, index}
									<button
										onclick={() => activeSubTaskIndex = index}
										class="flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all
                                            {activeSubTaskIndex === index
                                                ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/30'
                                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/40'}"
									>
										Teilaufgabe {subTask.label})
									</button>
								{/each}
							</div>
						{/if}

						{#if activeSubTask}
							<div class="bg-indigo-50/50 border border-indigo-100/70 p-4 rounded-xl shadow-sm flex items-start gap-3">
                                <span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                                    {activeSubTask.label}
                                </span>
								<span class="font-semibold text-slate-700 text-sm leading-relaxed pt-px">
                                    {activeSubTask.question}
                                </span>
							</div>

							{#key activeSubTaskIndex}
								<ExerciseSolution
									steps={activeSubTask.steps}
									finalResultText={activeSubTask.finalResultText}
									finalResultMath={activeSubTask.finalResultMath}
								/>
							{/key}
						{/if}

					{/key}
				</div>

			</div>
		</div>
	{/if}
</div>