"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { TeamDeleteModal } from "@/components/admin/team/TeamDeleteModal";
import { TeamFormModal } from "@/components/admin/team/TeamFormModal";
import { TeamTable } from "@/components/admin/team/TeamTable";
import { TeamToolbar } from "@/components/admin/team/TeamToolbar";
import { Button } from "@/components/ui/button";
import { useAdminCRUD } from "@/hooks/useAdminCRUD";
import { useFetchData } from "@/hooks/useFetchData";
import type { TeamMember } from "@/types";

export default function ManageTeamPage() {
  const { data, loading, refetch } = useFetchData<TeamMember[]>(
    "/api/admin/team",
    {
      errorMessage: "Failed to load team members",
    },
  );
  const members = data ?? [];

  const {
    editingItem: editingMember,
    isFormOpen: isFormModalOpen,
    itemToDelete: memberToDelete,
    isDeleteOpen: isDeleteModalOpen,
    openAdd,
    openEdit,
    openDelete,
    closeForm,
    closeDelete,
  } = useAdminCRUD<TeamMember>();

  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredMembers = members.filter(
    (m) =>
      (!filterTier || m.tier === filterTier) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.expertise?.some((e: string) =>
          e.toLowerCase().includes(search.toLowerCase()),
        )),
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect is intended to trigger on search/filter changes to reset pagination
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterTier]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            Manage Team
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-grey-500 text-[10px] font-mono uppercase tracking-widest pl-1 font-medium">
              Directory of community contributors and core team
            </p>
          </div>
        </div>
        <Button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 h-12 rounded-xl text-[10px] uppercase font-mono hover:bg-grey-800 transition-all group active:scale-[0.98] tracking-widest shadow-none"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
          ADD NEW MEMBER
        </Button>
      </div>

      <TeamToolbar
        search={search}
        setSearch={setSearch}
        filterTier={filterTier}
        setFilterTier={setFilterTier}
      />

      <TeamTable
        currentMembers={currentMembers}
        loading={loading}
        search={search}
        filteredMembers={filteredMembers}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        onEdit={(member) => openEdit(member)}
        onDelete={(id) => openDelete(id)}
        onAddFirst={openAdd}
      />

      <TeamFormModal
        isOpen={isFormModalOpen}
        onClose={closeForm}
        editingMember={editingMember}
        onSuccess={refetch}
      />

      <TeamDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDelete}
        memberId={memberToDelete}
        onSuccess={refetch}
      />
    </div>
  );
}
