<script lang="ts">
	import type { Step } from '$lib/data2/types';
	import StepRevealBox from '$lib/components/exercise/StepRevealBox.svelte';
	import { slide } from 'svelte/transition';
	import { inlineMath } from '$lib/data2/types';

	interface Props {
		step: Step;
		stepNumber: number;
		isOpen: boolean;
		isRevealed: boolean;
		onToggle: () => void;
		onReveal: () => void;
		isLast: boolean;
	}

	let { onReveal, onToggle, step, stepNumber, isOpen, isRevealed, isLast }: Props = $props();

</script>
<div class="relative pl-10">

	{#if !isLast}
		<div class="absolute left-[15px] top-10 bottom-[-24px] w-[2px] bg-slate-100"></div>
	{/if}

	<div class="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs z-10 transition-all duration-300
                    {isOpen ? 'bg-indigo-600 text-white ring-4 ring-indigo-50' : 'bg-white border-2 border-slate-200 text-slate-400'}">
		{stepNumber}
	</div>

	<div
		class="border rounded-xl transition-all duration-300 {isOpen ? 'border-indigo-200 shadow-sm' : 'border-slate-100'}">

		<button
			onclick={() => {onToggle(); console.log('toggle step', stepNumber);}}
			class="w-full flex items-center justify-between p-4 text-left"
		>
			<div class="flex flex-col">
            <span
							class="text-[10px] font-bold uppercase tracking-[0.2em] {isOpen ? 'text-indigo-600' : 'text-slate-400'}">
                Schritt {stepNumber}
            </span>
				<span class="font-bold text-sm {isOpen ? 'text-slate-900' : 'text-slate-600'}">
                {@html inlineMath(step.title)}
            </span>
			</div>
			<span class="text-slate-300 transition-transform duration-300 {isOpen ? 'rotate-180 text-indigo-400' : ''}">
            ⌄
       </span>
		</button>

		{#if isOpen}
			<div transition:slide={{ duration: 300 }} class="px-4 pb-5 flex flex-col gap-4">
				<p class="text-sm text-slate-500 leading-relaxed pl-1">
					{#if step.description}
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html inlineMath(step.description)}
					{/if}
				</p>

				<StepRevealBox
					step={step}
					isRevealed={isRevealed}
					onReveal={() => onReveal()}
				/>

			</div>
		{/if}
	</div>
</div>