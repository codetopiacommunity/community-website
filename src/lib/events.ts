/**
 * Utility function to determine the status of an event based on current time.
 */
export const getEventStatus = (event: {
  startDate: Date | string;
  endDate?: Date | string | null;
}) => {
  const now = new Date();
  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : null;

  if (start > now) return "UPCOMING";
  if (end && now > end) return "COMPLETED";
  if (start <= now && (!end || now <= end)) return "LIVE";
  return "COMPLETED"; // Fallback
};

export type EventStatus = "UPCOMING" | "LIVE" | "COMPLETED";

export interface Event {
  id: number;
  classification: string;
  title: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  isOnline: boolean;
  reserveSpotLink?: string | null;
  joinMeetingLink?: string | null;
  recordedVideoLink?: string | null;
  locationUrl?: string | null;
}
