"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CareersDeleteModal } from "@/components/admin/opportunities/CareersDeleteModal";
import { CareersTable } from "@/components/admin/opportunities/CareersTable";
import { CareersToolbar } from "@/components/admin/opportunities/CareersToolbar";
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
  } = useFetchData<Career[]>("/api/admin/opportunities", {
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            Manage <span className="text-grey-400">Careers</span>
          </h1>
          <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium font-mono mt-1">
            Post internships, job offers, and project opportunities for the
            community
          </p>
        </div>

          <Button
          onClick={() => router.push("/admin/opportunities/new")}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 h-12 rounded-xl text-[10px] uppercase font-mono hover:bg-grey-800 transition-all group active:scale-[0.98] tracking-widest shadow-none"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
          POST NEW OPPORTUNITY
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
        onEdit={(career: Career) =>
          router.push(`/admin/opportunities/${career.id}/edit`)
        }
        onDelete={(id: number) => openDelete(id)}
        onAddFirst={() => router.push("/admin/opportunities/new")}
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
