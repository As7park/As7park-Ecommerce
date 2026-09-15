<script lang="ts">
	import ProductCard from '$lib/components/shop/ProductCard.svelte';

	let { data } = $props();

	const PAGE_SIZE = 8;

	let selectedCategories = $state<string[]>(data.initialCategoryId ? [data.initialCategoryId] : []);
	let selectedColors = $state<string[]>([]);
	let minPrice = $state<string>('');
	let maxPrice = $state<string>('');
	let sortBy = $state<'pertinence' | 'price-asc' | 'price-desc'>('pertinence');
	let currentPage = $state(1);

	let availableColors = $derived([...new Set(data.products.map((p) => p.colorProduct))]);

	function toggleCategory(id: string) {
		selectedCategories = selectedCategories.includes(id)
			? selectedCategories.filter((c) => c !== id)
			: [...selectedCategories, id];
		currentPage = 1;
	}

	function toggleColor(color: string) {
		selectedColors = selectedColors.includes(color)
			? selectedColors.filter((c) => c !== color)
			: [...selectedColors, color];
		currentPage = 1;
	}

	function onPriceChange() {
		currentPage = 1;
	}

	function onSortChange() {
		currentPage = 1;
	}

	let filteredProducts = $derived.by(() => {
		const min = minPrice !== '' ? Number(minPrice) : null;
		const max = maxPrice !== '' ? Number(maxPrice) : null;

		let items = data.products.filter((product) => {
			if (
				selectedCategories.length > 0 &&
				!product.categories.some((c) => selectedCategories.includes(c.categoryId))
			) {
				return false;
			}
			if (selectedColors.length > 0 && !selectedColors.includes(product.colorProduct)) {
				return false;
			}
			if (min !== null && !Number.isNaN(min) && product.price < min) return false;
			if (max !== null && !Number.isNaN(max) && product.price > max) return false;
			return true;
		});

		if (sortBy === 'price-asc') items = [...items].sort((a, b) => a.price - b.price);
		else if (sortBy === 'price-desc') items = [...items].sort((a, b) => b.price - a.price);

		return items;
	});

	let totalPages = $derived(Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE)));
	let pageProducts = $derived(
		filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
	);

	$effect(() => {
		if (currentPage > totalPages) currentPage = totalPages;
	});

	let activeCategoryName = $derived(
		selectedCategories.length === 1
			? (data.categories.find((c) => c.id === selectedCategories[0])?.name ?? 'Boutique')
			: 'Boutique'
	);
</script>

<svelte:head>
	<title>{activeCategoryName} — AS7 Park</title>
</svelte:head>

<nav class="shop-breadcrumb"><a href="/accueil">Accueil</a> / Boutique</nav>

<main class="shop-container">
	<div class="shop-listing-layout">
		<aside class="shop-filters">
			<div class="shop-filter-group">
				<h4>Catégorie</h4>
				{#if data.categories.length > 0}
					<ul>
						{#each data.categories as category (category.id)}
							<li>
								<label>
									<input
										type="checkbox"
										checked={selectedCategories.includes(category.id)}
										onchange={() => toggleCategory(category.id)}
									/>
									{category.name}
								</label>
							</li>
						{/each}
					</ul>
				{:else}
					<p style="font-size:13px; color:var(--shop-text-muted);">Aucune catégorie</p>
				{/if}
			</div>

			<div class="shop-filter-group">
				<h4>Prix</h4>
				<div class="shop-price-range">
					<input
						type="number"
						min="0"
						placeholder="Min"
						bind:value={minPrice}
						oninput={onPriceChange}
						aria-label="Prix minimum"
					/>
					<span>—</span>
					<input
						type="number"
						min="0"
						placeholder="Max"
						bind:value={maxPrice}
						oninput={onPriceChange}
						aria-label="Prix maximum"
					/>
				</div>
			</div>

			{#if availableColors.length > 0}
				<div class="shop-filter-group">
					<h4>Couleur</h4>
					<ul>
						{#each availableColors as color (color)}
							<li>
								<label>
									<input
										type="checkbox"
										checked={selectedColors.includes(color)}
										onchange={() => toggleColor(color)}
									/>
									<span class="shop-swatch" style={`width:18px;height:18px;background:${color};`}
									></span>
									{color}
								</label>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</aside>

		<div class="shop-listing-main">
			<div class="shop-listing-head">
				<div>
					<h1 class="shop-section-title" style="margin-bottom:4px;">{activeCategoryName}</h1>
					<p class="shop-result-count">
						{filteredProducts.length} article{filteredProducts.length > 1 ? 's' : ''}
					</p>
				</div>
				<select class="shop-sort-select" bind:value={sortBy} onchange={onSortChange}>
					<option value="pertinence">Trier par : Pertinence</option>
					<option value="price-asc">Prix croissant</option>
					<option value="price-desc">Prix décroissant</option>
				</select>
			</div>

			{#if pageProducts.length > 0}
				<div class="shop-grid shop-grid-4">
					{#each pageProducts as product (product.id)}
						<ProductCard {product} />
					{/each}
				</div>

				{#if totalPages > 1}
					<nav class="shop-pagination" aria-label="Pagination">
						<button
							disabled={currentPage === 1}
							onclick={() => (currentPage = Math.max(1, currentPage - 1))}
							aria-label="Page précédente">‹</button
						>
						{#each Array(totalPages) as _, i (i)}
							<button
								class:shop-active={currentPage === i + 1}
								onclick={() => (currentPage = i + 1)}>{i + 1}</button
							>
						{/each}
						<button
							disabled={currentPage === totalPages}
							onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
							aria-label="Page suivante">›</button
						>
					</nav>
				{/if}
			{:else}
				<p class="shop-empty-results">Aucun produit ne correspond à ces filtres.</p>
			{/if}
		</div>
	</div>
</main>
