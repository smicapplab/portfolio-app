import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('your-supabase-url', 'your-supabase-anon-key');
  }

  signInWithProvider(provider: 'facebook' | 'google' | 'github') {
    return this.supabase.auth.signInWithOAuth({
      provider: provider,
    });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  // Convert the session retrieval promise to an observable
  getSession(): Observable<Session | null> {
    return from(
      this.supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
          console.error('Error retrieving session:', error.message);
          return null;
        }
        return data.session;
      })
    );
  }
}
