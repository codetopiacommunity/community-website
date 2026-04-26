"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { NewsletterDeleteModal } from "@/components/admin/newsletter/NewsletterDeleteModal";
import { NewsletterDeliveryLogs } from "@/components/admin/newsletter/NewsletterDeliveryLogs";
import {
  type NewsletterFull,
  NewsletterTable,
} from "@/components/admin/newsletter/NewsletterTable";
import { Button } from "@/components/ui/button";
import { useAdminCRUD } from "@/hooks/useAdminCRUD";
import { useFetchData } from "@/hooks/useFetchData";

const PAGE_SIZE = 10;

export default function ManageNewsletterPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const {
    isDeleteOpen,
    itemToDelete: deletingId,
    openDelete,
    closeDelete,
  } = useAdminCRUD<NewsletterFull>();

  const { data, loading, refetch } = useFetchData<{
    newsletters: NewsletterFull[];
    total: number;
  }>(`/api/admin/newsletter?page=${page}`, {
    errorMessage: "Failed to load newsletters",
  });

  const newsletters = data?.newsletters ?? [];
  const total = data?.total ?? 0;

  async function handleDuplicate(id: number) {
    try {
      const res = await fetch(`/api/admin/newsletter/${id}/duplicate`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error ?? "Failed to duplicate newsletter");
        return;
      }
      toast.success("Newsletter duplicated");
      refetch();
    } catch {
      toast.error("Failed to duplicate newsletter");
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-100">
        <div>
          <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
            Manage Newsletter
          </h1>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
            Newsletter Broadcast
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin/newsletter/new")}
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-none rounded-none h-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          New Newsletter
        </Button>
      </div>

      <NewsletterTable
        newsletters={newsletters}
        loading={loading}
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={(p) => setPage(p)}
        onEdit={(newsletter) =>
          router.push(`/admin/newsletter/${newsletter.id}/edit`)
        }
        onDuplicate={handleDuplicate}
        onDelete={(id) => openDelete(id)}
      />

      <NewsletterDeliveryLogs />

      <NewsletterDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => closeDelete()}
        newsletterId={deletingId}
        onSuccess={() => {
          closeDelete();
          refetch();
        }}
      />
    </div>
  );
}
