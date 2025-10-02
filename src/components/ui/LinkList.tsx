"use client";

import React, { JSX, useState, useEffect } from "react";
import styles from "./LinkList.module.css";
import { LinkListSection } from "@/types";
import { Link as NavLink } from "@/i18n/navigation";
import { Header } from "./Header";

type LinkListProps = {
  sections: LinkListSection[];
  showIndex?: boolean;
};

type CurrentLink = {
  sectionKey: string;
  linkKey: string;
} | null;

const INDEX_ICONS: Record<number, JSX.Element> = {
  1: (
    <span className={styles.indexIcon} aria-hidden="true">
      {String.fromCodePoint(0x2776)}
    </span>
  ),
  2: (
    <span className={styles.indexIcon} aria-hidden="true">
      {String.fromCodePoint(0x2777)}
    </span>
  ),
  3: (
    <span className={styles.indexIcon} aria-hidden="true">
      {String.fromCodePoint(0x2778)}
    </span>
  ),
  4: (
    <span className={styles.indexIcon} aria-hidden="true">
      {String.fromCodePoint(0x2779)}
    </span>
  ),
  5: (
    <span className={styles.indexIcon} aria-hidden="true">
      {String.fromCodePoint(0x277a)}
    </span>
  ),
  6: (
    <span className={styles.indexIcon} aria-hidden="true">
      {String.fromCodePoint(0x277b)}
    </span>
  ),
  7: (
    <span className={styles.indexIcon} aria-hidden="true">
      {String.fromCodePoint(0x277c)}
    </span>
  ),
  8: (
    <span className={styles.indexIcon} aria-hidden="true">
      {String.fromCodePoint(0x277d)}
    </span>
  ),
  9: (
    <span className={styles.indexIcon} aria-hidden="true">
      {String.fromCodePoint(0x277e)}
    </span>
  ),
};

export const LinkList: React.FC<LinkListProps> = ({
  sections,
  showIndex = true,
}) => {
  const [currentLink, setCurrentLink] = useState<CurrentLink>(null);
  const [arrowPosition, setArrowPosition] = useState<{
    top: number;
    section: string;
  } | null>(null);
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const [isFocusedSection, setIsFocusedSection] = useState(false);
  const blurTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const linkRefs = React.useRef<Record<string, HTMLLIElement | null>>({});

  const handleSetCurrentLink = (link: CurrentLink) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setCurrentLink(link);

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    if (link) {
      rafRef.current = requestAnimationFrame(() => {
        const refKey = `${link.sectionKey}-${link.linkKey}`;
        const element = linkRefs.current[refKey];
        if (element) {
          const linkElement = element.querySelector("a");
          if (linkElement) {
            const rect = linkElement.getBoundingClientRect();
            const parent = element.parentElement;
            if (parent) {
              const parentRect = parent.getBoundingClientRect();
              setArrowPosition({
                top: rect.top - parentRect.top + rect.height / 2,
                section: link.sectionKey,
              });
            }
          }
        }
        rafRef.current = null;
      });
    }
  };

  const handleClearCurrentLink = () => {
    blurTimeoutRef.current = setTimeout(() => {
      if (!isHoveringSection && !isFocusedSection) {
        setCurrentLink(null);
        setArrowPosition(null);
      }
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const getLinkClassName = (sectionKey: string, linkKey: string): string => {
    if (!currentLink) return styles.default;
    if (
      currentLink.sectionKey === sectionKey &&
      currentLink.linkKey === linkKey
    ) {
      return styles.active;
    }
    return styles.inactive;
  };

  const hasArrowContent = (section: (typeof sections)[0]) =>
    section.links.some((link) => link.content === "arrow");

  return sections.map((section, index) => {
    const isSectionInactive =
      currentLink && currentLink.sectionKey !== section.key;
    const showArrow =
      hasArrowContent(section) && arrowPosition?.section === section.key;

    return (
      <section key={section.key} className={styles.linkSection}>
        <Header
          as="h2"
          title={
            <div
              className={`${styles.headerWithIndex} ${
                isSectionInactive ? styles.inactive : ""
              }`}
            >
              {showIndex && index > -1 && index < 10 && INDEX_ICONS[index + 1]}
              {section.title}
            </div>
          }
        />
        <div
          className={styles.listWrapper}
          onMouseEnter={() => setIsHoveringSection(true)}
          onMouseLeave={() => {
            setIsHoveringSection(false);
            setCurrentLink(null);
            setArrowPosition(null);
            if (blurTimeoutRef.current) {
              clearTimeout(blurTimeoutRef.current);
              blurTimeoutRef.current = null;
            }
            if (rafRef.current) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }
          }}
        >
          <ul className={styles.list}>
            {section.links.map((link) => (
              <li
                key={link.key}
                ref={(el) => {
                  linkRefs.current[`${section.key}-${link.key}`] = el;
                }}
                className={getLinkClassName(section.key, link.key)}
                onMouseEnter={() =>
                  handleSetCurrentLink({
                    sectionKey: section.key,
                    linkKey: link.key,
                  })
                }
              >
                {link.config.external ? (
                  <a
                    className={styles.link}
                    href={link.config.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.title} (opens in new tab)`}
                    onFocus={() => {
                      setIsFocusedSection(true);
                      handleSetCurrentLink({
                        sectionKey: section.key,
                        linkKey: link.key,
                      });
                    }}
                    onBlur={() => {
                      setIsFocusedSection(false);
                      handleClearCurrentLink();
                    }}
                  >
                    <span>{link.title}</span>
                    {link.content === "arrow" ? (
                      <span className={styles.staticArrow}>→</span>
                    ) : (
                      <span className={styles.linkContent}>{link.content}</span>
                    )}
                  </a>
                ) : (
                  <NavLink
                    href={link.config.url}
                    className={styles.link}
                    prefetch={true}
                    onFocus={() => {
                      setIsFocusedSection(true);
                      handleSetCurrentLink({
                        sectionKey: section.key,
                        linkKey: link.key,
                      });
                    }}
                    onBlur={() => {
                      setIsFocusedSection(false);
                      handleClearCurrentLink();
                    }}
                  >
                    <span>{link.title}</span>
                    {link.content === "arrow" ? (
                      <span className={styles.staticArrow}>→</span>
                    ) : (
                      <span className={styles.linkContent}>{link.content}</span>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          {showArrow && (
            <span
              className={styles.floatingArrow}
              style={{ top: `${arrowPosition.top}px` }}
            >
              →
            </span>
          )}
        </div>
      </section>
    );
  });
};

LinkList.displayName = "LinkList";
