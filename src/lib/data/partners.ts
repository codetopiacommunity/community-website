import djangoGirlsLogo from "@/assets/images/orgs-logos/djgirlskoforidua.png";
import ieeeLogo from "@/assets/images/orgs-logos/IEEE-CS_LogoTM.png";
import ossAfricaLogo from "@/assets/images/orgs-logos/ossafrica.png";

export type RelationshipType = "worked-with" | "partner" | "sponsor";

export interface Organisation {
  id: number;
  name: string;
  logo: string;
  type: RelationshipType;
  website?: string;
}

export const organisations: Organisation[] = [
  {
    id: 1,
    name: "IEEE-CS",
    logo: ieeeLogo.src,
    type: "worked-with",
    website: "https://www.computer.org",
  },
  {
    id: 2,
    name: "Django Girls Koforidua",
    logo: djangoGirlsLogo.src,
    type: "worked-with",
    website: "https://djangogirls.org/en/koforidua/",
  },
  {
    id: 3,
    name: "OSSAfrica",
    logo: ossAfricaLogo.src,
    type: "partner",
    website: "https://ossafrica.org",
  },
];
