import styles from "./BlogPost.module.css";

export type BlogPostProps = {
  title: String;
  children: React.ReactNode;
};

export default function BlogPost({ title, children }: BlogPostProps) {
  return (
    <article className={styles.blogPost}>
      {title ? <h1>{title}</h1> : null}
      <section>{children}</section>
    </article>
  );
}
