import type { StaticImageData } from "next/image";
import profileSample from "@/assets/images/profile/profile-sample.jpg";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: StaticImageData;
  statement: string;
  expertise: string[];
  tier: "CORE" | "VOLUNTEER" | "AMBASSADOR";
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export const teamMembers: TeamMember[] = [
  // CORE TEAM
  {
    id: "seth-mensah",
    name: "Seth Mensah",
    role: "Core Founder / Tech Lead",
    image: profileSample,
    statement: "Building communities that outlast the founders.",
    expertise: ["Next.js", "Django", "System Design"],
    tier: "CORE",
    socials: {
      github: "https://github.com/smensah",
      linkedin: "https://linkedin.com/in/smensah",
      twitter: "https://twitter.com/smensah",
    },
  },
  {
    id: "abigail-ashun",
    name: "Abigail Ashun",
    role: "Operations Lead",
    image: profileSample,
    statement: "Obsessed with efficiency and community growth.",
    expertise: ["Operations", "Strategy", "Community Management"],
    tier: "CORE",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "emmanuel-tetteh",
    name: "Emmanuel Tetteh",
    role: "Lead Coordinator",
    image: profileSample,
    statement: "Bridging the gap between code and cooperation.",
    expertise: ["Project Management", "Agile", "Coordination"],
    tier: "CORE",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },

  // VOLUNTEERS
  {
    id: "john-doe",
    name: "John Doe",
    role: "Frontend Contributor",
    image: profileSample,
    statement: "Learning by doing, one PR at a time.",
    expertise: ["React", "CSS", "UI/UX"],
    tier: "VOLUNTEER",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    role: "Backend Support",
    image: profileSample,
    statement: "Data integrity is not optional.",
    expertise: ["Python", "PostgreSQL", "API Design"],
    tier: "VOLUNTEER",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },

  // AMBASSADORS
  {
    id: "kwesi-arthur",
    name: "Kwesi Arthur",
    role: "Campus Ambassador",
    image: profileSample,
    statement: "Empowering students through technology.",
    expertise: ["Evangelism", "Public Speaking", "Outreach"],
    tier: "AMBASSADOR",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "akua-boateng",
    name: "Akua Boateng",
    role: "Regional Advocate",
    image: profileSample,
    statement: "Tech should be accessible in every region.",
    expertise: ["Advocacy", "Events", "Strategic Partnerships"],
    tier: "AMBASSADOR",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];
