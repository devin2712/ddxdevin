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

export default function ConcertsPage() {
  const t = useTranslations("concertLog");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [data, setData] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(q);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isSearching = searchQuery !== debouncedSearchQuery;

  const CONCERT_DATA_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7cRqq437Wt4-eWBZkbUUmO1GnCUQ-V_f4e9-VVwPS0hbD5vQDgFWzvgm16hMvDSLOtgRF8TBgRsvM/pub?gid=0&single=true&output=csv";
  const CONCERT_CACHE_KEY = "ddxdevin.concertData";
  const CONCERT_TIME_KEY = "ddxdevin.concertDataCacheTime";
  const CONCERT_CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // One Day

  useEffect(() => {
    setSearchQuery(q);
  }, [q]);

  useEffect(() => {
    const trimmedQuery = debouncedSearchQuery.trim();
    if (trimmedQuery !== q) {
      const params = new URLSearchParams();
      if (trimmedQuery) {
        params.set("q", trimmedQuery);
        router.push(`?${params.toString()}`, { scroll: false });
      } else {
        router.push(window.location.pathname, { scroll: false });
      }
    }
  }, [debouncedSearchQuery, router, q]);

  useEffect(() => {
    const getCachedData = () => {
      if (typeof window === "undefined") return null;
      const cachedData = localStorage.getItem(CONCERT_CACHE_KEY);
      const cachedTime = parseInt(
        localStorage.getItem(CONCERT_TIME_KEY) || "0"
      );
      if (
        cachedData &&
        cachedTime &&
        Date.now() - cachedTime < CONCERT_CACHE_EXPIRATION
      ) {
        return cachedData;
      }
      return null;
    };

    const fetchData = async () => {
      try {
        const cachedData = getCachedData();
        if (cachedData) {
          setData(cachedData);
        } else {
          const fetchedData = await fetchDataFromUrl(CONCERT_DATA_URL);
          setData(fetchedData);
          setCachedData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching CSV data: ", error);
        try {
          const backupData = await fetchBackupData();
          setData(backupData);
          setCachedData(backupData);
        } catch (backupError) {
          console.error("Error fetching backup CSV data: ", backupError);
        }
      }
    };

    fetchData();
  }, [CONCERT_CACHE_EXPIRATION]);

  const setCachedData = (data: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(CONCERT_CACHE_KEY, data);
    localStorage.setItem(CONCERT_TIME_KEY, Date.now().toString());
  };

  const fetchDataFromUrl = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  };

  const fetchBackupData = async () => {
    const response = await fetch("/docs/concerts-backup.csv");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  };

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
      normalizeString(row[ARTIST_KEY]).includes(
        normalizeString(trimmedQuery)
      )
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
      {!data && (
        <section className={styles.concertLog}>
          <p>{t("loading")}...</p>
        </section>
      )}

      {data && (
        <main className={styles.concertLogList}>
          <div className={styles.contentWrapper}>
            {t.raw("paragraphs") && Array.isArray(t.raw("paragraphs"))
              ? (t.raw("paragraphs") as string[]).map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))
              : null}
            <div className={styles.search}>
              <input
                ref={inputRef}
                autoFocus
                type="text"
                placeholder={`${t("search")}...`}
                value={searchQuery}
                onChange={handleSearch}
              />
              <pre ref={counterRef} className={styles.resultsCount}>
                {isSearching ? (
                  <span className={styles.spinner}></span>
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
        </main>
      )}
    </PageLayout>
  );
}
