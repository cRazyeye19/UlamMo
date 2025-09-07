"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { type SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type SupabaseContextType = SupabaseClient | undefined;

const SupabaseContext = createContext<SupabaseContextType>(undefined);

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [supabase] = useState(() => createClient());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      supabase.auth.getSession().then(({ data }) => {
        const currentAccessToken = data.session?.access_token;
        if (session?.access_token !== currentAccessToken) {
          router.refresh();
        }
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
