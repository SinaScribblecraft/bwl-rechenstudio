<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		icon?: Snippet;
		badgeCount?: number;
		onclick?: () => void;
	}

	let { icon, badgeCount = 0, onclick }: Props = $props();
</script>

<button
	type="button"
	class="relative flex items-center justify-center w-14 h-14 bg-[#241e1b] border-2 border-[#342721] rounded-2xl hover:bg-[#342721] transition-colors text-[#cfc09f]"
	{onclick}
>
	{#if icon}
		<div class="w-6 h-6 flex items-center justify-center">
			{@render icon()}
		</div>
	{:else}
		<svg
			class="w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
			></path>
		</svg>
	{/if}

	{#if badgeCount > 0}
		<div
			class="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-[#d94a3e] text-[#f2e8d5] text-xs font-bold rounded-full border-2 border-[#1a1513]"
		>
			{badgeCount}
		</div>
	{/if}
</button>
