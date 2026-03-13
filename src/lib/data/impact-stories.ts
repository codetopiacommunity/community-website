import djangoGirlsGroupPhoto from "@/assets/images/impact-stories/djangogirlskoforiduagrouppic.jpg";
import ieeeGroupPhoto from "@/assets/images/impact-stories/ieee-speaker-image.jpg";
import djangoGirlsLogo from "@/assets/images/orgs-logos/djgirlskoforidua.png";
import ieeeLogo from "@/assets/images/orgs-logos/IEEE-CS_LogoTM.png";

export interface ImpactStory {
  id: number;
  title: string;
  impact: string;
  image: string;
  logo: string;
  date: string;
  location: string;
  link?: string;
  galleryLink?: string;
}

export const impactStories: ImpactStory[] = [
  {
    id: 1,
    title: "Django Girls Koforidua",
    impact:
      "We mentored aspiring developers through a high-intensity Django bootcamp, transforming raw curiosity into technical self-reliance. By guiding participants from their first line of code to a production-ready deployment, we ensured they didn't just 'learn'—they shipped.",
    image: djangoGirlsGroupPhoto.src,
    logo: djangoGirlsLogo.src,
    galleryLink:
      "https://photos.google.com/share/AF1QipPGhaXCzuAeXAQBPLukrY12oqzkc7WrxCyJ3_fHhN3GaAsZ2kzUDDgxfUpgpZghJA?key=VUE4N2czMzViTDQ0NE8xQXA5V045dmFXQkhjTi1n",
    date: "21 - 22 Feb 2025",
    location: "Koforidua Library",
  },
  {
    id: 2,
    title: "IEEE-CS GCTU Chapter",
    impact:
      "Demystified the Django ecosystem for the IEEE-CS GCTU Chapter through a high-stakes workshop and live-coding demonstration. We showcased the framework's architecture and industry-standard workflows, proving that technical complexity is a choice—and clean code is the solution.",
    image: ieeeGroupPhoto.src,
    logo: ieeeLogo.src,
    date: "16 July 2025",
    location: "GCTU",
    galleryLink:
      "https://drive.google.com/drive/folders/1NTUm-B4t_x_EzdfE8TMeOR5vv8dZ9bS8",
  },
];
