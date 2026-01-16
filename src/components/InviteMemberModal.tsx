"use client";

import { useState } from "react";
import { UserPlus, Send, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableTags: Tag[];
  onInvite: (data: {
    email: string;
    fullName: string;
    role: "member" | "admin";
    tags: string[];
  }) => void;
}

export function InviteMemberModal({
  open,
  onOpenChange,
  availableTags,
  onInvite,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"member" | "admin">("member");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const removeTag = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };

  const handleSubmit = () => {
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onInvite({
        email,
        fullName,
        role,
        tags: selectedTags,
      });
      setEmail("");
      setFullName("");
      setRole("member");
      setSelectedTags([]);
      setIsSubmitting(false);
      onOpenChange(false);
    }, 800);
  };

  const getTagColor = (color: string) => {
    const colors: Record<string, string> = {
      emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      purple: "bg-purple-100 text-purple-700 border-purple-200",
      amber: "bg-amber-100 text-amber-700 border-amber-200",
      slate: "bg-slate-100 text-slate-700 border-slate-200",
      cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
      rose: "bg-rose-100 text-rose-700 border-rose-200",
    };
    return colors[color] || colors.slate;
  };

  const handleClose = () => {
    setEmail("");
    setFullName("");
    setRole("member");
    setSelectedTags([]);
    setShowTagDropdown(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <div className="w-8 h-8 bg-[#7BAAD0]/10 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-[#7BAAD0]" />
            </div>
            Invite New Member
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Send an invitation to join your organization
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              placeholder="colleague@company.com"
              className="h-11 border-slate-200 rounded-none bg-white focus-visible:ring-[#7BAAD0]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">
                Full Name
              </Label>
              <span className="text-[10px] text-slate-400 italic">
                Optional — they can fill this in later
              </span>
            </div>
            <Input
              type="text"
              placeholder="John Doe"
              className="h-11 border-slate-200 rounded-none bg-white focus-visible:ring-[#7BAAD0]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">
              Role
            </Label>
            <div className="space-y-2">
              <label
                className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                  role === "member"
                    ? "border-[#7BAAD0] bg-[#7BAAD0]/5"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  checked={role === "member"}
                  onChange={() => setRole("member")}
                  className="mt-0.5 w-4 h-4 text-[#7BAAD0] border-slate-300 focus:ring-[#7BAAD0]"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">Member</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Student/Employee. Can view and share their own proofs.
                  </p>
                </div>
                {role === "member" && (
                  <Badge className="bg-slate-100 text-slate-600 border-slate-200 rounded-none text-[9px] uppercase tracking-widest">
                    Default
                  </Badge>
                )}
              </label>

              <label
                className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                  role === "admin"
                    ? "border-[#7BAAD0] bg-[#7BAAD0]/5"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  className="mt-0.5 w-4 h-4 text-[#7BAAD0] border-slate-300 focus:ring-[#7BAAD0]"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">Admin</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Can manage organization settings, members, and verifications.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">
              Assign Initial Tags
            </Label>
            <p className="text-[10px] text-slate-400 -mt-1">
              Pre-assign this member to groups or departments
            </p>

            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedTags.map((tagId) => {
                  const tag = availableTags.find((t) => t.id === tagId);
                  if (!tag) return null;
                  return (
                    <Badge
                      key={tagId}
                      className={`rounded-none text-[9px] uppercase tracking-widest border pr-1 ${getTagColor(
                        tag.color
                      )}`}
                    >
                      {tag.name}
                      <button
                        onClick={() => removeTag(tagId)}
                        className="ml-1.5 hover:bg-black/10 rounded-sm p-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTagDropdown(!showTagDropdown)}
                className="w-full h-11 px-3 border border-slate-200 bg-white text-left text-sm text-slate-500 hover:border-slate-300 transition-colors flex items-center justify-between"
              >
                <span>
                  {selectedTags.length === 0
                    ? "Select tags..."
                    : `${selectedTags.length} tag${selectedTags.length > 1 ? "s" : ""} selected`}
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    showTagDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showTagDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 shadow-lg max-h-48 overflow-y-auto">
                  {availableTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => handleTagToggle(tag.id)}
                      className="w-full px-3 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            tag.color === "emerald"
                              ? "bg-emerald-500"
                              : tag.color === "blue"
                              ? "bg-blue-500"
                              : tag.color === "purple"
                              ? "bg-purple-500"
                              : tag.color === "amber"
                              ? "bg-amber-500"
                              : tag.color === "cyan"
                              ? "bg-cyan-500"
                              : "bg-slate-500"
                          }`}
                        />
                        <span className="text-sm text-slate-700">{tag.name}</span>
                      </div>
                      {selectedTags.includes(tag.id) && (
                        <Check className="w-4 h-4 text-[#7BAAD0]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="rounded-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!email || isSubmitting}
            className="rounded-none bg-[#1A202C] hover:bg-slate-800 gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Invitation
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
