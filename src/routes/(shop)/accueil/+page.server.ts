import type { PageServerLoad } from './$types';
import { getAllProducts } from '$lib/prisma/products/products';
import { getAllcategories } from '$lib/prisma/categories/categories';

export const load: PageServerLoad = async () => {
	const [products, categories] = await Promise.all([getAllProducts(), getAllcategories()]);

	return {
		categories: categories.slice(0, 4),
		featuredProducts: products.slice(0, 4)
	};
};
