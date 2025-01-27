// components/Providers.tsx
'use client';
import { supabase } from '@/lib/supabase/client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
}