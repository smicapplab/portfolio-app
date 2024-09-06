import { z } from 'zod';

export const email = z
	.string({
		required_error: 'Email is required.'
	})
	.email('Please enter a valid email address so I can reach you.');

export const fullName = z
	.string({
		required_error: 'Kindly provide your full name so I can address you properly.'
	})
	.min(1, 'Kindly provide your full name so I can address you properly.');

export const message = z
	.string({
		required_error: 'Please share your thoughts with me by entering a message.'
	})
	.min(1, 'Please share your thoughts with me by entering a message.');

export const guestBookSchema = z.object({
	fullName,
	email,
	message
});
