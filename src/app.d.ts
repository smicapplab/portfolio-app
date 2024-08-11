// See https://kit.svelte.dev/docs/types#app

import type { Session, User } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: ReturnType<typeof createServerClient>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			supabase: ReturnType<typeof createServerClient>;
			session: Session | null;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			user: Record<string, any> | null;
			profile: DatabaseProfile | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
