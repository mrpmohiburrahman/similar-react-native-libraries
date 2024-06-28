import { Library } from "../types";

export const calculatePopularityScore = (data: Library): Library => {
  const { downloads, weekDownloads } = data.npm || {};
  const { stars, createdAt } = data.github?.stats || {};
  const unmaintained = data.unmaintained;

  if (!downloads || !weekDownloads) {
    return { ...data, popularity: -1 };
  }

  const popularityGain =
    (weekDownloads - Math.floor(downloads / 4)) / downloads;
  const downloadsPenalty = downloads < 250 ? 0.45 : 0;
  const starsPenalty = (stars ?? 0) < 25 ? 0.1 : 0;
  const unmaintainedPenalty = unmaintained ? 0.25 : 0;
  const freshPackagePenalty =
    Date.now() - new Date(createdAt ?? "") < 6048e5 ? 0.3 : 0;

  const popularity = parseFloat(
    (
      popularityGain -
      downloadsPenalty -
      starsPenalty -
      unmaintainedPenalty -
      freshPackagePenalty
    ).toFixed(3)
  );

  return {
    ...data,
    popularity,
  };
};
