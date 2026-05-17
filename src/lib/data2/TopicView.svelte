<!--
  Benötigt: npm install katex
  Benötigt in app.html oder +layout.svelte:
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css" />
-->

<script lang="ts">
	import katex from 'katex';
	import type { Topic, Formula, GivenItem, Step } from '$lib/data2/types';
	import { interpolate, resolveFormulaRefs, isGivenValue, isGivenFormula } from '$lib/data2/types';

	let { topic }: { topic: Topic } = $props();

	// -------------------------------------------------------------------------
	// State
	// -------------------------------------------------------------------------

	let selectedExerciseIdx = $state(0);
	let selectedSubTaskIdx  = $state(0);
	let givenOpen           = $state(false);
	let formulasOpen        = $state(false);

	// -------------------------------------------------------------------------
	// Derived
	// -------------------------------------------------------------------------

	const exercise = $derived(topic.exercises[selectedExerciseIdx]);
	const subTask  = $derived(exercise.subTasks[selectedSubTaskIdx]);

	const description       = $derived(interpolate(exercise.descriptionTemplate, exercise.given));
	const relevantFormulas  = $derived(resolveFormulaRefs(subTask, topic));

	// -------------------------------------------------------------------------
	// Hilfsfunktionen
	// -------------------------------------------------------------------------

	function math(latex: string, display = false): string {
		return katex.renderToString(latex, { displayMode: display, throwOnError: false });
	}

	/** Ersetzt $...$-Ausdrücke in Fließtext durch KaTeX-HTML */
	function inlineMath(text: string): string {
		return text.replace(/\$([^$]+)\$/g, (_, latex) => math(latex, false));
	}

	function selectExercise(i: number) {
		selectedExerciseIdx = i;
		selectedSubTaskIdx  = 0;   // SubTask-Auswahl zurücksetzen
		givenOpen           = false;
		formulasOpen        = false;
	}

	const stepLabels: Record<Step['type'], string> = {
		formula:      'Formel',
		substitution: 'Einsetzen',
		calculation:  'Rechnung',
		result:       'Ergebnis',
	};
</script>

<!-- =========================================================================
     Topic-Header
     ========================================================================= -->

