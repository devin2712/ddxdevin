"use client";

import { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

export default function PersistentQueryProvider({
  children
}: {
  children: ReactNode
}) {
  const queryClient = useQueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}