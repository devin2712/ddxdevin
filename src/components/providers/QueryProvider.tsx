"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 12, // Consider data stale after 12 hours
        gcTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });

const PersistentQueryProvider = dynamic(
  () => import("./PersistentQueryProvider"),
  { ssr: false }
);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PersistentQueryProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </PersistentQueryProvider>
    </QueryClientProvider>
  );
};
