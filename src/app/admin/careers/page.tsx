"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CareersDeleteModal } from "@/components/admin/careers/CareersDeleteModal";
import { CareersTable } from "@/components/admin/careers/CareersTable";
import { CareersToolbar } from "@/components/admin/careers/CareersToolbar";
import { Button } from "@/components/ui/button";
import { useAdminCRUD } from "@/hooks/useAdminCRUD";
import { useFetchData } from "@/hooks/useFetchData";
import { type Career, getCareerStatus } from "@/lib/careers";

export default function ManageCareersPage() {
  const router = useRouter();

  const {
    data: careers,
    loading,
    refetch,
  } = useFetchData<Career[]>("/api/admin/careers", {
    errorMessage: "Failed to load career opportunities",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const {
    itemToDelete: careerToDelete,
    isDeleteOpen: isDeleteModalOpen,
    openDelete,
    closeDelete,
  } = useAdminCRUD<Career>();

  const filteredCareers = (careers ?? []).filter(
    (c) =>
      (!statusFilter || getCareerStatus(c) === statusFilter) &&
      (c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-100">
        <div>
          <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
            Manage Careers
          </h1>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
            Post internships, job offers, and project opportunities for the community
          </p>
        </div>

        <Button
          onClick={() => router.push("/admin/careers/new")}
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-none rounded-none h-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          Post New Opportunity
        </Button>
      </div>

      <CareersToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <CareersTable
        careers={filteredCareers}
        loading={loading}
        onEdit={(career) => router.push(`/admin/careers/${career.id}/edit`)}
        onDelete={(id) => openDelete(id)}
        onAddFirst={() => router.push("/admin/careers/new")}
      />

      <CareersDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDelete}
        careerId={careerToDelete}
        onSuccess={refetch}
      />
    </div>
  );
}
