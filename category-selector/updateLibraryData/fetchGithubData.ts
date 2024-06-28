import { octokit } from "./octokit";

export const fetchGithubData = async (
    owner: string,
    repo: string
  ): Promise<GitHubData> => {
    const { data } = await octokit.repos.get({ owner, repo });
    const topicsResponse = await octokit.repos.getAllTopics({ owner, repo });
    const releasesResponse = await octokit.repos.listReleases({ owner, repo });
  
    const lastRelease = releasesResponse.data.length
      ? releasesResponse.data[0]
      : null;
  
    return {
      urls: {
        repo: data.html_url,
        clone: data.clone_url,
        homepage: data.homepage,
      },
      stats: {
        hasIssues: data.has_issues,
        hasWiki: data.has_wiki,
        hasPages: data.has_pages,
        hasDownloads: true,
        hasTopics: topicsResponse.data.names.length > 0,
        updatedAt: data.updated_at,
        createdAt: data.created_at,
        pushedAt: data.pushed_at,
        issues: data.open_issues_count,
        subscribers: data.subscribers_count,
        stars: data.stargazers_count,
        forks: data.forks_count,
      },
      name: data.name,
      fullName: data.full_name,
      description: data?.description,
      topics: topicsResponse.data.names,
      license: data.license && {
        key: data.license.key,
        name: data.license.name,
        spdxId: data.license.spdx_id,
        url: data.license.url,
        id: data.license.node_id,
      },
      lastRelease: lastRelease && {
        name: lastRelease.name,
        tagName: lastRelease.tag_name,
        createdAt: lastRelease.created_at,
        publishedAt: lastRelease.published_at,
        isPrerelease: lastRelease.prerelease,
      },
      hasTypes: data.language === "TypeScript",
      newArchitecture: data.topics.includes("react-native-new-architecture"),
    };
  };
  