"use client";

import React, { JSX, useState, useEffect } from "react";
import styles from "./LinkList.module.css";
import { LinkListSection } from "@/types";
import { Link as NavLink } from "@/i18n/navigation";
import { Header } from "./Header";

type LinkListProps = {
  sections: LinkListSection[];
};

type CurrentLink = {
  sectionKey: string;
  linkKey: string;
} | null;

const INDEX_ICONS: Record<number, JSX.Element> = {
  1: <span className={styles.indexIcon} aria-hidden="true">{String.fromCodePoint(0x2776)}</span>,
  2: <span className={styles.indexIcon} aria-hidden="true">{String.fromCodePoint(0x2777)}</span>,
  3: <span className={styles.indexIcon} aria-hidden="true">{String.fromCodePoint(0x2778)}</span>,
  4: <span className={styles.indexIcon} aria-hidden="true">{String.fromCodePoint(0x2779)}</span>,
  5: <span className={styles.indexIcon} aria-hidden="true">{String.fromCodePoint(0x277a)}</span>,
  6: <span className={styles.indexIcon} aria-hidden="true">{String.fromCodePoint(0x277b)}</span>,
  7: <span className={styles.indexIcon} aria-hidden="true">{String.fromCodePoint(0x277c)}</span>,
  8: <span className={styles.indexIcon} aria-hidden="true">{String.fromCodePoint(0x277d)}</span>,
  9: <span className={styles.indexIcon} aria-hidden="true">{String.fromCodePoint(0x277e)}</span>,
};

export const LinkList: React.FC<LinkListProps> = ({ sections }) => {
  const [currentLink, setCurrentLink] = useState<CurrentLink>(null);
  const blurTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSetCurrentLink = (link: CurrentLink) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setCurrentLink(link);
  };

  const handleClearCurrentLink = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setCurrentLink(null);
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const getLinkClassName = (sectionKey: string, linkKey: string): string => {
    if (!currentLink) return styles.default;
    if (currentLink.sectionKey === sectionKey && currentLink.linkKey === linkKey) {
      return styles.active;
    }
    return styles.inactive;
  };

  return sections.map((section, index) => {
    const isSectionInactive = currentLink && currentLink.sectionKey !== section.key;

    return (
      <section key={section.key} className={styles.linkSection}>
        <Header
          as="h2"
          title={
            <div
              className={`${styles.headerWithIndex} ${
                isSectionInactive ? styles.inactive : ''
              }`}
            >
              {index > -1 && index < 10 && INDEX_ICONS[index + 1]}
              {section.title}
            </div>
          }
        />
        <ul>
          {section.links.map((link) => (
            <li
              key={link.key}
              className={getLinkClassName(section.key, link.key)}
              onMouseEnter={() =>
                handleSetCurrentLink({ sectionKey: section.key, linkKey: link.key })
              }
              onMouseLeave={handleClearCurrentLink}
            >
              {link.config.external ? (
                <a
                  className={styles.link}
                  href={link.config.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.title} (opens in new tab)`}
                  onFocus={() =>
                    handleSetCurrentLink({ sectionKey: section.key, linkKey: link.key })
                  }
                  onBlur={handleClearCurrentLink}
                >
                  <span>{link.title}</span>
                  <span className={styles.linkContent}>{link.content}</span>
                </a>
              ) : (
                <NavLink
                  href={link.config.url}
                  className={styles.link}
                  prefetch={true}
                  onFocus={() =>
                    handleSetCurrentLink({ sectionKey: section.key, linkKey: link.key })
                  }
                  onBlur={handleClearCurrentLink}
                >
                  <span>{link.title}</span>
                  <span className={styles.linkContent}>{link.content}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  });
};

LinkList.displayName = "LinkList";