<script lang="ts">
	import { splatCard } from '$lib/actions/splatCard';
	import { formatPrice } from '$lib/utils/formatPrice';

	let {
		product
	}: {
		product: { slug: string; name: string; price: number; images: string[] };
	} = $props();
</script>

<a class="shop-card" href={`/produit/${product.slug}`} use:splatCard>
	<div class="shop-ph shop-ph-portrait">
		{#if product.images?.[0]}
			<img src={product.images[0]} alt={product.name} loading="lazy" />
		{:else}
			Image produit
		{/if}
	</div>
	<p class="shop-card-title">{product.name}</p>
	<p class="shop-card-price">{formatPrice(product.price)}</p>
</a>
