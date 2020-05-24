import Link from "next/link";

import styles from "./LinkList.module.css";

export interface LinkDefinition {
  url: String;
  title: String;
  isExternal?: boolean;
}

export interface LinkListProps {
  title?: String;
  links: Array<LinkDefinition>;
}

export default function LinkList({ title, links }: LinkListProps) {
  return (
    <>
      {title ? <label className={styles.title}>{title}</label> : null}
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.url as string} className={styles.link}>
            {link.isExternal && link.isExternal == true ? (
              <a href={link.url as string} target="_blank" rel="noreferrer">
                {link.title}
              </a>
            ) : (
              <Link href={link.url as string}>
                <a>{link.title}</a>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
