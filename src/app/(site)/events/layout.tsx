import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Activities - Codetopia Community",
  description:
    "Upcoming Build Together sessions, Open Source Sprints, and Engineering Syncs.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
