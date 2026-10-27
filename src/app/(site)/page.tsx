import { ActivityLog } from "@/components/home/ActivityLog";
import { HomeIntro } from "@/components/home/HomeIntro";
import { MemberShowcase } from "@/components/home/MemberShowcase";
import { Organisations } from "@/components/home/Organisations";

// ISR, matching the rest of the site. `force-dynamic` meant every single
// visit hit both Postgres and the portal API for content that changes a few
// times a month.
export const revalidate = 60;

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <HomeIntro />
      {/* The record, shown rather than claimed: real things members did,
          newest first. Articles, spotlights and thank-yous used to have
          sections of their own; they are entries here now. */}
      <ActivityLog />
      <MemberShowcase />
      <Organisations />
    </div>
  );
}
