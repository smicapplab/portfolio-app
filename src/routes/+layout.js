// @ts-nocheck
import {
    createBrowserClient,
    createServerClient,
    isBrowser,
  } from "@supabase/ssr";
  import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL,
  } from "$env/static/public";
import { keysToCamelCase } from "$lib/utils.js";
  
  
// @ts-ignore
export const load = async ({ data, depends, fetch }) => {
    depends("supabase:auth");
  
    const supabase = isBrowser()
      ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
          global: {
            fetch,
          },
        })
      : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
          global: {
            fetch,
          },
          cookies: {
            getAll() {
              return (data)?.cookies ?? [];
            },
            setAll: (cookiesToSet) => {
              cookiesToSet.forEach(({ name, value, options }) => {
                (data)?.cookies.set(name, value, {
                  ...options,
                  path: "/",
                });
              });
            },
          },
        });
  
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      return {
        session,
        supabase,
        user: user ? keysToCamelCase(user) : null,
        profile: profileData ? keysToCamelCase(profileData) : null,
      };
    }
  
    return { session, supabase, user, profile: {}  };
  };
  