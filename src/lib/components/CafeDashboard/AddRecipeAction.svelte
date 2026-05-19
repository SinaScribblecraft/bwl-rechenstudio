<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		buttonText?: string;
		onAddClick?: () => void;
	}

	let {
		title = 'Neues Gericht hinzufügen',
		description = 'Erstelle ein neues Getränk, eine Speise oder ein Dessert.',
		buttonText = 'Hinzufügen',
		onAddClick
	}: Props = $props();
</script>

<div class="flex items-center justify-between bg-[#241e1b] rounded-2xl p-4 border border-[#342721] w-full">
	<div class="flex items-center gap-4">
		<!-- Plus Icon left -->
		<button
			type="button"
			class="w-12 h-12 rounded-full border-2 border-[#7a6a5d] flex items-center justify-center text-[#7a6a5d] hover:text-[#e9deb6] hover:border-[#e9deb6] transition-colors"
			onclick={onAddClick}
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
			</svg>
		</button>

		<!-- Text -->
		<div class="flex flex-col">
			<h3 class="text-[#e9deb6] font-bold text-lg">{title}</h3>
			<p class="text-[#9a8677] text-sm">{description}</p>
		</div>
	</div>

	<!-- Add Button right -->
	<button
		type="button"
		class="px-6 py-2 bg-[#342721] text-[#9a8677] font-medium rounded-xl hover:bg-[#4a3931] hover:text-[#e9deb6] transition-colors"
		onclick={onAddClick}
	>
		{buttonText}
	</button>
</div>
