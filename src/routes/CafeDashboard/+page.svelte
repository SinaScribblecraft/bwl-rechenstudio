<script lang="ts">
	import SidebarNavItem from '$lib/components/CafeDashboard/SidebarNavItem.svelte';
	import ResourceBadge from '$lib/components/CafeDashboard/ResourceBadge.svelte';
	import ActionIconButton from '$lib/components/CafeDashboard/ActionIconButton.svelte';
	import MenuItemCard from '$lib/components/CafeDashboard/MenuItemCard.svelte';
	import AddRecipeAction from '$lib/components/CafeDashboard/AddRecipeAction.svelte';
	import StockIngredientItem from '$lib/components/CafeDashboard/StockIngredientItem.svelte';

	// ================= MOCK DATA =================

	// Sidebar
	let navItems = [
		{ id: 'speisekarte', label: 'Speisekarte', isActive: true },
		{ id: 'bestellungen', label: 'Bestellungen', isActive: false },
		{ id: 'upgrades', label: 'Upgrades', isActive: false },
		{ id: 'dekoration', label: 'Dekoration', isActive: false },
		{ id: 'mitarbeiter', label: 'Mitarbeiter', isActive: false },
		{ id: 'statistiken', label: 'Statistiken', isActive: false }
	];

	// Menu Items
	let menuItems = $state([
		{
			idNumber: 1,
			title: 'Matcha Latte',
			description: 'Cremiger Matcha mit aufgeschäumter Milch.',
			ingredientCost: 1.45,
			sellPrice: 4.20,
			isActive: true,
			ingredients: [
				{ id: 'matcha', requiredAmount: 2, stockAmount: 20 },
				{ id: 'milch', requiredAmount: 8, stockAmount: 30 },
				{ id: 'zucker', requiredAmount: 15, stockAmount: 40 }
			]
		},
		{
			idNumber: 2,
			title: 'Raspberry Chocolate Cake',
			description: 'Saftiger Schokokuchen mit Himbeerfüllung.',
			ingredientCost: 2.30,
			sellPrice: 6.90,
			isActive: true,
			ingredients: [
				{ id: 'schoko', requiredAmount: 6, stockAmount: 25 },
				{ id: 'himbeer', requiredAmount: 10, stockAmount: 25 },
				{ id: 'mehl', requiredAmount: 12, stockAmount: 30 },
				{ id: 'zucker', requiredAmount: 15, stockAmount: 40 }
			]
		},
		{
			idNumber: 3,
			title: 'Caramel Macchiato',
			description: 'Espresso mit Milch und Karamellsirup.',
			ingredientCost: 1.30,
			sellPrice: 4.00,
			isActive: true,
			ingredients: [
				{ id: 'kaffee', requiredAmount: 5, stockAmount: 50 },
				{ id: 'milch', requiredAmount: 8, stockAmount: 30 },
				{ id: 'sirup', requiredAmount: 4, stockAmount: 20 }
			]
		},
		{
			idNumber: 4,
			title: 'Berry Pancakes',
			description: 'Fluffige Pancakes mit frischen Beeren und Sirup.',
			ingredientCost: 2.10,
			sellPrice: 6.50,
			isActive: false,
			ingredients: [
				{ id: 'mehl', requiredAmount: 12, stockAmount: 30 },
				{ id: 'eier', requiredAmount: 10, stockAmount: 20 },
				{ id: 'blaubeeren', requiredAmount: 8, stockAmount: 25 },
				{ id: 'erdbeeren', requiredAmount: 10, stockAmount: 25 }
			]
		}
	]);

	// Stock
	let stockItems = [
		{ name: 'Kaffeebohnen', currentAmount: 50, maxAmount: 100 },
		{ name: 'Milch', currentAmount: 30, maxAmount: 60 },
		{ name: 'Mehl', currentAmount: 30, maxAmount: 60 },
		{ name: 'Zucker', currentAmount: 40, maxAmount: 80 },
		{ name: 'Kakao', currentAmount: 25, maxAmount: 50 },
		{ name: 'Matcha Pulver', currentAmount: 20, maxAmount: 40 },
		{ name: 'Himbeeren', currentAmount: 25, maxAmount: 40 },
		{ name: 'Eier', currentAmount: 20, maxAmount: 40 },
		{ name: 'Erdbeeren', currentAmount: 15, maxAmount: 30, hasWarning: true },
		{ name: 'Karamellsirup', currentAmount: 20, maxAmount: 30 },
		{ name: 'Blaubeeren', currentAmount: 25, maxAmount: 40 }
	];
</script>

