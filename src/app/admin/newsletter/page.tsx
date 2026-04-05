"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { NewsletterDeleteModal } from "@/components/admin/newsletter/NewsletterDeleteModal";
import { NewsletterDeliveryLogs } from "@/components/admin/newsletter/NewsletterDeliveryLogs";
import type { Newsletter } from "@/components/admin/newsletter/NewsletterTable";
import { NewsletterTable } from "@/components/admin/newsletter/NewsletterTable";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

export default function ManageNewsletterPage() {
  const router = useRouter();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchNewsletters = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/newsletter?page=${p}`);
      if (res.ok) {
        const data = await res.json();
        setNewsletters(data.newsletters);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      toast.error("Failed to load newsletters");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewsletters(page);
  }, [fetchNewsletters, page]);

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
      fetchNewsletters(page);
    } catch {
      toast.error("Failed to duplicate newsletter");
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            Manage <span className="text-grey-400">Newsletter</span>
          </h1>
          <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium font-mono mt-1">
            NEWSLETTER BROADCAST
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin/newsletter/new")}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 h-12 rounded-xl text-[10px] uppercase font-mono hover:bg-grey-800 transition-all group active:scale-[0.98] tracking-widest shadow-none"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
          NEW NEWSLETTER
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
        onDelete={(id) => {
          setDeletingId(id);
          setShowDelete(true);
        }}
      />

      <NewsletterDeliveryLogs />

      <NewsletterDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        newsletterId={deletingId}
        onSuccess={() => {
          setShowDelete(false);
          fetchNewsletters(page);
        }}
      />
    </div>
  );
}
