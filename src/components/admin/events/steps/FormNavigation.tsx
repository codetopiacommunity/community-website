"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose: () => void;
  isSubmitting: boolean;
  editingEvent: boolean;
}

export function FormNavigation({
  activeTab,
  setActiveTab,
  onClose,
  isSubmitting,
  editingEvent,
}: FormNavigationProps) {
  return (
    <div className="px-8 py-8 bg-grey-50/30 border-t-2 border-grey-100 flex items-center justify-between mt-4">
      <div className="flex gap-3">
        <div
          className={`h-2.5 w-10 rounded-none transition-all duration-300 border-2 ${activeTab === "core" ? "bg-black border-black" : "bg-white border-grey-200"}`}
        />
        <div
          className={`h-2.5 w-10 rounded-none transition-all duration-300 border-2 ${activeTab === "timing" ? "bg-black border-black" : "bg-white border-grey-200"}`}
        />
        <div
          className={`h-2.5 w-10 rounded-none transition-all duration-300 border-2 ${activeTab === "action" ? "bg-black border-black" : "bg-white border-grey-200"}`}
        />
      </div>

      <div className="flex gap-4 font-mono">
        {activeTab === "core" && (
          <>
            <Button
              variant="ghost"
              onClick={onClose}
              type="button"
              className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-none font-bold tracking-widest transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setActiveTab("timing")}
              type="button"
              className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-none active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none"
            >
              Next Step
            </Button>
          </>
        )}
        {activeTab === "timing" && (
          <>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("core")}
              type="button"
              className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-none font-bold tracking-widest transition-all"
            >
              Back
            </Button>
            <Button
              onClick={() => setActiveTab("action")}
              type="button"
              className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-none active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none"
            >
              Next Step
            </Button>
          </>
        )}
        {activeTab === "action" && (
          <>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("timing")}
              type="button"
              className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-none font-bold tracking-widest transition-all"
            >
              Back
            </Button>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-none active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none text-center flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  PROCESSING
                </>
              ) : editingEvent ? (
                "COMMIT UPDATES"
              ) : (
                "SCHEDULE EVENT"
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
