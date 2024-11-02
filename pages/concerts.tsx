import Head from "next/head";
import { useIntl } from "react-intl";

import { useCallback, useEffect, useMemo, useState } from "react";
import BlogPost from "../components/BlogPost";
import Layout from "../components/Layout";
import { useDebounce } from "../hooks/useDebounce";
import { getHeaders, parseCSV } from "../utils/CSVreader";

import { useRouter } from "next/router";
import styles from "./concerts.module.css";

import React from "react";
import { ARTIST_KEY, ArtistDisplay } from "../components/ArtistDisplay";
import useBrowserLocale from "../hooks/useBrowserLocale";
import { decodeQuery, encodeQuery } from "../utils/encoder";
import { normalizeString } from "../utils/stringNormalizer";

export default function Concerts() {
  const { formatMessage } = useIntl();
  const locale = useBrowserLocale();

  const router = useRouter();
  const { q } = router.query;
  const initialSearchQuery = q ? decodeQuery(q as string) : "";

  const [data, setData] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const CONCERT_DATA_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7cRqq437Wt4-eWBZkbUUmO1GnCUQ-V_f4e9-VVwPS0hbD5vQDgFWzvgm16hMvDSLOtgRF8TBgRsvM/pub?gid=0&single=true&output=csv";
  const CONCERT_CACHE_KEY = "ddxdevin.concertData";
  const CONCERT_TIME_KEY = "ddxdevin.concertDataCacheTime";
  const CONCERT_CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // One Day

  useEffect(() => {
    if (q) {
      setSearchQuery(decodeQuery(q as string));
    }
  }, [q]);

  useEffect(() => {
    if (debouncedSearchQuery !== initialSearchQuery) {
      if (debouncedSearchQuery) {
        router.push(
          {
            pathname: router.pathname,
            query: { q: encodeQuery(debouncedSearchQuery) },
          },
          undefined,
          { shallow: true }
        );
      } else {
        router.push(
          {
            pathname: router.pathname,
          },
          undefined,
          { shallow: true }
        );
      }
    }
  }, [debouncedSearchQuery, router, initialSearchQuery]);

  useEffect(() => {
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
  }, []);

  const getCachedData = () => {
    const cachedData: string = localStorage.getItem(CONCERT_CACHE_KEY);
    const cachedTime: number = parseInt(localStorage.getItem(CONCERT_TIME_KEY));
    if (
      cachedData &&
      cachedTime &&
      Date.now() - cachedTime < CONCERT_CACHE_EXPIRATION
    ) {
      return cachedData;
    }

    return null;
  };

  const setCachedData = (data) => {
    localStorage.setItem(CONCERT_CACHE_KEY, data);
    localStorage.setItem(CONCERT_TIME_KEY, Date.now().toString());
  };

  const fetchDataFromUrl = async (url) => {
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
    if (!debouncedSearchQuery) return parsedData;

    return parsedData.filter((row) =>
      normalizeString(row[ARTIST_KEY]).includes(
        normalizeString(debouncedSearchQuery)
      )
    );
  }, [debouncedSearchQuery, parsedData]);

  const resultsCount = useMemo(() => {
    if (!debouncedSearchQuery) return [parsedData.length, parsedData.length];
    return [filteredRows.length, parsedData.length];
  }, [debouncedSearchQuery, parsedData]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trimStart());
  }, []);

  return (
    <Layout largeFormat>
      <Head>
        <meta
          property="og:title"
          content={formatMessage({ id: "ddxdevin.concerts.title" })}
        />
      </Head>
      <div className={styles.ductTapeContainer}>
        <div className={styles.ductTape}></div>
      </div>
      <BlogPost title={formatMessage({ id: "ddxdevin.concerts.title" })}>
        <section className={styles.concertLog}>
          {!data && (
            <p>{formatMessage({ id: "ddxdevin.concerts.loading" })}...</p>
          )}
        </section>

        {data && (
          <main className={styles.concertLogList}>
            {lastTimestamp && (
              <div className={styles.lastUpdated}>
                <div>
                  <pre>
                    {formatMessage({ id: "ddxdevin.concerts.lastUpdated" })}:{" "}
                    {new Intl.DateTimeFormat(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(lastTimestamp)}
                  </pre>
                </div>
              </div>
            )}

            <div className={styles.setListHairlineContainer}>
              <div className={styles.setListHairline}></div>
            </div>

            <div className={styles.search}>
              <input
                autoFocus
                type="text"
                placeholder={`${formatMessage({
                  id: "ddxdevin.concerts.search",
                })}...`}
                value={searchQuery}
                onChange={handleSearch}
              />
              <pre className={styles.resultsCount}>
                {resultsCount[0]} / {resultsCount[1]}
              </pre>
            </div>

            <div className={styles.indicator}>
              <pre className={styles.indicator}>
                <strong className={styles.showCount}>(#)</strong>{" "}
                {formatMessage({ id: "ddxdevin.concerts.indicator" })}
              </pre>
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
                <h2 className={styles.encore}>
                  {formatMessage({ id: "ddxdevin.concerts.encore" })}
                </h2>
                <ul className={styles.artistList}>
                  <li>
                    <ArtistDisplay
                      artist={filteredRows[filteredRows.length - 1]}
                    />
                  </li>
                </ul>
              </>
            )}
            <div className={styles.ductTapeContainer}>
              <div
                className={`${styles.ductTape} ${styles.ductTape_alt}`}
              ></div>
            </div>
          </main>
        )}
      </BlogPost>
    </Layout>
  );
}
