<script lang="ts">
	import HeroDark from '$lib/components/shop/HeroDark.svelte';
	import ProductRunner from '$lib/components/shop/ProductRunner.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { splatCard } from '$lib/actions/splatCard';

	let { data } = $props();
</script>

<svelte:head>
	<title>Accueil — AS7 Park</title>
	<meta
		name="description"
		content="Boissons en canettes personnalisées, conçues et imprimées sur mesure."
	/>
</svelte:head>

<main>
	<HeroDark>
		<p class="shop-eyebrow shop-eyebrow-light">Nouvelle collection</p>
		<h1 class="shop-hero-title-light">Vos boissons, votre étiquette.</h1>
		<p class="shop-hero-text-light">
			Découvrez nos canettes personnalisables, imprimées à la demande pour vos événements et votre
			marque.
		</p>
		<div class="shop-hero-ctas">
			<a href="/boutique" class="shop-btn shop-btn-light">Découvrir la boutique</a>
			<a href="/contact" class="shop-btn shop-btn-outline-light">Nous contacter</a>
		</div>
	</HeroDark>

	<div class="shop-container">
		<section class="shop-section">
			<div class="shop-section-head" use:reveal>
				<h2 class="shop-section-title">Catégories</h2>
				<a href="/boutique" class="shop-link">Voir tout</a>
			</div>
			{#if data.categories.length > 0}
				<div class="shop-grid shop-grid-4">
					{#each data.categories as category, i (category.id)}
						<a
							class="shop-card"
							href={`/boutique?categorie=${category.id}`}
							data-wheel-nav
							use:splatCard
							use:reveal={{ delay: i * 70 }}
						>
							<div class="shop-ph shop-ph-square">{category.name}</div>
							<p class="shop-card-title">{category.name}</p>
						</a>
					{/each}
				</div>
			{:else}
				<p style="color:var(--shop-text-muted);">Aucune catégorie pour le moment.</p>
			{/if}
		</section>
	</div>

	{#if data.featuredProducts.length > 0}
		<ProductRunner
			products={data.featuredProducts}
			title="Nouveautés"
			subtitle="Une sélection qui bouge vite — glisse pour tout voir."
		/>
	{/if}

	<div class="shop-container">
		<section class="shop-section">
			<div class="shop-value-props">
				<div class="shop-value-prop" use:reveal={{ delay: 0 }}>
					<span class="shop-icon-ph">i</span>
					<p>Livraison sous 5 à 7 jours ouvrés</p>
				</div>
				<div class="shop-value-prop" use:reveal={{ delay: 90 }}>
					<span class="shop-icon-ph">i</span>
					<p>Retours sous 14 jours</p>
				</div>
				<div class="shop-value-prop" use:reveal={{ delay: 180 }}>
					<span class="shop-icon-ph">i</span>
					<p>Paiement sécurisé par Stripe</p>
				</div>
				<div class="shop-value-prop" use:reveal={{ delay: 270 }}>
					<span class="shop-icon-ph">i</span>
					<p>Service client réactif</p>
				</div>
			</div>
		</section>
	</div>

	<section class="shop-newsletter" use:reveal>
		<h2 class="shop-section-title" style="margin:0;">Restez informés</h2>
		<p style="color:var(--shop-text-muted); margin:8px 0 0;">
			Recevez nos nouveautés et offres en avant-première.
		</p>
		<form class="shop-newsletter-form" onsubmit={(e) => e.preventDefault()}>
			<input type="email" placeholder="Adresse e-mail" aria-label="Adresse e-mail" required />
			<button type="submit" class="shop-btn">S'inscrire</button>
		</form>
	</section>
</main>
