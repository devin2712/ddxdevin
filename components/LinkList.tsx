import Link from "next/link";

import styles from "./LinkList.module.css";

export interface LinkDefinition {
  url: String;
  title: String;
  isExternal?: boolean;
  externalLinkLabel?: String;
}

export interface LinkListProps {
  title?: String;
  links: Array<LinkDefinition>;
}

export default function LinkList({ title, links }: LinkListProps) {
  return (
    <section className={styles.linkList}>
      {title ? (
        <h2 className={styles.title}>
          <span aria-hidden="true" className={styles.icon}>
            &#x2192;
          </span>
          {title}
        </h2>
      ) : null}
      <ul>
        {links.map((link) => (
          <li key={link.url as string} className={styles.link}>
            {link.isExternal && link.isExternal == true ? (
              <a href={link.url as string} target="_blank" rel="noreferrer">
                {link.title}
                {link.externalLinkLabel && (
                  <span>
                    {" "}
                    [{link.externalLinkLabel}{" "}
                    <span className={styles.externalIcon} aria-hidden="true">
                      &#x2197;
                    </span>
                    ]
                  </span>
                )}
              </a>
            ) : (
              <Link href={link.url as string}>{link.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
