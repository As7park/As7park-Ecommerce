<script lang="ts">
	// Liens réseaux sociaux — à personnaliser
	const socials = [
		{ label: 'Instagram', href: 'https://instagram.com/as7park', icon: '/construction/instagram.png' },
		{ label: 'Facebook', href: 'https://facebook.com/as7park', icon: '/construction/facebook.png' },
		{ label: 'WhatsApp', href: 'https://wa.me/33000000000', icon: '/construction/whatsapp.png' },
		{ label: 'Mail', href: 'mailto:contact@as7park.com', icon: '/construction/mail.png' }
	];
</script>

<svelte:head>
	<title>AS7 Park — En cours de construction</title>
	<meta name="description" content="Le site AS7 Park est en cours de construction. Restez connectés." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="stage">
	<div class="page">
		<div class="url-badge">WWW.AS7PARK.COM</div>

		<h1 class="headline">
			<span class="typewriter">En cours de construction...</span>
		</h1>

		<div class="contact">
			<div class="contact-title">Informations &amp; contact :</div>

			<div class="socials">
				{#each socials as social (social.label)}
					<a
						class="social-item"
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
					>
						<span class="social-icon-wrap">
							<img src={social.icon} alt="" />
						</span>
						<span class="social-label">{social.label.toUpperCase()}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.stage {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		overflow: hidden;
		font-family: 'Oswald', 'Arial Narrow', sans-serif;
		color: #fff;
	}

	/* Conteneur verrouillé sur le ratio du background (4122 x 2760) */
	.page {
		position: relative;
		width: min(1600px, 100vw, calc(100vh * 4122 / 2760));
		height: min(calc(1600px * 2760 / 4122), 100vh, calc(100vw * 2760 / 4122));
		background-image: url('/construction/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.url-badge {
		position: absolute;
		top: 6.2%;
		left: 50%;
		transform: translateX(-50%);
		background: #fff;
		color: #0a0a0a;
		padding: 0.9% 3.2%;
		border-radius: 6px;
		font-weight: 700;
		font-style: italic;
		letter-spacing: 0.04em;
		font-size: clamp(14px, 2.6vw, 40px);
		white-space: nowrap;
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
	}

	.headline {
		position: absolute;
		top: 15.5%;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		text-align: center;
		font-weight: 700;
		font-style: italic;
		letter-spacing: 0.01em;
		font-size: clamp(20px, 5vw, 74px);
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
		white-space: nowrap;
		margin: 0;
	}

	.typewriter {
		display: inline-block;
		max-width: 27ch;
		overflow: hidden;
		white-space: nowrap;
		vertical-align: bottom;
		border-right: 0.09em solid #fff;
		width: 0ch;
		animation:
			typing 6s infinite,
			blink-caret 0.75s step-end infinite;
	}

	@keyframes typing {
		0% {
			width: 0ch;
			animation-timing-function: steps(27, end);
		}
		45% {
			width: 27ch;
			animation-timing-function: step-end;
		}
		62% {
			width: 27ch;
			animation-timing-function: steps(27, end);
		}
		88% {
			width: 0ch;
			animation-timing-function: step-end;
		}
		100% {
			width: 0ch;
		}
	}

	@keyframes blink-caret {
		50% {
			border-color: transparent;
		}
	}

	.contact {
		position: absolute;
		bottom: 16%;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		text-align: center;
	}

	.contact-title {
		font-weight: 700;
		font-style: italic;
		font-size: clamp(16px, 3.1vw, 44px);
		margin-bottom: 2.2%;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	.socials {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 6.5%;
	}

	.social-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6%;
		text-decoration: none;
		color: #fff;
		transition: transform 0.2s ease;
	}

	.social-item:hover {
		transform: translateY(-4px);
	}

	.social-icon-wrap {
		width: clamp(34px, 5.4vw, 78px);
		height: clamp(34px, 5.4vw, 78px);
		border-radius: 50%;
		border: 2px solid #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		transition: background 0.2s ease;
	}

	.social-item:hover .social-icon-wrap {
		background: rgba(255, 255, 255, 0.12);
	}

	.social-icon-wrap img {
		width: 58%;
		height: 58%;
		object-fit: contain;
	}

	.social-label {
		font-weight: 700;
		font-style: italic;
		letter-spacing: 0.03em;
		font-size: clamp(9px, 1.3vw, 18px);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 480px) {
		.socials {
			gap: 4%;
		}
	}
</style>
