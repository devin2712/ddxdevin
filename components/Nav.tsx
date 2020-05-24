import Link from "next/link";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>&#8593; INDEX</a>
      </Link>
    </nav>
  );
}
