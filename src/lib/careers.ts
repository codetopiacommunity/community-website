export type CareerStatus = "open" | "closed";

export interface Career {
  id: number;
  slug: string;
  title: string;
  company: string;
  type: string;
  location: string;
  aboutRole: string;
  responsibilities: string[];
  niceToHave: string[];
  whatWeOffer: string[];
  howToApply: string;
  duration: string | null;
  requirements: string[];
  link: string | null;
  expiryDate: string | Date;
  isFeatured: boolean;
  status: CareerStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export function getCareerStatus(career: Career): CareerStatus {
  const now = new Date();
  const expiry = new Date(career.expiryDate);
  if (career.status === "closed" || expiry < now) return "closed";
  return "open";
}

/**
 * Get a plain-text preview snippet from a career (for list views).
 */
export function getDescriptionPreview(career: Career, maxLen = 160): string {
  const text = career.aboutRole || "";
  return text.length > maxLen ? `${text.slice(0, maxLen)}…` : text;
}
