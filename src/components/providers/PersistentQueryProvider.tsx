"use client";

import { ReactNode, useEffect, useState } from "react";
import { useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider, Persister } from "@tanstack/react-query-persist-client";

export default function PersistentQueryProvider({
  children
}: {
  children: ReactNode
}) {
  const queryClient = useQueryClient();
  const [persister, setPersister] = useState<Persister | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side to avoid hydration mismatches
  useEffect(() => {
    setIsClient(true);
    const asyncPersister = createAsyncStoragePersister({
      storage: window.localStorage,
    });
    setPersister(asyncPersister);
  }, []);

  // On server or before hydration, render without persistence
  if (!isClient || !persister) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  // After hydration, render with persistence enabled
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}