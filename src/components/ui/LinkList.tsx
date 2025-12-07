"use client";

import React, { JSX, useState, useEffect, useMemo } from "react";
import styles from "./LinkList.module.css";
import { LinkListSection } from "@/types";
import { Link as NavLink } from "@/i18n/navigation";
import { Header } from "./Header";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

type LinkListProps = {
  sections: LinkListSection[];
  showIndex?: boolean;
  baseDelay?: number;
  stagger?: number;
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
  baseDelay = 200,
  stagger = 16,
}) => {
  const isTouchDevice = useIsTouchDevice();
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

  // Calculate cumulative delays for all sections using useMemo
  const sectionDelays = useMemo(() => {
    return sections.reduce<{ delays: number[]; cumulativeCount: number }>(
      (acc, section) => {
        const sectionDelay = baseDelay + acc.cumulativeCount * stagger;
        const itemsInSection = 1 + section.links.length;
        return {
          delays: [...acc.delays, sectionDelay],
          cumulativeCount: acc.cumulativeCount + itemsInSection,
        };
      },
      { delays: [], cumulativeCount: 0 }
    ).delays;
  }, [sections, baseDelay, stagger]);

  return sections.map((section, sectionIndex) => {
    const isSectionInactive =
      currentLink && currentLink.sectionKey !== section.key;
    const showArrow =
      !isTouchDevice &&
      hasArrowContent(section) &&
      arrowPosition?.section === section.key;

    // Get pre-calculated delay for this section
    const sectionDelay = sectionDelays[sectionIndex];

    return (
      <section
        key={section.key}
        className={styles.linkSection}
      >
        <div
          className={section.className ?? ''}
          style={{ animationDelay: `${sectionDelay}ms` }}
        >
          <Header
            as="h2"
            title={
              <div
                className={`${styles.headerWithIndex} ${
                  isSectionInactive ? styles.inactive : ""
                }`}
              >
                {showIndex && sectionIndex > -1 && sectionIndex < 10 && INDEX_ICONS[sectionIndex + 1]}
                {section.title}
              </div>
            }
          />
        </div>
        <div
          className={styles.listWrapper}
          data-touch-device={isTouchDevice}
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
          onBlur={(e) => {
            // Check if focus is leaving the entire wrapper
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsFocusedSection(false);
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
            }
          }}
        >
          <ul className={styles.list}>
            {section.links.map((link, linkIndex) => {
              const linkDelay = sectionDelay + (linkIndex + 1) * stagger;
              return (
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
                <div
                  className={section.className ?? ''}
                  style={{ animationDelay: `${linkDelay}ms` }}
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
                </div>
                </li>
              );
            })}
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
