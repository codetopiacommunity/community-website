import djangoGirlsLogo from "@/assets/images/orgs-logos/djgirlskoforidua.png";
import ieeeLogo from "@/assets/images/orgs-logos/IEEE-CS_LogoTM.png";

export type RelationshipType = "worked-with" | "partner" | "sponsor";

export interface Organisation {
  id: number;
  name: string;
  logo: string;
  type: RelationshipType;
}

export const organisations: Organisation[] = [
  {
    id: 1,
    name: "IEEE-CS",
    logo: ieeeLogo.src,
    type: "worked-with",
  },
  {
    id: 2,
    name: "Django Girls Koforidua",
    logo: djangoGirlsLogo.src,
    type: "worked-with",
  },
];
