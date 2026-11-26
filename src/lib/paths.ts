import { siteUrl } from "../config";

/** Internal path with a trailing slash. Files such as `/sample-tools.csv` are left as-is. */
export function href(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  if (path === "/") return "/";
  const last = path.split("/").filter(Boolean).pop() ?? "";
  if (last.includes(".")) return path.startsWith("/") ? path : `/${path}`;
  return path.endsWith("/") ? path : `${path}/`;
}

export function toolHref(id: string): string {
  return href(`/tools/${id}`);
}

export function categoryHref(slug: string): string {
  return href(`/categories/${slug}`);
}

export function absoluteUrl(path: string): string {
  return new URL(href(path), `${siteUrl}/`).href;
}

export function samePath(a: string, b: string): boolean {
  const normalize = (path: string) => {
    if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
    return path;
  };
  return normalize(a) === normalize(b);
}
