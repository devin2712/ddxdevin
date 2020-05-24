import styles from "./BlogPost.module.css";
import Head from "next/head";

export interface BlogPostProps {
  title: String;
  children: React.ReactNode;
}

export default function BlogPost({ title, children }: BlogPostProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <article className={styles.blogPost}>
        {title ? <h1>{title}</h1> : null}
        <section>{children}</section>
      </article>
    </>
  );
}
