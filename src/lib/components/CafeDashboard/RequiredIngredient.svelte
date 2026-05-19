<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		icon?: Snippet;
		requiredAmount: number;
		stockAmount: number;
	}

	let { icon, requiredAmount, stockAmount }: Props = $props();

	let hasEnough = $derived(stockAmount >= requiredAmount);
</script>

<div class="flex flex-col items-center gap-1 group">
	<div
		class="w-12 h-12 flex items-center justify-center rounded-lg bg-transparent border-2 border-transparent transition-colors {hasEnough ? '' : 'border-[#d94a3e]/30 bg-[#d94a3e]/5'} group-hover:bg-[#342721] group-hover:border-[#342721]"
	>
		{#if icon}
			{@render icon()}
		{:else}
			<div class="w-8 h-8 bg-gray-500 rounded-md mask mask-squircle"></div>
		{/if}
	</div>
	<span class="text-sm font-medium tracking-wide {hasEnough ? 'text-[#9a8677]' : 'text-[#d94a3e]'}">
		{requiredAmount}/{stockAmount}
	</span>
</div>
