<script lang="ts">
	import { cart, removeFromCart, updateCartItemQuantity } from '$lib/store/Data/cartStore';
	import { formatPrice } from '$lib/utils/formatPrice';
</script>

<svelte:head>
	<title>Panier — AS7 Park</title>
</svelte:head>

<nav class="shop-breadcrumb"><a href="/accueil">Accueil</a> / Panier</nav>

<main class="shop-container">
	{#if $cart.items.length === 0}
		<div class="shop-empty-state">
			<div class="shop-ph">Panier</div>
			<p>Votre panier est vide.</p>
			<a href="/boutique" class="shop-btn" style="margin-top:16px; display:inline-block;"
				>Découvrir la boutique</a
			>
		</div>
	{:else}
		<div class="shop-cart-layout">
			<table class="shop-cart-table">
				<thead>
					<tr>
						<th>Produit</th>
						<th>Quantité</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{#each $cart.items as item (item.id)}
						<tr>
							<td>
								<div class="shop-cart-row-product">
									<div class="shop-ph">
										{#if item.product.images}
											<img src={item.product.images} alt={item.product.name} />
										{/if}
									</div>
									<div>
										<p class="shop-card-title">{item.product.name}</p>
										<p class="shop-card-meta">{formatPrice(item.product.price)} / unité</p>
										<button
											type="button"
											class="shop-remove-link"
											onclick={() => removeFromCart(item.product.id, item.custom?.[0]?.id)}
											>Retirer</button
										>
									</div>
								</div>
							</td>
							<td>
								<div class="shop-qty-stepper">
									<button
										type="button"
										aria-label="Diminuer"
										onclick={() =>
											updateCartItemQuantity(
												item.product.id,
												Math.max(1, item.quantity - 1),
												item.custom?.[0]?.id
											)}>−</button
									>
									<input type="text" readonly value={item.quantity} aria-label="Quantité" />
									<button
										type="button"
										aria-label="Augmenter"
										onclick={() =>
											updateCartItemQuantity(
												item.product.id,
												item.quantity + 1,
												item.custom?.[0]?.id
											)}>+</button
									>
								</div>
							</td>
							<td>{formatPrice(item.price * item.quantity)}</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div class="shop-order-summary">
				<h4 style="font-size:16px; margin:0;">Récapitulatif</h4>
				<div class="shop-summary-row">
					<span>Sous-total</span><span>{formatPrice($cart.subtotal)}</span>
				</div>
				<div class="shop-summary-row"><span>TVA</span><span>{formatPrice($cart.tax)}</span></div>
				<div class="shop-summary-row shop-total">
					<span>Total</span><span>{formatPrice($cart.subtotal + $cart.tax)}</span>
				</div>
				<a href="/checkout" class="shop-btn shop-btn-block">Passer commande</a>
			</div>
		</div>
	{/if}
</main>
