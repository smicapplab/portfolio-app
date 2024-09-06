import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { guestBookSchema } from '$lib/schemas/contact';
// import { SENDGRID_API_KEY } from '$env/static/private';

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

		return {
			form
		};

		// const { fullName, email, message } = form.data;

		// sgMail.setApiKey(SENDGRID_API_KEY);
		// const msg = {
		// 	to: 's.torrefranca@gmail.com',
		// 	from: 's.torrefranca@gmail.com', // Must be verified in SendGrid
		// 	subject: 'Portfolio Guestbook',
		// 	text: `
		// 	From: ${fullName}
		// 	Email: ${email}
		// 	Message:
		// 	${message}`
		// };

		// try {
		// 	await sgMail.send(msg);
		// 	return {
		// 		form
		// 	};
		// } catch (error) {
		// 	console.error(error);
		// 	return fail(400, { form });
		// }
	}
};
