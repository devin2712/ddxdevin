import Head from "next/head";
import { useIntl } from "react-intl";

import { useCallback, useEffect, useMemo, useState } from "react";
import BlogPost from "../components/BlogPost";
import Layout from "../components/Layout";
import { useDebounce } from "../hooks/useDebounce";
import { getHeaders, parseCSV } from "../utils/CSVreader";

const Highlight = React.lazy(() => import("../components/Highlight"));

import { useRouter } from "next/router";
import styles from "./concerts.module.css";

import React from "react";
import { decodeQuery, encodeQuery } from "../utils/encoder";
import { normalizeString } from "../utils/stringNormalizer";
import useBrowserLocale from "../hooks/useBrowserLocale";

export default function Concerts() {
  const { formatMessage } = useIntl();
  const locale = useBrowserLocale();

  const router = useRouter();
  const { q } = router.query;
  const initialSearchQuery = q ? decodeQuery(q as string) : "";

  const [data, setData] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const CONCERT_DATA_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7cRqq437Wt4-eWBZkbUUmO1GnCUQ-V_f4e9-VVwPS0hbD5vQDgFWzvgm16hMvDSLOtgRF8TBgRsvM/pub?gid=0&single=true&output=csv";
  const ARTIST_KEY = "ARTIST NAME";

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
        const response = await fetch(CONCERT_DATA_URL);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const text = await response.text();
        setData(text);
      } catch (error) {
        console.error("Error fetching CSV data: ", error);
      }
    };

    fetchData();
  }, []);

  const parsedData = useMemo(() => {
    if (!data) return [];
    return parseCSV(data);
  }, [data]);

  const lastTimestamp = useMemo((): (Date | null) => {
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
      <BlogPost title={formatMessage({ id: "ddxdevin.concerts.title" })}>
        <section className={styles.concertLog}>
          <p>
            <strong className={styles.showCount}>(#)</strong>{" "}
            {formatMessage({ id: "ddxdevin.concerts.indicator" })}
          </p>
          {!data && (
            <p>{formatMessage({ id: "ddxdevin.concerts.loading" })}...</p>
          )}
        </section>
        {data && (
          <>
            <input
              autoFocus
              type="text"
              placeholder={`${formatMessage({
                id: "ddxdevin.concerts.search",
              })}...`}
              value={searchQuery}
              onChange={handleSearch}
            />
            <span className={styles.resultsCount}>
              {resultsCount[0]} / {resultsCount[1]}
            </span>
            <ul className={styles.artistList}>
              {filteredRows.map((artist, idx) => (
                <li key={idx}>
                  <Highlight
                    text={artist[ARTIST_KEY]}
                    highlight={debouncedSearchQuery}
                  />
                  {artist["SHOWS"] ? (
                    <strong
                      className={styles.showCount}
                    >{`(${artist["SHOWS"]})`}</strong>
                  ) : null}
                </li>
              ))}
            </ul>
            <section className={styles.lastUpdated}>
              <span>
                {formatMessage({ id: "ddxdevin.concerts.lastUpdated" })}:{" "}
              </span>
              <pre>
                {lastTimestamp?.toLocaleDateString(locale)}
              </pre>
            </section>
          </>
        )}
      </BlogPost>
    </Layout>
  );
}
