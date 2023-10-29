import Link from "next/link";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <span className={styles.icon} aria-hidden="true">&#8593;</span> INDEX
      </Link>
    </nav>
  );
}
