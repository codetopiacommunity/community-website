/** The site's public origin, without a trailing slash, for links in emails and redirects. */
export function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  return url.replace(/\/+$/, "");
}
