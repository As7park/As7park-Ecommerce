<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { fade, slide } from 'svelte/transition';
	import ProductCard from '$lib/components/shop/ProductCard.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { addToCart } from '$lib/store/Data/cartStore';
	import { formatPrice } from '$lib/utils/formatPrice';

	let { data } = $props();

	let activeImageIndex = $state(0);
	let quantity = $state(1);
	let justAdded = $state(false);

	const accordionItems = [
		{ title: 'Description', getContent: () => data.product.description },
		{
			title: 'Livraison & retours',
			getContent: () =>
				'Expédié sous 5 à 7 jours ouvrés. Retours acceptés sous 14 jours pour les produits non personnalisés.'
		},
		{
			title: 'Avis clients',
			getContent: () => 'Les avis clients seront bientôt disponibles sur cette fiche produit.'
		}
	];
	let openPanels = $state([true, false, false]);

	function togglePanel(i: number) {
		openPanels[i] = !openPanels[i];
	}

	// Réinitialise la galerie/quantité quand on navigue d'une fiche produit à une autre.
	$effect(() => {
		data.product.id;
		activeImageIndex = 0;
		quantity = 1;
		justAdded = false;
	});

	let mainImage = $derived(data.product.images[activeImageIndex] ?? data.product.images[0]);
	let inStock = $derived(data.product.stock > 0);

	function decreaseQty() {
		quantity = Math.max(1, quantity - 1);
	}
	function increaseQty() {
		quantity = Math.min(data.product.stock, quantity + 1);
	}

	function handleAddToCart() {
		if (!inStock) return;
		addToCart({
			id: crypto.randomUUID(),
			product: {
				id: data.product.id,
				name: data.product.name,
				price: data.product.price,
				images: data.product.images[0] ?? '',
				stock: data.product.stock
			},
			quantity,
			price: data.product.price
		});
		toast.success('Produit ajouté au panier.');
		justAdded = true;
		setTimeout(() => (justAdded = false), 1400);
	}
</script>

<svelte:head>
	<title>{data.product.name} — AS7 Park</title>
	<meta name="description" content={data.product.description.slice(0, 160)} />
</svelte:head>

<nav class="shop-breadcrumb">
	<a href="/accueil">Accueil</a> / <a href="/boutique">Boutique</a> / {data.product.name}
</nav>

<main class="shop-container">
	<div class="shop-product-layout">
		<div class="shop-product-gallery" use:reveal>
			<div class="shop-ph shop-ph-portrait">
				{#key mainImage}
					<div style="width:100%; height:100%;" in:fade={{ duration: 280 }}>
						{#if mainImage}
							<img src={mainImage} alt={data.product.name} />
						{:else}
							Image produit
						{/if}
					</div>
				{/key}
			</div>
			{#if data.product.images.length > 1}
				<div class="shop-gallery-thumbs">
					{#each data.product.images as image, i (image)}
						<button
							type="button"
							class:shop-active={i === activeImageIndex}
							onclick={() => (activeImageIndex = i)}
							aria-label={`Vue ${i + 1}`}
						>
							<div class="shop-ph shop-ph-square"><img src={image} alt="" /></div>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<div class="shop-product-info" use:reveal={{ delay: 90 }}>
			<div>
				{#if data.product.categories[0]}
					<p class="shop-eyebrow">{data.product.categories[0].category.name}</p>
				{/if}
				<h1 class="shop-product-title">{data.product.name}</h1>
				<p class="shop-product-price">{formatPrice(data.product.price)}</p>
			</div>

			<p style="color:var(--shop-text-muted); max-width:48ch;">{data.product.description}</p>

			<div class="shop-option-group">
				<h4>Couleur</h4>
				<div class="shop-swatches">
					<div
						class="shop-swatch"
						style={`background:${data.product.colorProduct};`}
						title={data.product.colorProduct}
					></div>
				</div>
			</div>

			<div class="shop-option-group">
				<h4>Quantité</h4>
				<div class="shop-qty-stepper">
					<button type="button" aria-label="Diminuer" onclick={decreaseQty}>−</button>
					<input type="text" readonly value={quantity} aria-label="Quantité" />
					<button type="button" aria-label="Augmenter" onclick={increaseQty}>+</button>
				</div>
			</div>

			<div class="shop-product-actions">
				<button
					class="shop-btn shop-btn-block"
					class:shop-btn-success={justAdded}
					disabled={!inStock}
					onclick={handleAddToCart}
				>
					{#if justAdded}
						Ajouté ✓
					{:else}
						{inStock ? 'Ajouter au panier' : 'Rupture de stock'}
					{/if}
				</button>
			</div>

			<p style="font-size:12px; color:var(--shop-text-muted);">
				{inStock
					? `${data.product.stock} en stock — expédition sous 5 à 7 jours ouvrés.`
					: 'Actuellement indisponible.'}
			</p>

			<div class="shop-accordion">
				{#each accordionItems as item, i (item.title)}
					<div class="shop-accordion-item">
						<button
							type="button"
							class="shop-accordion-trigger"
							aria-expanded={openPanels[i]}
							onclick={() => togglePanel(i)}
						>
							{item.title} <span class="shop-accordion-icon">+</span>
						</button>
						{#if openPanels[i]}
							<div class="shop-accordion-panel" transition:slide={{ duration: 250 }}>
								<div class="shop-accordion-panel-inner">{item.getContent()}</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	{#if data.relatedProducts.length > 0}
		<section class="shop-section">
			<div class="shop-section-head" use:reveal>
				<h2 class="shop-section-title">Vous aimerez aussi</h2>
			</div>
			<div class="shop-grid shop-grid-4">
				{#each data.relatedProducts as product, i (product.id)}
					<ProductCard {product} index={i} />
				{/each}
			</div>
		</section>
	{/if}
</main>
