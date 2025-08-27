import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Resume() {
  const router = useRouter();
  useEffect(() => {
    router.push("/docs/DevinNguyen-SoftwareEngineer.pdf");
  }, []);

  return (
    <Head>
      <title>Resume - Devin Nguyen</title>
      <meta name="description" content="Devin Nguyen's Resume" />
      <meta property="og:title" content="Resume - Devin Nguyen" />
      <meta property="og:description" content="Devin Nguyen's Resume" />
    </Head>
  );
}