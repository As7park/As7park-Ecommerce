<script lang="ts">
	import './shop.css';
	import ShopHeader from '$lib/components/shop/ShopHeader.svelte';
	import ShopFooter from '$lib/components/shop/ShopFooter.svelte';
	import Toaster from '$lib/components/shadcn/ui/sonner/sonner.svelte';

	let { children } = $props();
</script>

<div class="shop-scope">
	<ShopHeader />
	{@render children()}
	<ShopFooter />
</div>
<Toaster />
