export type Link = {
  key: string;
  title: string;
  content?: React.ReactNode;
  config: {
    external: boolean;
    url: string;
  };
};

export type LinkListSection = {
  key: string;
  title: string;
  links: Link[];
};
