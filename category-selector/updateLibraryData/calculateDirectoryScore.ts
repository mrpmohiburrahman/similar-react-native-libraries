import { Library } from "../types";
import { getCombinedPopularity } from "./getCombinedPopularity";

export const calculateDirectoryScore = (data: Library): Library => {
  const modifiers = [
    {
      name: "Very popular",
      value: 40,
      condition: (data: Library) => getCombinedPopularity(data) > 10000,
    },
    {
      name: "Popular",
      value: 10,
      condition: (data: Library) => getCombinedPopularity(data) > 2500,
    },
    {
      name: "Recommended",
      value: 20,
      condition: (data: Library) => data.goldstar,
    },
    {
      name: "Lots of open issues",
      value: -20,
      condition: (data: Library) => (data.github?.stats.issues ?? 0) >= 75,
    },
    {
      name: "No license",
      value: -20,
      condition: (data: Library) => !data.github?.license,
    },
    {
      name: "GPL license",
      value: -20,
      condition: (data: Library) => data.github?.license?.key.startsWith("gpl"),
    },
    {
      name: "Recently updated",
      value: 10,
      condition: (data: Library) =>
        new Date(data.github?.stats.updatedAt ?? "") >=
        new Date(Date.now() - 30 * 864e5),
    },
    {
      name: "Not updated recently",
      value: -20,
      condition: (data: Library) =>
        new Date(data.github?.stats.updatedAt ?? "") <=
        new Date(Date.now() - 180 * 864e5),
    },
  ];

  const minScore = modifiers.reduce(
    (acc, mod) => (mod.value < 0 ? acc + mod.value : acc),
    0
  );
  const maxScore = modifiers.reduce(
    (acc, mod) => (mod.value > 0 ? acc + mod.value : acc),
    0
  );

  const matchingModifiers = modifiers.filter((mod) => mod.condition(data));
  const rawScore = matchingModifiers.reduce((acc, mod) => acc + mod.value, 0);
  const score = Math.round(
    ((rawScore - minScore) / (maxScore - minScore)) * 100
  );

  return {
    ...data,
    score,
    matchingScoreModifiers: matchingModifiers.map((mod) => mod.name),
  };
};
