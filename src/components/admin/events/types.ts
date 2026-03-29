"use client";

export interface EventFormData {
  title: string;
  classification: string;
  description: string;
  startDate: string;
  endDate: string;
  isOnline: boolean;
  reserveSpotLink: string;
  joinMeetingLink: string;
  recordedVideoLink: string;
  locationUrl: string;
}
