<script lang="ts">

	import { math } from '$lib/actions/math';

	interface Props {
		finalResultText?: string;
		finalResultMath?: string;
		isRevealed: boolean;
		onRevealClick: () => void;
	}

	let { onRevealClick, finalResultText, finalResultMath, isRevealed }: Props = $props();


</script>
<div class="mt-4 p-5 bg-emerald-50/50 border-t border-emerald-100 flex items-center justify-between">
	<div class="flex flex-col gap-1">
        <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Endergebnis
        </span>
		{#if isRevealed}
			<div class="animate-in fade-in slide-in-from-left-2 flex flex-col gap-2 mt-2">
				{#if finalResultText}
					<span class="text-sm font-medium text-emerald-700">{finalResultText}</span>
				{/if}
				{#if finalResultMath}
            <span class="text-xl text-emerald-900 font-bold [&_.katex-display]:!m-0 [&_.katex-display]:!inline-block">
                <span use:math={finalResultMath}></span>
            </span>
				{/if}
			</div>
		{/if}
	</div>

	{#if !isRevealed}
		<button
			onclick={() => onRevealClick()}
			class="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
		>
			👁️ Lösung prüfen
		</button>
	{/if}
</div>