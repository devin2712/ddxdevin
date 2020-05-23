import Link from "next/link";

import styles from "./LinkList.module.css";

export type LinkDefinition = {
  url: String;
  title: String;
};

export type LinkListProps = {
  title?: String;
  links: Array<LinkDefinition>;
};

export default function LinkList({ title, links }: LinkListProps) {
  return (
    <ul className={styles.linkList}>
      {title ? <label className={styles.title}>{title}</label> : null}
      {links.map((link) => (
        <li key={link.url as string}>
          <Link href={link.url as string}>
            <a>{link.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
