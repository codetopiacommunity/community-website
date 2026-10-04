/**
 * The canonical "how do I join" destination.
 *
 * Relative on purpose -- `Hero` and `Header` currently hardcode the absolute
 * production URL, which sends anyone clicking it in dev or preview straight
 * to production. Those two should move onto this constant too.
 */
export const JOIN_URL = "/howtos/getting-started/join-the-community";

/**
 * Where organisations write to us. One inbox for everything until each kind
 * of request has its own address. Partnerships go to codetopia.org/partners.
 */
export const CONTACT_EMAIL = "hello@codetopia.org";

function mailto(subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT_EMAIL}?${params.join("&")}`;
}

export const CONTACT_URL = mailto("Working with Codetopia Community");

/**
 * Roles are listed by an admin from /admin/careers, so the email asks for
 * every field that form needs and nobody has to write back for details.
 */
export const POST_ROLE_URL = mailto(
  "Post a role on the Codetopia Community careers board",
  [
    "Role title:",
    "Organisation:",
    "Type (job, internship, freelance):",
    "Location (or remote):",
    "About the role:",
    "How to apply (link or email):",
    "Closing date:",
    "",
  ].join("\n"),
);
