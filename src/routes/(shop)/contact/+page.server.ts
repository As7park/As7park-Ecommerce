import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { contactSchema } from '$lib/schema/contact/contactSchema';
import { createContactSubmission } from '$lib/prisma/contact/contact';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(contactSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(contactSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await createContactSubmission(form.data);

		return message(form, 'Votre message a bien été envoyé.');
	}
};
