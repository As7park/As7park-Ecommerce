import type { PageServerLoad } from './$types';
import { getAllProducts } from '$lib/prisma/products/products';
import { getAllcategories } from '$lib/prisma/categories/categories';

export const load: PageServerLoad = async ({ url }) => {
	const [products, categories] = await Promise.all([getAllProducts(), getAllcategories()]);

	return {
		products,
		categories,
		initialCategoryId: url.searchParams.get('categorie')
	};
};
