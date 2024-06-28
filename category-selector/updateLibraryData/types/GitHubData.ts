type GitHubData = {
  urls: {
    repo: string;
    clone: string;
    homepage?: string | null;
  };
  stats: {
    hasIssues: boolean;
    hasWiki: boolean;
    hasPages: boolean;
    hasDownloads: boolean;
    hasTopics?: boolean;
    updatedAt: Date | string;
    createdAt: Date | string;
    pushedAt: Date | string;
    issues: number;
    subscribers: number;
    stars: number;
    forks: number;
  };
  name: string;
  fullName: string;
  description: string;
  topics?: string[];
  license?: {
    key: string;
    name: string;
    spdxId: string;
    url: string;
    id: string;
  };
  lastRelease?: {
    name: string;
    tagName: string;
    createdAt: Date | string;
    publishedAt: Date | string;
    isPrerelease: boolean;
  };
  hasTypes?: boolean;
  newArchitecture?: boolean;
};
