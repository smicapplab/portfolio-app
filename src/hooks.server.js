import { createServerClient } from "@supabase/ssr";
import { sequence } from "@sveltejs/kit/hooks";

import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { keysToCamelCase } from "$lib/utils";
import { redirect } from "@sveltejs/kit";


// @ts-ignore
const supabase = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => event.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: "/" });
          });
        },
      },
    }
  );

  event.locals.safeGetSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    // @ts-ignore
    filterSerializedResponseHeaders(name) {
      /**
       * Supabase libraries use the `content-range` and `x-supabase-api-version`
       * headers, so we need to tell SvelteKit to pass it through.
       */
      return name === "content-range" || name === "x-supabase-api-version";
    },
  });
};

// @ts-ignore
const authGuard = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = keysToCamelCase(user);

  if (!event.locals.session && event.url.pathname.startsWith("/dashboard")) {
    redirect(303, "/login");
  }

  if (event.locals.session && event.url.pathname === "/auth") {
    redirect(303, "/dashboard");
  }

  return resolve(event);
};

// @ts-ignore
export const handle = sequence(supabase, authGuard);