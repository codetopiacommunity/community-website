import type { StaticImageData } from "next/image";
import profileSample from "@/assets/images/profile/profile-sample.jpg";

export type RecognitionCategory =
  | "MEMBER"
  | "VOLUNTEER"
  | "AMBASSADOR"
  | "CORE_TEAM"
  | "DOMAIN_SPECIFIC";

export interface RecognitionEntry {
  id: string;
  name: string;
  role: string;
  image: StaticImageData;
  category: RecognitionCategory;
  awardName: string;
  period: string;
  impactSummary: string;
  achievements?: string[];
  metrics?: { label: string; value: string }[];
}

export const recognitions: RecognitionEntry[] = [
  {
    id: "elsie-kaufman",
    name: "Elsie Kaufman",
    role: "Community Mentor",
    image: profileSample,
    category: "CORE_TEAM",
    awardName: "EXCEPTIONAL MENTORSHIP",
    period: "Q1 2024",
    impactSummary:
      "Guided over 50 junior developers through the first cohort of the tech-pathway program, resulting in a 90% completion rate and widespread community growth.",
    achievements: [
      "Designed curriculum for 12-week mentorship cycle",
      "Conducted 48 hours of live coding sessions",
      "Pioneered the peer-review framework for community projects",
    ],
    metrics: [
      { label: "Mentees Guided", value: "50+" },
      { label: "Success Rate", value: "90%" },
      { label: "Hours Lectured", value: "48" },
    ],
  },
  {
    id: "kwame-mensah",
    name: "Kwame Mensah",
    role: "Technical Lead",
    image: profileSample,
    category: "DOMAIN_SPECIFIC",
    awardName: "ARCHITECTURAL EXCELLENCE",
    period: "MAR 2024",
    impactSummary:
      "Engineered the core foundation of the community library, standardizing components and reducing development time for community projects by 40%.",
    achievements: [
      "Built the initial component library with 20+ base components",
      "Implemented a standardized documentation system",
      "Optimized build pipeline for faster deployment",
    ],
    metrics: [
      { label: "Time Saved", value: "40%" },
      { label: "Components Created", value: "20+" },
      { label: "Github PRs", value: "112" },
    ],
  },
  {
    id: "ama-kusi",
    name: "Ama Kusi",
    role: "Community Advocate",
    image: profileSample,
    category: "AMBASSADOR",
    awardName: "OUTSTANDING ADVOCACY",
    period: "JAN 2024",
    impactSummary:
      "Successfully onboarded 200+ new members primarily through campus outreach and localized meetups in Accra and Kumasi.",
    achievements: [
      "Organized 4 campus outreach events",
      "Facilitated partnerships with local student tech hubs",
      "Established the first community chapter in Kumasi",
    ],
    metrics: [
      { label: "Members Onboarded", value: "200+" },
      { label: "Events Organized", value: "4" },
      { label: "Chapters Established", value: "1" },
    ],
  },
  {
    id: "yaw-boateng",
    name: "Yaw Boateng",
    role: "Frontend Specialist",
    image: profileSample,
    category: "VOLUNTEER",
    awardName: "CONTINUOUS CONTRIBUTION",
    period: "2023 - 2024",
    impactSummary:
      "Maintained a consistent flow of high-quality UI improvements, contributing to 30+ separate pull requests over the last 12 months.",
    achievements: [
      "Improved mobile responsiveness across the entire site",
      "Standardized typography styles and spacing",
      "Refactored legacy CSS into modular Tailwind patterns",
    ],
    metrics: [
      { label: "Pull Requests", value: "30+" },
      { label: "UI Fixes", value: "85" },
      { label: "Months Active", value: "12" },
    ],
  },
  {
    id: "kofi-sarfo",
    name: "Kofi Sarfo",
    role: "Lead Coordinator",
    image: profileSample,
    category: "CORE_TEAM",
    awardName: "LEADERSHIP EXCELLENCE",
    period: "ANNUAL 2023",
    impactSummary:
      "Spearheaded the organization of the first annual Codetopia summit, bringing together 500+ attendees and 15 industry partners.",
    achievements: [
      "Managed event logistics and speaker coordination",
      "Secured 15 industry sponsorships",
      "Directly oversaw a volunteer team of 20 people",
    ],
    metrics: [
      { label: "Summit Attendees", value: "500+" },
      { label: "Sponsors Secured", value: "15" },
      { label: "Volunteers Managed", value: "20" },
    ],
  },
];
