import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">
        <a>&#8593; Index</a>
      </Link>
    </nav>
  );
}
