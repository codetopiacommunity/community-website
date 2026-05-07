"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MentorshipForm } from "@/components/admin/mentorships/MentorshipForm";

export default function EditMentorshipPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const [mentorship, setMentorship] = useState<Record<string, unknown> | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const res = await fetch(`/api/admin/mentorships/${id}`);
      if (res.ok) setMentorship(await res.json());
      else router.push("/admin/mentorships");
    };
    fetchData();
  }, [id, router]);

  if (!id) return <div className="p-6">Invalid mentorship id</div>;

  return (
    <div>
      {mentorship ? (
        <MentorshipForm editingMentorship={mentorship} />
      ) : (
        <div className="p-6">Loading...</div>
      )}
    </div>
  );
}