<div class="topic">
	<header class="topic-header">
		<h1>{topic.title}</h1>
		{#if topic.subtitle}
			<p class="subtitle">{topic.subtitle}</p>
		{/if}
	</header>

	<!-- =======================================================================
			 Exercise-Tabs (nur anzeigen wenn mehrere Aufgaben vorhanden)
			 ======================================================================= -->

	{#if topic.exercises.length > 1}
		<nav class="exercise-tabs">
			{#each topic.exercises as ex, i}
				<button
					class="tab"
					class:active={i === selectedExerciseIdx}
					onclick={() => selectExercise(i)}
				>
					Aufgabe {i + 1}
				</button>
			{/each}
		</nav>
	{/if}

	<!-- =======================================================================
			 Aktuelle Exercise
			 ======================================================================= -->

	<section class="exercise">
		<h2>{exercise.title}</h2>

		<!-- Aufgabenstellung (interpolierter Fließtext) -->
		<div class="description">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html inlineMath(description)}
		</div>

		<!-- Optionale Aufgaben-Tabelle (z.B. Verbrauchswerte bei Prognose) -->
		{#if exercise.inputTable}
			<div class="input-table">
				<table>
					<thead>
					<tr>
						{#each exercise.inputTable.headers as header}
							<th>{header}</th>
						{/each}
					</tr>
					</thead>
					<tbody>
					{#each exercise.inputTable.rows as row}
						<tr>
							{#each row as cell}
								<td>{cell}</td>
							{/each}
						</tr>
					{/each}
					</tbody>
				</table>
			</div>
		{/if}

		<!-- Gegeben-Tabelle (aufklappbar) -->
		<details class="given-details" bind:open={givenOpen}>
			<summary>Gegeben anzeigen</summary>
			<table class="given-table">
				<thead>
				<tr>
					<th>Symbol</th>
					<th>Wert</th>
					<th>Beschreibung</th>
				</tr>
				</thead>
				<tbody>
				{#each exercise.given as item}
					<tr>
						<td class="mono">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html math(item.symbol)}
						</td>
						<td>
							{#if isGivenValue(item)}
								{item.value}{item.unit ? ' ' + item.unit : ''}
							{:else}
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html math(item.math)}
							{/if}
						</td>
						<td>{item.label}</td>
					</tr>
				{/each}
				</tbody>
			</table>
		</details>

		<!-- =====================================================================
				 SubTask-Tabs
				 ===================================================================== -->

		<nav class="subtask-tabs">
			{#each exercise.subTasks as st, i}
				<button
					class="tab"
					class:active={i === selectedSubTaskIdx}
					onclick={() => (selectedSubTaskIdx = i)}
				>
					({st.label})
				</button>
			{/each}
		</nav>

		<!-- =====================================================================
				 Aktuelle SubTask
				 ===================================================================== -->

		<div class="subtask">
			<p class="question">{@html inlineMath(subTask.question)}</p>

			<!-- Relevante Formeln (aufklappbar) -->
			{#if relevantFormulas.length > 0}
				<details class="formulas-details" bind:open={formulasOpen}>
					<summary>Relevante Formeln ({relevantFormulas.length})</summary>
					<div class="formulas">
						{#each relevantFormulas as formula}
							<div class="formula-card">
								<div class="formula-name">{formula.name}</div>

								<!-- Formel -->
								<div class="formula-math">
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html math(formula.math, true)}
								</div>

								<!-- Ergebnis-Symbol -->
								{#if formula.result}
									<div class="formula-result">
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html math(formula.result.symbol)}
										= {formula.result.description}
									</div>
								{/if}

								<!-- Parameterlegende -->
								{#if formula.params && formula.params.length > 0}
									<ul class="formula-params">
										{#each formula.params as param}
											<li>
												<!-- eslint-disable-next-line svelte/no-at-html-tags -->
												{@html math(param.symbol)}
												— {param.description}
											</li>
										{/each}
									</ul>
								{/if}
							</div>
						{/each}
					</div>
				</details>
			{/if}

			<!-- ===================================================================
					 Lösungsschritte
					 =================================================================== -->

			<ol class="steps">
				{#each subTask.steps as step}
					<li class="step step--{step.type}">
						<div class="step-header">
							<span class="step-badge">{stepLabels[step.type]}</span>
							<span class="step-title">{step.title}</span>
						</div>

						{#if step.description}
							<p class="step-description">{@html inlineMath(step.description ?? "")}</p>
						{/if}

						{#if step.math}
							<div class="step-math">
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html math(step.math, true)}
							</div>
						{/if}

						<!-- Optionale Zwischenergebnis-Tabelle -->
						{#if step.dataTable}
							<table class="step-table">
								<thead>
								<tr>
									{#each step.dataTable.headers as header}
										<th>{header}</th>
									{/each}
								</tr>
								</thead>
								<tbody>
								{#each step.dataTable.rows as row}
									<tr>
										{#each row as cell}
											<td>{cell}</td>
										{/each}
									</tr>
								{/each}
								</tbody>
							</table>
						{/if}
					</li>
				{/each}
			</ol>
		</div>
	</section>
</div>

<!-- =========================================================================
     Styles
     ========================================================================= -->

<style>
    .topic {
        max-width: 860px;
        margin: 0 auto;
        font-family: system-ui, sans-serif;
    }

    /* Header */
    .topic-header { margin-bottom: 1.5rem; }
    h1 { font-size: 1.75rem; margin: 0 0 0.25rem; }
    h2 { font-size: 1.25rem; margin: 0 0 1rem; }
    .subtitle { color: #666; margin: 0; }

    /* Tabs */
    .exercise-tabs,
    .subtask-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .tab {
        padding: 0.4rem 1rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        background: none;
        cursor: pointer;
        font-size: 0.9rem;
    }
    .tab.active {
        background: #1a1a2e;
        color: #fff;
        border-color: #1a1a2e;
    }

    /* Aufgabenstellung */
    .exercise { margin-bottom: 2rem; }
    .description {
        background: #f8f8f8;
        border-left: 3px solid #ccc;
        padding: 0.75rem 1rem;
        border-radius: 0 6px 6px 0;
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    /* Tabellen */
    table {
        border-collapse: collapse;
        width: 100%;
        font-size: 0.9rem;
        margin: 0.5rem 0;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 0.4rem 0.75rem;
        text-align: left;
    }
    th { background: #f0f0f0; font-weight: 600; }
    .mono { font-family: monospace; }

    /* Gegeben & Formeln */
    details { margin-bottom: 1rem; }
    summary {
        cursor: pointer;
        font-size: 0.9rem;
        color: #555;
        padding: 0.4rem 0;
        user-select: none;
    }
    summary:hover { color: #000; }
    .given-table { margin-top: 0.5rem; }
    .input-table { margin-bottom: 1rem; }

    /* Formelkarten */
    .formulas {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 0.75rem 0;
    }
    .formula-card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 0.75rem 1rem;
        background: #fafafa;
    }
    .formula-name {
        font-weight: 600;
        font-size: 0.85rem;
        color: #555;
        margin-bottom: 0.5rem;
    }
    .formula-math { margin: 0.5rem 0; overflow-x: auto; }
    .formula-result {
        font-size: 0.85rem;
        color: #444;
        margin-top: 0.25rem;
    }
    .formula-params {
        margin: 0.5rem 0 0;
        padding-left: 1.25rem;
        font-size: 0.85rem;
        color: #555;
        line-height: 1.8;
    }

    /* SubTask */
    .subtask-tabs { margin-top: 1.5rem; }
    .question {
        font-weight: 600;
        margin: 0 0 1rem;
        font-size: 1rem;
        line-height: 1.5;
    }

    /* Steps */
    .steps {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .step {
        border-radius: 8px;
        padding: 0.75rem 1rem;
        border-left: 4px solid transparent;
    }

    .step--formula      { background: #eff6ff; border-color: #3b82f6; }
    .step--substitution { background: #fefce8; border-color: #eab308; }
    .step--calculation  { background: #f0fdf4; border-color: #22c55e; }
    .step--result       { background: #fdf4ff; border-color: #a855f7; font-weight: 600; }

    .step-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.4rem;
    }

    .step-badge {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 0.15rem 0.5rem;
        border-radius: 4px;
        background: rgba(0,0,0,0.08);
    }

    .step-title { font-weight: 600; font-size: 0.95rem; }

    .step-description {
        font-size: 0.88rem;
        color: #555;
        margin: 0.25rem 0 0.5rem;
        line-height: 1.5;
    }

    .step-math {
        overflow-x: auto;
        padding: 0.5rem 0;
    }

    .step-table { margin-top: 0.5rem; }
</style>