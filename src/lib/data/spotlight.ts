import type { StaticImageData } from "next/image";
import spotlightImage from "@/assets/images/spotlights/torvalds.jpg";

export interface SpotlightEntry {
  id: string;
  name: string;
  role: string;
  image: StaticImageData;
  contribution: string;
  links: {
    label: string;
    url: string;
  }[];
}

export const spotlightEntries: SpotlightEntry[] = [
  {
    id: "linus-torvalds",
    name: "Linus Torvalds",
    role: "Open Source Architect",
    image: spotlightImage,
    contribution:
      "Engineered the Linux kernel and the Git version control system, fundamental pillars of modern computing.",
    links: [{ label: "GITHUB", url: "https://github.com/torvalds" }],
  },
];
