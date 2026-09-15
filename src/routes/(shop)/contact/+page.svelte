<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { contactSchema } from '$lib/schema/contact/contactSchema';

	let { data } = $props();

	const contactFormCtx = superForm(data.form, {
		validators: zodClient(contactSchema),
		resetForm: true
	});
	const { form, errors, enhance, message: formMessage, delayed } = contactFormCtx;

	$effect(() => {
		if ($formMessage) toast.success($formMessage);
	});
</script>

<svelte:head>
	<title>Contact — AS7 Park</title>
</svelte:head>

<nav class="shop-breadcrumb"><a href="/accueil">Accueil</a> / Contact</nav>

<main class="shop-container">
	<div class="shop-contact-layout">
		<div>
			<h1 class="shop-section-title">Nous contacter</h1>
			<form method="POST" use:enhance>
				<div class="shop-form-field">
					<label for="contact-name">Nom</label>
					<input id="contact-name" name="name" type="text" bind:value={$form.name} required />
					{#if $errors.name}<p class="shop-form-error">{$errors.name}</p>{/if}
				</div>
				<div class="shop-form-field">
					<label for="contact-email">E-mail</label>
					<input id="contact-email" name="email" type="email" bind:value={$form.email} required />
					{#if $errors.email}<p class="shop-form-error">{$errors.email}</p>{/if}
				</div>
				<div class="shop-form-field">
					<label for="contact-subject">Sujet</label>
					<input
						id="contact-subject"
						name="subject"
						type="text"
						bind:value={$form.subject}
						required
					/>
					{#if $errors.subject}<p class="shop-form-error">{$errors.subject}</p>{/if}
				</div>
				<div class="shop-form-field">
					<label for="contact-message">Message</label>
					<textarea id="contact-message" name="message" bind:value={$form.message} required
					></textarea>
					{#if $errors.message}<p class="shop-form-error">{$errors.message}</p>{/if}
				</div>
				<button type="submit" class="shop-btn" disabled={$delayed}>
					{$delayed ? 'Envoi…' : 'Envoyer le message'}
				</button>
			</form>
		</div>

		<div class="shop-contact-info">
			<div>
				<h4>Adresse</h4>
				<p>AS7 Park</p>
			</div>
			<div>
				<h4>E-mail</h4>
				<p>contact@as7park.com</p>
			</div>
			<div>
				<h4>Réseaux</h4>
				<p><a href="https://instagram.com/as7park">Instagram</a></p>
				<p><a href="https://facebook.com/as7park">Facebook</a></p>
				<p><a href="https://wa.me/33000000000">WhatsApp</a></p>
			</div>
		</div>
	</div>
</main>
