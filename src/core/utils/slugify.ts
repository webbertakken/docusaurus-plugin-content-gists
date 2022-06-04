import { replaceAll } from "./replaceAll";

export const slugify = (name: string) => {
  return encodeURIComponent(replaceAll(name.toLowerCase(), /[\s_]+/, "-"));
};
