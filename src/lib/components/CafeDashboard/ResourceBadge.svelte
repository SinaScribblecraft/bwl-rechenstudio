<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		icon?: Snippet;
		label?: string;
		valueText?: string;
		showProgress?: boolean;
		currentValue?: number;
		maxValue?: number;
		hasAddButton?: boolean;
		onAddClick?: () => void;
	}

	let {
		icon,
		label,
		valueText,
		showProgress = false,
		currentValue = 0,
		maxValue = 100,
		hasAddButton = false,
		onAddClick
	}: Props = $props();

	let progressPercent = $derived(
		maxValue > 0 ? Math.min(100, Math.max(0, (currentValue / maxValue) * 100)) : 0
	);
</script>

<div class="flex items-center gap-3 bg-[#241e1b] border-2 border-[#342721] px-4 py-2 rounded-2xl h-14">
	{#if icon}
		<div class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#cfc09f]">
			{@render icon()}
		</div>
	{:else}
		<div class="w-6 h-6 bg-[#342721] rounded-full flex-shrink-0"></div>
	{/if}

	<div class="flex flex-col flex-grow justify-center {showProgress ? 'gap-1' : ''}">
		<div class="flex items-center gap-2">
			{#if label}
				<span class="text-[#9a8677] font-medium">{label}</span>
			{/if}
			{#if valueText}
				<span class="text-[#e9deb6] font-medium tracking-wide">{valueText}</span>
			{/if}
		</div>

		{#if showProgress}
			<div class="w-32 h-1.5 bg-[#1a1513] rounded-full overflow-hidden">
				<div
					class="h-full bg-[#8fb359] rounded-full transition-all duration-300"
					style="width: {progressPercent}%"
				></div>
			</div>
		{/if}
	</div>

	{#if hasAddButton}
		<button
			type="button"
			class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#342721] hover:bg-[#cfc09f] hover:text-[#362720] text-[#cfc09f] rounded-lg transition-colors ml-2 font-bold text-xl"
			onclick={onAddClick}
		>
			+
		</button>
	{/if}
</div>
