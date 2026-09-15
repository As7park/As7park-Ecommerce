<script lang="ts">
	import { page } from '$app/stores';
	import { cart } from '$lib/store/Data/cartStore';

	let cartCount = $derived($cart.items.reduce((sum, item) => sum + item.quantity, 0));
</script>

<header class="shop-site-header">
	<div class="shop-announcement-bar">Livraison offerte dès 50€ d'achat</div>
	<div class="shop-header-main">
		<a href="/accueil" class="shop-logo">AS7 PARK</a>
		<nav class="shop-main-nav">
			<ul>
				<li>
					<a href="/accueil" class:shop-active={$page.url.pathname === '/accueil'}>Accueil</a>
				</li>
				<li>
					<a href="/boutique" class:shop-active={$page.url.pathname.startsWith('/boutique')}
						>Boutique</a
					>
				</li>
				<li>
					<a href="/contact" class:shop-active={$page.url.pathname === '/contact'}>Contact</a>
				</li>
			</ul>
		</nav>
		<div class="shop-header-actions">
			<a href="/auth" aria-label="Compte"><span class="shop-icon-ph">C</span></a>
			<a href="/panier" aria-label="Panier" class="shop-cart-link">
				<span class="shop-icon-ph">P</span>
				{#if cartCount > 0}
					<span class="shop-cart-count">{cartCount}</span>
				{/if}
			</a>
		</div>
	</div>
</header>
