'use client';

import { createClient } from './client';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

export async function createRealtimeAuthedClient() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    supabase.realtime.setAuth(session.access_token);
  }

  const { data: sub } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, s: Session | null) => {
    if (s?.access_token) {
      supabase.realtime.setAuth(s.access_token);
    }
  });

  return {
    supabase,
    unsubscribeAuth: () => sub.subscription.unsubscribe(),
  };
}
