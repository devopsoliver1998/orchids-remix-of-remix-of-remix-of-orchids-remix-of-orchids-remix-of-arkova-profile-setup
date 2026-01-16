"use client";

import { useState } from "react";
import { UserX, AlertTriangle, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberToRevoke {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface RevokeAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: MemberToRevoke | null;
  organizationName: string;
  onRevoke: (memberId: string) => void;
}

export function RevokeAccessModal({
  open,
  onOpenChange,
  member,
  organizationName,
  onRevoke,
}: RevokeAccessModalProps) {
  const [isRevoking, setIsRevoking] = useState(false);

  if (!member) return null;

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleRevoke = () => {
    setIsRevoking(true);
    setTimeout(() => {
      onRevoke(member.id);
      setIsRevoking(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-red-600">
            <div className="w-8 h-8 bg-red-100 flex items-center justify-center">
              <UserX className="w-4 h-4 text-red-600" />
            </div>
            Revoke Member Access?
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            This action will remove the member from your organization
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200">
            <Avatar className="h-14 w-14">
              {member.avatarUrl && <AvatarImage src={member.avatarUrl} />}
              <AvatarFallback className="bg-slate-200 text-slate-600 text-lg font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-semibold text-slate-900">{member.name}</p>
              <p className="text-sm text-slate-500">{member.email}</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">
                  Are you sure you want to remove this user from {organizationName}?
                </p>
                <p className="text-sm text-red-700 mt-1">
                  They will lose access to all organization-specific badges and tags.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">
                  Compliance Note
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Any cryptographic proofs previously anchored for this user will remain valid on 
                  the public ledger, but they will no longer display your organization&apos;s verified status.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-none flex-1"
          >
            Keep Member
          </Button>
          <Button
            onClick={handleRevoke}
            disabled={isRevoking}
            className="rounded-none flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isRevoking ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Revoking...
              </>
            ) : (
              "Revoke Access"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
