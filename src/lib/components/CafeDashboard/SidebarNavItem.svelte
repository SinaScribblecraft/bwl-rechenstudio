<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		isActive?: boolean;
		icon?: Snippet;
		onclick?: () => void;
	}

	let { label, isActive = false, icon, onclick }: Props = $props();
</script>

<button
	class="flex items-center gap-4 w-full px-4 py-3 rounded-2xl transition-colors border-2 {isActive ? 'bg-[#e9deb6] border-[#cfc09f] text-[#362720] shadow-sm font-bold' : 'bg-transparent border-transparent text-[#9a8677] hover:bg-[#342721] hover:text-[#e9deb6] font-medium'}"
	{onclick}
	type="button"
>
	{#if icon}
		<div class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
			{@render icon()}
		</div>
	{:else}
		<svg
			class="flex-shrink-0 w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			></path>
		</svg>
	{/if}
	<span class="text-lg tracking-wide">{label}</span>
</button>
