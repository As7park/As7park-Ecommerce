import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductBySlug, getRelatedProducts } from '$lib/prisma/products/products';

export const load: PageServerLoad = async ({ params }) => {
	const product = await getProductBySlug(params.slug);
	if (!product) {
		throw error(404, 'Produit introuvable');
	}

	const categoryIds = product.categories.map((c) => c.categoryId);
	const relatedProducts = await getRelatedProducts(categoryIds, product.id);

	return { product, relatedProducts };
};
