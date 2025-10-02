import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import styles from "./GitHubRepoDisplay.module.css";

type GitHubRepoDisplayProps = {
  username: string;
  repoName: string;
  url: string;
  className?: string;
};

export const GitHubRepoDisplay = async ({
  username,
  repoName,
  url,
  className,
}: GitHubRepoDisplayProps) => {
  const t = await getTranslations("githubRepo");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card}${className ? ` ${className}` : ""}`}
      aria-label={t("ariaLabel", { username, repoName })}
    >
      <div className={styles.header}>
        <Image
          src="/icons/github-mark-white.svg"
          alt="GitHub"
          width={24}
          height={24}
          className={styles.avatar}
        />
        <div className={styles.repoPath}>
          <span className={styles.username}>{username}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.repoName}>{repoName}</span>
        </div>
      </div>
      <span className={styles.arrow}>↗</span>
    </a>
  );
};
