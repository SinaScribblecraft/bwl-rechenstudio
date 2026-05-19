<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		name: string;
		currentAmount: number;
		maxAmount: number;
		hasWarning?: boolean;
		icon?: Snippet;
		onclick?: () => void;
	}

	let {
		name,
		currentAmount = 0,
		maxAmount = 100,
		hasWarning = false,
		icon,
		onclick
	}: Props = $props();

	let progressPercent = $derived(
		maxAmount > 0 ? Math.min(100, Math.max(0, (currentAmount / maxAmount) * 100)) : 0
	);

	let progressColor = $derived(
		hasWarning || progressPercent <= 25
			? '#d94a3e' // Red for warning/low
			: progressPercent <= 50
			? '#d4af37' // Yellow for medium
			: '#8fb359' // Green for adequate
	);
</script>

<button
	class="flex items-center gap-4 w-full p-2 rounded-xl transition-colors hover:bg-[#342721] group text-left border border-transparent hover:border-[#4a3931]"
	type="button"
	{onclick}
>
	<!-- Zutat-Icon -->
	<div class="w-8 h-8 flex-shrink-0 flex items-center justify-center">
		{#if icon}
			{@render icon()}
		{:else}
			<div class="w-6 h-6 bg-[#9a8677] rounded flex-shrink-0 mask mask-squircle"></div>
		{/if}
	</div>

	<div class="flex flex-col flex-grow">
		<div class="flex justify-between items-center mb-1">
			<span class="text-[#cfc09f] font-medium text-sm group-hover:text-[#e9deb6] transition-colors">{name}</span>
			<div class="flex items-center gap-2">
				<span class="text-[#9a8677] text-xs font-medium font-mono">{currentAmount} / {maxAmount}</span>
				{#if hasWarning}
					<!-- Warn-Icon (Gelbes Dreieck) -->
					<svg class="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
					</svg>
				{/if}
			</div>
		</div>

		<!-- Fortschrittsbalken -->
		<div class="w-full h-1 bg-[#1a1513] rounded-full overflow-hidden">
			<div
				class="h-full rounded-full transition-all duration-300"
				style="width: {progressPercent}%; background-color: {progressColor};"
			></div>
		</div>
	</div>
</button>
