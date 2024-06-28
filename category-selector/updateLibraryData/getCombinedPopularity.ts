import { Library } from "../types";

export const getCombinedPopularity = (data: Library): number => {
    const { subscribers, forks, stars } = data.github?.stats || {};
    const { downloads } = data.npm || {};
    return (
      (subscribers ?? 0) * 20 +
      (forks ?? 0) * 10 +
      (stars ?? 0) +
      (downloads ?? 0) / 100
    );
  };