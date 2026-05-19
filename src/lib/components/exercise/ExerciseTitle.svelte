<script lang="ts">
	interface Props {
		title: string;
		sourceType?: string;
		sourceDetails?: string | null;
		verified: boolean;
	}

	let { title, sourceType, sourceDetails, verified }: Props = $props();

</script>

<div class="flex justify-between items-start mb-8">

	<div>
		<span class="text-xs font-bold text-indigo-500 uppercase tracking-wider">Übungsaufgabe</span>
		<div class="flex items-center gap-3 mt-1">
			<h2 class="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h2>

			{#if sourceType}
				<div class="group/source relative flex items-center">
						<span
							class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold shadow-sm cursor-help">
							{#if sourceType === 'Klausur'}📝 Klausur
							{:else if sourceType === 'Skript'}📖 Skript
							{:else if sourceType === 'AI-generated'}🤖 AI-generiert
							{:else if sourceType === 'Manuell'}✍️ Manuell
							{:else}📌 {sourceType}
							{/if}
						</span>
					{#if sourceDetails}
						<div
							class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] lg:max-w-xs opacity-0 group-hover/source:opacity-100 transition-opacity bg-slate-800 text-white text-xs rounded-lg py-2 px-3 pointer-events-none z-10 text-center shadow-lg whitespace-normal">
							{sourceDetails}
							<div
								class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
						</div>
					{/if}
				</div>
			{/if}

			<div class="group relative flex items-center">
				{#if verified}
						<span
							class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-help">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
								      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
								      clip-rule="evenodd" />
							</svg>
							Verifiziert
						</span>
					<div
						class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] lg:max-w-xs opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs rounded-lg py-2 px-3 pointer-events-none z-10 text-center shadow-lg whitespace-normal">
						Diese Aufgabe wurde manuell auf Korrektheit überprüft
						<div
							class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
					</div>
				{:else}
						<span
							class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 cursor-help">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
								      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
								      clip-rule="evenodd" />
							</svg>
							Beta
						</span>
					<div
						class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] lg:max-w-xs opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs rounded-lg py-2 px-3 pointer-events-none z-10 text-center shadow-lg whitespace-normal">
						Diese Aufgabe wurde automatisch generiert und noch nicht manuell auf Korrektheit überprüft
						<div
							class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
					</div>
				{/if}
			</div>
		</div>
	</div>

</div>
