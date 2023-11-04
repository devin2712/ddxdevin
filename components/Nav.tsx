import Link from "next/link";

import styles from "./Nav.module.css";
import { useIntl } from "react-intl";

export default function Nav() {
  const { formatMessage } = useIntl();

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <span className={styles.icon} aria-hidden="true">
          &#x2191;
        </span>{" "}
        {formatMessage({ id: "ddxdevin.index" })}
      </Link>
    </nav>
  );
}
