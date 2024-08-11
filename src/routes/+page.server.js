import { destructureFormData } from '$lib/formDataUtil.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	// @ts-ignore
	loginWithProvider: async ({ locals, url }) => {
		const provider = url.searchParams.get('provider');

        console.log("=====>", provider)

		if (provider) {
			const { data, error } = await locals.supabase.auth.signInWithOAuth({
				provider
			});
			if (error) {
				console.error(error);
				return fail(400, {
					message: 'Oooops! Something went wrong'
				});
			}
			throw redirect(303, data.url);
		}

		throw redirect(403, '/login');
	},
	// @ts-ignore
	signInWithEmail: async ({ request, locals }) => {
		// @ts-ignore
		const { email, password } = await destructureFormData(request.formData()); 
		const { error } = await locals.supabase.auth.signInWithPassword({
		  email: email,
		  password: password,
		});
	
		if( error ){
		  console.error("signInWithEmail", error);
		  return {
			success: false,
			message: "Opps something went wrong!",
		  };  
		}
	
		return {
		  success: true,
		  message: "User signed in successfully",
		};
	  },
};
