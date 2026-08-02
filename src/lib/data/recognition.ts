export type RecognitionCategory =
  | "MEMBER"
  | "VOLUNTEER"
  | "AMBASSADOR"
  | "CORE_TEAM"
  | "DOMAIN_SPECIFIC";

const PORTAL_CATEGORIES: Record<string, RecognitionCategory> = {
  member: "MEMBER",
  volunteer: "VOLUNTEER",
  ambassador: "AMBASSADOR",
  core_team: "CORE_TEAM",
  domain_specific: "DOMAIN_SPECIFIC",
};

/** portal-core stores categories lowercase; the UI's accent maps and filters
 *  are keyed on the uppercase form this site has always used. */
export function toRecognitionCategory(value: string): RecognitionCategory {
  return PORTAL_CATEGORIES[value?.toLowerCase()] ?? "MEMBER";
}
