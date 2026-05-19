<script lang="ts">
	import TopicHeader from '$lib/components/TopicHeader.svelte';
	import ExerciseTask from '$lib/components/exercise/ExerciseTask.svelte';
	import ExerciseFormulas from '$lib/components/exercise/ExerciseFormulas.svelte';
	import ExerciseSolution from '$lib/components/exercise/ExerciseSolution.svelte';
	import type { Topic } from '$lib/data2/types.ts';
	// import type { TopicData } from '$lib/types';
	import {  inlineMath } from '$lib/data2/types';

	interface Data {
		topic: Topic
		// unitId: string,
		// topicId: string,
		// exercise: TopicData
	}

	interface Props {
		data: Data;
	}

	let { data }: Props = $props();

	let activeTab = $state<'explanation' | 'exercises'>('exercises');
	let activeExerciseIndex = $state(0);
	let activeSubTaskIndex = $state(0);

	// Steuert, ob der Lösungsweg rechts sichtbar ist
	let showSolution = $state(true);

	let activeExercise = $derived(data.topic.exercises[activeExerciseIndex]);
	let activeSubTask = $derived(activeExercise?.subTasks[activeSubTaskIndex]);

	// Wenn die Hauptaufgabe gewechselt wird, setzen wir alles zurück
	$effect(() => {
		const _ = activeExerciseIndex;
		activeSubTaskIndex = 0;
		showSolution = true; // Lösungsweg wieder einklappen
	});

	// --- SPLITTER STATE ---
	let leftWidth = $state(55); // Startbreite der linken Spalte (z.B. 55%)
	let isDragging = $state(false);
	let containerRef: HTMLElement | undefined = $state(); // Referenz auf den gesamten Grid-Container

	// Setzt die Body-Styles global, während gezogen wird
	$effect(() => {
		if (isDragging) {
			document.body.style.userSelect = 'none';
			document.body.style.cursor = 'col-resize';
		} else {
			document.body.style.userSelect = '';
			document.body.style.cursor = '';
		}
	});

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging || !containerRef) return;

		// Finde heraus, wo unser Container auf dem Bildschirm beginnt und wie breit er ist
		const rect = containerRef.getBoundingClientRect();

		// Berechne die neue Breite in Prozent
		let newWidth = ((e.clientX - rect.left) / rect.width) * 100;

		// Grenzen setzen: Die linke Spalte darf nicht kleiner als 30% und nicht größer als 70% werden
		if (newWidth < 30) newWidth = 30;
		if (newWidth > 70) newWidth = 70;

		leftWidth = newWidth;
	}

	function handleMouseUp() {
		isDragging = false;
	}
</script>

<svelte:window onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

<div class="w-full px-6 py-8 lg:px-10">

	<TopicHeader
		title={data.topic.title}
		subtitle={data.topic.subtitle}
		{activeTab}
		onTabChange={(tab) => activeTab = tab}
	/>

	{#if activeTab === 'explanation'}
		<div
			class="py-16 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner animate-in fade-in duration-300">
			<span class="text-3xl mb-3 block">📖</span>
			<h3 class="text-slate-700 font-bold mb-1">Theoretische Grundlagen</h3>
			<p class="text-sm max-w-md mx-auto leading-relaxed">
				Hier werden später die strukturierten Lehrbuchinhalte, Definitionen und Herleitungen des Themas eingebunden.
			</p>
		</div>
	{:else}
		<div class="flex flex-col gap-6 animate-in fade-in duration-300">

			{#if data.topic.exercises.length > 1}
				<div class="flex flex-wrap gap-2">
					{#each data.topic.exercises as _, index (index)}
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

			<div
				bind:this={containerRef}
				style="--left-width: {leftWidth}%;"
				class="grid grid-cols-1 lg:grid-cols-[var(--left-width)_32px_1fr] gap-y-10 relative"
			>

				<div class="flex flex-col gap-6 h-max">
					{#key activeExerciseIndex}
						<ExerciseTask
							verified={activeExercise.verified || false}
							title={activeExercise.title}
							descriptionTemplate={activeExercise.descriptionTemplate}
							given={activeExercise.given}
							sourceType={activeExercise.sourceType}
							sourceDetails={activeExercise.sourceDetails}
							dataTable={activeExercise.inputTable}
							subTasks={activeExercise.subTasks}
							formulas={data.topic.formulas}
							onShowSolution={(index) => {
            activeSubTaskIndex = index; // Wechselt zum entsprechenden Tab
            showSolution = true;        // Blendet den Lösungsweg rechts ein
        }}
						/>

						{#if data.topic.formulas && data.topic.formulas.length > 0}
							<ExerciseFormulas formulas={data.topic.formulas} />
						{/if}
					{/key}
				</div>

				<div
					class="hidden lg:flex w-full h-full justify-center items-stretch cursor-col-resize group z-10"
					onmousedown={() => isDragging = true}
					role="separator"
					aria-orientation="vertical"
					tabindex="0"
				>
					<div class="w-1 h-full rounded-full transition-all duration-200 ease-in-out
            {isDragging ? 'bg-indigo-500 w-1.5' : 'bg-slate-200 group-hover:bg-indigo-300'}"
					></div>
				</div>

				<div class="h-full">
					<div class="lg:sticky lg:top-8 flex flex-col gap-4">
						{#key activeExerciseIndex}

							{#if !showSolution}

								<div
									class="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 shadow-sm flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-200">
									<span class="text-4xl mb-4">🧩</span>
									<h4 class="text-slate-700 font-bold mb-1">Lösungsweg ausgeblendet</h4>
									<p class="text-xs max-w-xs mx-auto leading-relaxed text-slate-400">
										Klicke bei einer der Teilaufgaben links auf <strong class="text-indigo-600">„Lösungsweg
										anzeigen“</strong>, um die detaillierten Rechenschritte hier einzublenden.
									</p>
								</div>

							{:else}

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
									<div
										class="bg-indigo-50/50 border border-indigo-100/70 p-4 rounded-xl shadow-sm flex items-start gap-3 animate-in fade-in duration-200">
              <span
	              class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  {activeSubTask.label}
              </span>
										<span class="font-semibold text-slate-700 text-sm leading-relaxed pt-px">
                   {@html inlineMath(activeSubTask.question)}
              </span>
									</div>

									{#key activeSubTaskIndex}
										<ExerciseSolution
											steps={activeSubTask.steps}
										/>
									{/key}
								{/if}

							{/if}

						{/key}
					</div>
				</div>

			</div>
		</div>
	{/if}
</div>