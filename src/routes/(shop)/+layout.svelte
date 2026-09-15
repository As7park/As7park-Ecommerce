<script lang="ts">
	import './shop.css';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import ShopHeader from '$lib/components/shop/ShopHeader.svelte';
	import ShopFooter from '$lib/components/shop/ShopFooter.svelte';
	import Toaster from '$lib/components/shadcn/ui/sonner/sonner.svelte';

	let { children } = $props();
</script>

<div class="shop-scope">
	<ShopHeader />
	{#key $page.url.pathname}
		<div in:fade={{ duration: 280, delay: 60 }}>
			{@render children()}
		</div>
	{/key}
	<ShopFooter />
</div>
<Toaster />
