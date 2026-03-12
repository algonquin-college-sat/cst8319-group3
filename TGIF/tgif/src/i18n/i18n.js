import en from "./en.json";
import fr from "./fr.json";

const DICTS = { EN: en, FR: fr };

export function getDict(language) {
  return DICTS[language] ?? DICTS.EN;
}

export function t(dict, key, fallback) {
  if (!dict || !key) return fallback ?? key ?? "";
  const parts = key.split(".");
  let cur = dict;
  for (const p of parts) {
    if (cur && Object.prototype.hasOwnProperty.call(cur, p)) {
      cur = cur[p];
    } else {
      return fallback ?? key;
    }
  }
  return typeof cur === "string" ? cur : fallback ?? key;
}

