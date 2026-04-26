export type CareerStatus = "open" | "closed";

export interface Career {
  id: number;
  title: string;
  company: string;
  type: string;
  location: string;
  description: string;
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

  if (career.status === "closed" || expiry < now) {
    return "closed";
  }

  return "open";
}
