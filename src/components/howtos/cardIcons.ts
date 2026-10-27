import {
  BookOpen,
  CalendarDays,
  Hand,
  HeartHandshake,
  LifeBuoy,
  type LucideIcon,
  Users,
} from "lucide-react";

// Icons a card can ask for by name: <Card icon="hello" ...>.
export const CARD_ICONS: Record<string, LucideIcon> = {
  hello: Hand,
  help: LifeBuoy,
  event: CalendarDays,
  "help-out": HeartHandshake,
  team: Users,
  learn: BookOpen,
};
