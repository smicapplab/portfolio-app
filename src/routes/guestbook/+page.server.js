import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { guestBookSchema } from '$lib/schemas/contact';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const actions = {
	leaveMessage: async ({ request }) => {
		const form = await superValidate(request, zod(guestBookSchema));
		if (!form.valid) {
			return {
				form
			};
		}
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { fullName, email, message } = form.data;
			await resend.emails.send({
				from: 'developer@koredorcapital.com',
				to: 's.torrefranca@gmail.com',
				subject: 'Portfolio Guestbook',
				html: `
				  <strong>From:</strong> ${fullName}<br/>
				  <strong>Email:</strong> ${email}<br/>
				  <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
				`
			});

			return {
				form
			};
		} catch (error) {
			console.error(error);
			return fail(400, { form });
		}
	}
};
