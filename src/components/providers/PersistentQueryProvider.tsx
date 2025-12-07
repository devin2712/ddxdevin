"use client";

import { ReactNode, useState } from "react";
import { useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider, Persister } from "@tanstack/react-query-persist-client";

export default function PersistentQueryProvider({
  children
}: {
  children: ReactNode
}) {
  const queryClient = useQueryClient();
  // Initialize persister lazily to avoid hydration mismatches
  const [persister] = useState<Persister | null>(() => {
    if (typeof window !== 'undefined') {
      return createAsyncStoragePersister({
        storage: window.localStorage,
      });
    }
    return null;
  });

  // On server or when persister is unavailable, render without persistence
  if (!persister) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  // After client initialization, render with persistence enabled
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}