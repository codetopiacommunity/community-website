"use client";

import { Github, Linkedin, Loader2, Twitter, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { TeamMember } from "@/types";

export function TeamFormModal({
  editingMember,
  isOpen,
  onClose,
  onSuccess,
}: {
  editingMember: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [expertiseInput, setExpertiseInput] = useState("");

  const defaultFormValues = {
    name: "",
    role: "",
    tier: "CORE",
    statement: "",
    github: "",
    linkedin: "",
    twitter: "",
  };
  const [formValues, setFormValues] = useState(defaultFormValues);

  useEffect(() => {
    if (isOpen) {
      if (editingMember) {
        setImagePreview(editingMember.imageUrl || null);
        setExpertise(editingMember.expertise || []);
        setFormValues({
          name: editingMember.name || "",
          role: editingMember.role || "",
          tier: editingMember.tier || "CORE",
          statement: editingMember.statement || "",
          github: editingMember.github || "",
          linkedin: editingMember.linkedin || "",
          twitter: editingMember.twitter || "",
        });
      } else {
        setImagePreview(null);
        setExpertise([]);
        setFormValues(defaultFormValues);
      }
      setActiveTab("profile");
      setExpertiseInput("");
      setIsSubmitting(false);
    }
  }, [isOpen, editingMember]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      name: formValues.name,
      role: formValues.role,
      tier: formValues.tier,
      imageUrl: imagePreview,
      statement: formValues.statement,
      expertise: expertise,
      github: formValues.github,
      linkedin: formValues.linkedin,
      twitter: formValues.twitter,
    };

    try {
      let res: Response;
      if (editingMember) {
        res = await fetch(`/api/admin/team/${editingMember.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/admin/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (res.ok) {
        toast.success(
          editingMember ? "Team member updated" : "Team member added",
        );
        onSuccess();
        onClose();
      } else {
        const resText = await res.text();
        const error = resText ? JSON.parse(resText) : {};
        toast.error(error.error || "Operation failed");
      }
    } catch (error: unknown) {
      console.error("Submit error:", error);
      toast.error("An error occurred");
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border border-grey-100 rounded-3xl gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl">
        <DialogHeader className="px-8 py-10 border-b border-grey-50 bg-white">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <DialogTitle className="text-4xl font-black text-black uppercase tracking-tighter font-sans">
              {editingMember ? "Update Profile" : "New Contributor"}
            </DialogTitle>
            <DialogDescription className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] flex items-center justify-center sm:justify-start gap-3 font-mono">
              <span className="px-2 py-1 bg-black rounded-lg text-white font-mono leading-none tracking-normal">
                {activeTab === "profile"
                  ? "PART 01"
                  : activeTab === "expertise"
                    ? "PART 02"
                    : "PART 03"}
              </span>
              {activeTab === "profile" && "CORE IDENTITY"}
              {activeTab === "expertise" && "SKILLSET ALLOCATION"}
              {activeTab === "socials" && "COMMUNITY CONNECTS"}
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="p-8 pb-4">
              <TabsContent value="profile" className="mt-0 space-y-6 font-mono">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] uppercase text-grey-500 tracking-widest font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="name"
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-[11px] text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
                      placeholder="e.g. Seth Mensah"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
                      Role <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="role"
                      value={formValues.role}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      required
                      className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
                      placeholder="e.g. Community Lead"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
                      Tier <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      name="tier"
                      value={formValues.tier}
                      onValueChange={(val) =>
                        setFormValues((prev) => ({ ...prev, tier: val }))
                      }
                    >
                      <SelectTrigger className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black focus:border-black focus:bg-white transition-all font-mono">
                        <SelectValue placeholder="Select Tier" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-black rounded-xl p-1 font-mono">
                        <SelectItem
                          value="CORE"
                          className="text-xs text-black focus:bg-black focus:text-white rounded-md"
                        >
                          CORE
                        </SelectItem>
                        <SelectItem
                          value="VOLUNTEER"
                          className="text-xs text-black focus:bg-black focus:text-white rounded-md"
                        >
                          VOLUNTEER
                        </SelectItem>
                        <SelectItem
                          value="AMBASSADOR"
                          className="text-xs text-black focus:bg-black focus:text-white rounded-md"
                        >
                          AMBASSADOR
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
                      Profile Image
                    </Label>
                    <div className="flex items-center gap-4">
                      {imagePreview && (
                        <div className="h-11 w-11 rounded-xl overflow-hidden border border-grey-100 flex-shrink-0 bg-grey-50 relative">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error("Image size must be less than 5MB");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagePreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="flex-1 rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 py-2.5 text-xs font-medium text-black focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono file:bg-transparent file:border-0 file:text-xs file:font-medium file:text-grey-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="expertise"
                className="mt-0 space-y-6 font-mono"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
                      Skills / Expertise
                    </Label>
                    <div className="flex flex-wrap gap-2 p-2 rounded-xl border border-grey-100 bg-grey-50/50 focus-within:border-black focus-within:bg-white transition-all min-h-[44px]">
                      {expertise.map((skill) => (
                        <span
                          key={`skill-${skill}`}
                          className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] px-2.5 py-1 rounded-[8px] font-mono font-bold animate-in zoom-in duration-200"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() =>
                              setExpertise(expertise.filter((s) => s !== skill))
                            }
                            className="hover:text-red-400 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={expertiseInput}
                        onChange={(e) => {
                          if (e.target.value.includes(",")) {
                            const newSkills = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            const newUnique = newSkills.filter(
                              (s) => !expertise.includes(s),
                            );
                            if (newUnique.length > 0) {
                              setExpertise((prev) => [...prev, ...newUnique]);
                            }
                            setExpertiseInput("");
                          } else {
                            setExpertiseInput(e.target.value);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const newSkill = expertiseInput.trim();
                            if (newSkill) {
                              if (!expertise.includes(newSkill)) {
                                setExpertise([...expertise, newSkill]);
                              }
                              setExpertiseInput("");
                            }
                          } else if (
                            e.key === "Backspace" &&
                            !expertiseInput &&
                            expertise.length > 0
                          ) {
                            e.preventDefault();
                            setExpertise(expertise.slice(0, -1));
                          }
                        }}
                        className="flex-1 min-w-[120px] bg-transparent outline-none text-xs font-medium text-black placeholder:text-grey-300 font-mono py-1 px-2 pb-0"
                        placeholder={
                          expertise.length === 0
                            ? "Type a skill & press Enter/Comma"
                            : ""
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
                      Bio / Mission Statement
                    </Label>
                    <Textarea
                      name="statement"
                      value={formValues.statement}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          statement: e.target.value,
                        }))
                      }
                      className="rounded-xl min-h-[140px] border border-grey-100 bg-grey-50/50 p-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 resize-none font-mono"
                      placeholder="Tell us about their contribution or mission..."
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="socials" className="mt-0 space-y-6 font-mono">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest flex items-center gap-2">
                        <span className="p-1.5 bg-black rounded-lg text-white">
                          <Github className="h-3 w-3" />
                        </span>
                        GITHUB LINK
                      </Label>
                      <Input
                        name="github"
                        value={formValues.github}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            github: e.target.value,
                          }))
                        }
                        className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
                        placeholder="e.g. https://github.com/sethmensah"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest flex items-center gap-2">
                        <span className="p-1.5 bg-black rounded-lg text-white">
                          <Linkedin className="h-3 w-3" />
                        </span>
                        LINKEDIN PROFILE
                      </Label>
                      <Input
                        name="linkedin"
                        value={formValues.linkedin}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            linkedin: e.target.value,
                          }))
                        }
                        className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
                        placeholder="e.g. seth-mensah"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest flex items-center gap-2">
                        <span className="p-1.5 bg-black rounded-lg text-white">
                          <Twitter className="h-3 w-3" />
                        </span>
                        TWITTER HANDLE
                      </Label>
                      <Input
                        name="twitter"
                        value={formValues.twitter}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            twitter: e.target.value,
                          }))
                        }
                        className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
                        placeholder="e.g. seth_mensah"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>

            <div className="px-8 py-8 bg-grey-50/30 border-t-2 border-grey-100 flex items-center justify-between mt-4">
              <div className="flex gap-3">
                <div
                  className={`h-2.5 w-10 rounded-full transition-all duration-300 border-2 ${activeTab === "profile" ? "bg-black border-black" : "bg-white border-grey-200"}`}
                />
                <div
                  className={`h-2.5 w-10 rounded-full transition-all duration-300 border-2 ${activeTab === "expertise" ? "bg-black border-black" : "bg-white border-grey-200"}`}
                />
                <div
                  className={`h-2.5 w-10 rounded-full transition-all duration-300 border-2 ${activeTab === "socials" ? "bg-black border-black" : "bg-white border-grey-200"}`}
                />
              </div>

              <div className="flex gap-4 font-mono">
                {activeTab === "profile" && (
                  <>
                    <Button
                      variant="ghost"
                      onClick={onClose}
                      type="button"
                      className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-xl font-bold tracking-widest transition-all"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setActiveTab("expertise")}
                      type="button"
                      className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-xl active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none"
                    >
                      Next Step
                    </Button>
                  </>
                )}
                {activeTab === "expertise" && (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setActiveTab("profile")}
                      type="button"
                      className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-xl font-bold tracking-widest transition-all"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setActiveTab("socials")}
                      type="button"
                      className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-xl active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none"
                    >
                      Next Step
                    </Button>
                  </>
                )}
                {activeTab === "socials" && (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setActiveTab("expertise")}
                      type="button"
                      className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-xl font-bold tracking-widest transition-all"
                    >
                      Back
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-xl active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none text-center flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          PROCESSING
                        </>
                      ) : editingMember ? (
                        "COMMIT UPDATES"
                      ) : (
                        "SUBMIT PROFILE"
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
}