<div class="h-screen w-full bg-[#1a1513] text-[#cfc09f] p-4 flex gap-4 font-sans overflow-hidden">

	<!-- LEFT SIDEBAR -->
	<aside class="w-72 bg-[#241e1b] rounded-3xl border-2 border-[#342721] flex flex-col p-4">
		<!-- Brand Header -->
		<div class="flex items-center justify-center flex-col py-6 mb-4 border-b-2 border-[#342721]">
			<h1 class="text-3xl font-bold text-[#e9deb6] tracking-wider mb-1">Cozy Bean</h1>
			<p class="text-[#cfc09f] text-lg">Café</p>
		</div>

		<!-- Nav Navigation -->
		<nav class="flex flex-col gap-2 flex-grow overflow-y-auto pr-2">
			{#each navItems as item (item.id)}
				<SidebarNavItem label={item.label} isActive={item.isActive} />
			{/each}
		</nav>

		<!-- Bottom Date summary -->
		<div class="mt-4 pt-4 border-t-2 border-[#342721] flex items-center gap-4 px-2">
			<div class="w-10 h-10 bg-[#342721] rounded-lg"></div>
			<div>
				<div class="text-[#e9deb6] font-bold">Tag 42</div>
				<div class="text-[#9a8677] text-sm">Mittwoch</div>
			</div>
		</div>
	</aside>

	<!-- MAIN CONTENT AREA -->
	<div class="flex-grow flex flex-col gap-4">

		<!-- TOP BAR -->
		<header class="flex items-center gap-4">
			<!-- Resources -->
			<div class="flex items-center gap-4 bg-[#241e1b] p-2 rounded-2xl border-2 border-[#342721]">
				<ResourceBadge label="Lv." valueText="18" showProgress={true} currentValue={1240} maxValue={2500} />
				<div class="w-px h-8 bg-[#342721]"></div>
				<ResourceBadge valueText="4/4" hasAddButton={true} />
				<div class="w-px h-8 bg-[#342721]"></div>
				<ResourceBadge valueText="12.750" />
			</div>

			<div class="flex-grow"></div>

			<!-- Action Buttons -->
			<div class="flex items-center gap-3">
				<ActionIconButton />
				<ActionIconButton />
				<ActionIconButton />
				<ActionIconButton badgeCount={2} />
			</div>
		</header>

		<!-- MAIN DASHBOARD SPLIT -->
		<main class="flex gap-4 flex-grow overflow-hidden">

			<!-- MENU PLANNER (Center) -->
			<section class="flex-grow bg-[#241e1b] rounded-3xl border-2 border-[#342721] flex flex-col p-6 overflow-hidden">

				<!-- Planner Header -->
				<div class="flex justify-between items-start mb-6">
					<div>
						<h2 class="text-3xl font-bold text-[#e9deb6] flex items-center gap-3 mb-2">
							<div class="w-8 h-8 bg-[#342721] rounded-md"></div>
							Speisekarten-Planer
						</h2>
						<p class="text-[#9a8677]">Plane dein Menü, lege Preise fest und behalte deine Kosten im Blick.</p>
					</div>

					<div class="flex gap-3 bg-[#1a1513] p-1 rounded-xl">
						<button class="px-6 py-2 bg-[#e9deb6] text-[#362720] rounded-lg font-bold shadow-sm">Menü</button>
						<button class="px-6 py-2 text-[#9a8677] hover:text-[#e9deb6] font-medium transition-colors">Rezepte</button>
					</div>
				</div>

				<!-- Menu List -->
				<div class="flex flex-col gap-5 flex-grow overflow-y-auto pr-2 custom-scrollbar pb-6">
					{#each menuItems as item (item.idNumber)}
						<MenuItemCard
							idNumber={item.idNumber}
							title={item.title}
							description={item.description}
							ingredients={item.ingredients}
							ingredientCost={item.ingredientCost}
							bind:sellPrice={item.sellPrice}
							bind:isActive={item.isActive}
						/>
					{/each}

					<AddRecipeAction />
				</div>
			</section>

			<!-- INVENTORY (Right) -->
			<aside class="w-80 bg-[#241e1b] rounded-3xl border-2 border-[#342721] flex flex-col p-5">
				<h2 class="text-2xl font-bold text-[#e9deb6] mb-5 flex items-center gap-3">
					<div class="w-8 h-8 bg-[#342721] rounded-md"></div>
					Zutatenlager
				</h2>

				<!-- Filters -->
				<div class="flex justify-between mb-4 bg-[#1a1513] p-1 rounded-xl">
					<button class="flex-grow py-2 bg-[#e9deb6] text-[#362720] rounded-lg font-bold shadow-sm text-sm">Alle Zutaten</button>
					<button class="flex-grow py-2 text-[#9a8677] hover:text-[#e9deb6] font-medium text-sm transition-colors flex items-center justify-center gap-2">
						Warnungen <span class="bg-[#d94a3e] text-[#f2e8d5] text-[10px] px-1.5 py-0.5 rounded-full font-bold">3</span>
					</button>
				</div>

				<!-- Ingredients List -->
				<div class="flex-grow overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-1 mb-4">
					{#each stockItems as stock (stock.name)}
						<StockIngredientItem
							name={stock.name}
							currentAmount={stock.currentAmount}
							maxAmount={stock.maxAmount}
							hasWarning={stock.hasWarning}
						/>
					{/each}
				</div>

				<!-- Buy Button -->
				<button class="w-full py-4 bg-[#d4af37] hover:bg-[#b8860b] text-[#362720] font-bold rounded-xl transition-colors text-lg flex items-center justify-center gap-3 shadow-md">
					Zutaten einkaufen
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
				</button>
			</aside>

		</main>
	</div>
</div>

<style>
	/* Small utility for nicer scrollbars */
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: #342721;
		border-radius: 10px;
	}
</style>
