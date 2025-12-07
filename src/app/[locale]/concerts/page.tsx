"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslations, useLocale } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArtistDisplay, ARTIST_KEY } from "@/components/ArtistDisplay";
import { useDebounce } from "@/hooks/useDebounce";
import { getHeaders, parseCSV } from "@/utils/CSVreader";
import { normalizeString } from "@/utils/stringNormalizer";

import styles from "./concerts.module.css";
import { useConcertData } from "@/hooks/useConcertData";

export default function ConcertsPage() {
  const t = useTranslations("concertLog");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState<string>(q);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isSearching = searchQuery !== debouncedSearchQuery;
  const lastPushedQuery = useRef<string>(q);

  const {
    data,
    isLoading,
    isError: _isError,
    error: _error,
  } = useConcertData();

  // Sync URL to state when URL changes from external navigation (back/forward)
  useEffect(() => {
    const isExternalNavigation = q !== lastPushedQuery.current;
    if (!isExternalNavigation) return;

    // Update search query to match URL from browser navigation
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery(q);
  }, [q]);

  // Sync state to URL after debounce
  useEffect(() => {
    const trimmedQuery = debouncedSearchQuery.trim();
    if (trimmedQuery !== q) {
      lastPushedQuery.current = trimmedQuery;
      const params = new URLSearchParams();
      if (trimmedQuery) {
        params.set("q", trimmedQuery);
        router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        router.replace(window.location.pathname, { scroll: false });
      }
    }
  }, [debouncedSearchQuery, router, q]);

  const parsedData = useMemo(() => {
    if (!data) return [];
    return parseCSV(data);
  }, [data]);

  const lastTimestamp = useMemo((): Date | null => {
    if (!data) return null;

    const headers = getHeaders(data);

    if (headers.length >= 4) {
      const epochTimestamp = parseInt(headers[3]);
      const timestamp = new Date(epochTimestamp * 1000);
      return timestamp;
    }

    return null;
  }, [data]);

  const filteredRows = useMemo(() => {
    const trimmedQuery = debouncedSearchQuery.trim();
    if (!trimmedQuery) return parsedData;

    return parsedData.filter((row) =>
      normalizeString(row[ARTIST_KEY]).includes(normalizeString(trimmedQuery))
    );
  }, [debouncedSearchQuery, parsedData]);

  const resultsCount = useMemo(() => {
    const trimmedQuery = debouncedSearchQuery.trim();
    if (!trimmedQuery) return [parsedData.length, parsedData.length];
    return [filteredRows.length, parsedData.length];
  }, [debouncedSearchQuery, filteredRows.length, parsedData.length]);

  const counterRef = useRef<HTMLPreElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Don't trim on input to preserve user experience, trim only when processing
    setSearchQuery(value);
  }, []);

  useEffect(() => {
    if (counterRef.current && inputRef.current) {
      const counterWidth = counterRef.current.offsetWidth;
      const padding = counterWidth + 32; // 32px for spacing (2rem)
      inputRef.current.style.paddingRight = `${padding}px`;
    }
  }, [resultsCount, isSearching]);

  return (
    <PageLayout
      header={{
        title: t("title"),
        description: lastTimestamp ? (
          <span className={styles.lastUpdated}>
            {new Intl.DateTimeFormat(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(lastTimestamp)}
          </span>
        ) : (
          t("live")
        ),
        as: "h1",
      }}
      size="xlarge"
    >
      {isLoading && (
        <section className={styles.concertLog}>
          <p>{t("loading")}...</p>
        </section>
      )}

      {data && (
        <section className={styles.concertLogList}>
          <div className={styles.contentWrapper}>
            {t.raw("paragraphs") && Array.isArray(t.raw("paragraphs"))
              ? (t.raw("paragraphs") as string[]).map(
                  (paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  )
                )
              : null}
            <div className={styles.search}>
              <label htmlFor="concert-search" className="sr-only">
                {t("search")}
              </label>
              <input
                id="concert-search"
                ref={inputRef}
                autoFocus
                type="text"
                placeholder={`${t("search")}...`}
                value={searchQuery}
                onChange={handleSearch}
                aria-describedby="search-results-count"
              />
              <pre
                ref={counterRef}
                className={styles.resultsCount}
                id="search-results-count"
                aria-live="polite"
              >
                {isSearching ? (
                  <span
                    className={styles.spinner}
                    aria-label="Searching"
                  ></span>
                ) : (
                  resultsCount[0]
                )}{" "}
                / {resultsCount[1]}
              </pre>
            </div>

            <div className={styles.indicator}>
              <strong className={styles.showCount}>(#)</strong> {t("indicator")}
            </div>
          </div>

          {debouncedSearchQuery ? (
            <>
              <ul className={styles.artistList}>
                {filteredRows.map((artist, idx) => (
                  <li key={idx}>
                    <ArtistDisplay
                      artist={artist}
                      query={debouncedSearchQuery}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul className={styles.artistList}>
                {filteredRows.slice(0, -1).map((artist, idx) => (
                  <li key={idx}>
                    <ArtistDisplay artist={artist} />
                  </li>
                ))}
              </ul>
              <h2 className={styles.encore}>{t("encore")}</h2>
              <ul className={styles.artistList}>
                <li>
                  <ArtistDisplay
                    artist={filteredRows[filteredRows.length - 1]}
                  />
                </li>
              </ul>
            </>
          )}
        </section>
      )}
    </PageLayout>
  );
}
