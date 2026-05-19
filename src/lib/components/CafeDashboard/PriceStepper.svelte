<script lang="ts">
	interface Props {
		value?: number;
		step?: number;
		min?: number;
		max?: number;
		onchange?: (newValue: number) => void;
	}

	let {
		value = $bindable(0),
		step = 0.1,
		min = 0,
		max = Infinity,
		onchange
	}: Props = $props();

	function handleMinus() {
		if (value > min) {
			const newValue = Math.max(min, value - step);
			value = Number(newValue.toFixed(2));
			onchange?.(value);
		}
	}

	function handlePlus() {
		if (value < max) {
			const newValue = Math.min(max, value + step);
			value = Number(newValue.toFixed(2));
			onchange?.(value);
		}
	}

	let formattedValue = $derived(
		value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
	);

	let canDecrease = $derived(value > min);
	let canIncrease = $derived(value < max);
</script>

<div class="flex items-center bg-[#dcd2ba] rounded-xl overflow-hidden shadow-inner w-32 h-10 border border-[#b8ab91]">
	<button
		type="button"
		class="w-10 h-full flex items-center justify-center bg-[#342721] text-[#cfc09f] transition-colors disabled:opacity-50 {canDecrease ? 'hover:bg-[#4a3931] cursor-pointer' : 'cursor-not-allowed'}"
		onclick={handleMinus}
		disabled={!canDecrease}
	>
		<span class="text-xl font-bold leading-none select-none">-</span>
	</button>

	<div class="flex-grow flex items-center justify-center font-bold text-[#362720] tracking-wide select-none">
		{formattedValue}
	</div>

	<button
		type="button"
		class="w-10 h-full flex items-center justify-center bg-[#342721] text-[#cfc09f] transition-colors disabled:opacity-50 {canIncrease ? 'hover:bg-[#4a3931] cursor-pointer' : 'cursor-not-allowed'}"
		onclick={handlePlus}
		disabled={!canIncrease}
	>
		<span class="text-xl font-bold leading-none select-none">+</span>
	</button>
</div>
