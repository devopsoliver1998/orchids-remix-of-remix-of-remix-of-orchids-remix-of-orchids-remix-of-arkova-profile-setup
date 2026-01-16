"use client";

import { useState, useRef } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  User,
  Building2,
  CheckCircle2,
  Camera,
  Shield,
  ShieldCheck,
  Vault,
  Plus,
  MoreHorizontal,
  FileText,
  ScanLine,
  FileKey,
  AlertCircle,
  LogOut,
  Copy,
  ExternalLink,
  Hash,
  Link2,
  Search,
  Settings,
  Bell,
  HelpCircle,
  Twitter,
  Linkedin,
  Github,
  Clock,
  Anchor,
  PenTool,
  RefreshCw,
  Award,
  ArrowLeft,
  Share2,
  Download,
  Users,
  Send,
  FileSignature,
  Trash2,
  Edit3,
  ChevronRight,
  UserPlus,
  UserX,
  MailOpen } from
"lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle } from
"@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
"@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { InviteMemberModal } from "@/components/InviteMemberModal";
import { RevokeAccessModal } from "@/components/RevokeAccessModal";
import { DateRange } from "react-day-picker";
import { ChevronLeft, ChevronDown, Filter, RotateCcw, Calendar as CalendarIcon, FileSpreadsheet } from "lucide-react";

type OnboardingStep = "auth" | "account-type" | "profile" | "dashboard" | "anchor" | "esign" | "admin-dashboard" | "asset-detail";
type AuthMode = "signup" | "signin";
type AuthState = "form" | "verification";
type AccountType = "individual" | "organization" | null;

interface ProofData {
  id: string;
  name: string;
  type: string;
  issuer: string;
  status: "Anchored" | "Processing";
  anchoredDate: string;
  hash: string;
  recordId: string;
  fileSize: string;
  blockHeight: number;
  signatureStatus?: "none" | "pending" | "signed";
  signatureDate?: string;
  signatureData?: string;
}

interface SignatureRequest {
  id: string;
  documentName: string;
  documentId: string;
  requestedBy: string;
  requestedDate: string;
  status: "pending" | "signed" | "declined";
  dueDate?: string;
}

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "inactive";
  documentsCount: number;
  joinedDate: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

const ARKOVA_LOGO_URL = "https://eigenjobs.s3.us-east-1.amazonaws.com/arkovabanner.png";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />

      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />

      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />

      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />

    </svg>);

}

function ArkovaLogo({ className = "h-8" }: {className?: string;}) {
  return (
    <img
      src={ARKOVA_LOGO_URL}
      alt="Arkova"
      className={`${className} object-contain`} />);


}

function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <ArkovaLogo className="h-8" />
          <p className="text-sm text-slate-500 max-w-xs">
            The institutional standard for blockchain-anchored document verification and immutable identity.
          </p>
          <div className="flex gap-4">
            <Twitter className="w-5 h-5 text-slate-400 cursor-pointer hover:text-primary transition-colors" />
            <Linkedin className="w-5 h-5 text-slate-400 cursor-pointer hover:text-primary transition-colors" />
            <Github className="w-5 h-5 text-slate-400 cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="cursor-pointer hover:text-primary">Dashboard</li>
            <li className="cursor-pointer hover:text-primary">Project Overview</li>
            <li className="cursor-pointer hover:text-primary">Support</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="cursor-pointer hover:text-primary">Privacy Policy</li>
            <li className="cursor-pointer hover:text-primary">Terms of Service</li>
            <li className="cursor-pointer hover:text-primary">GDPR & Cookies</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Newsletter</h4>
          <p className="text-sm text-slate-600">Stay updated with latest protocol changes.</p>
          <div className="flex gap-2">
            <Input placeholder="Email address" className="bg-white" />
            <Button size="sm">Join</Button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
        © 2024 ARKOVA. ALL RIGHTS RESERVED.
      </div>
    </footer>);

}

function PasswordStrength({ password }: {password: string;}) {
  const checks = [
  { label: "8+ characters", met: password.length >= 8 },
  { label: "1 uppercase", met: /[A-Z]/.test(password) },
  { label: "1 number", met: /[0-9]/.test(password) },
  { label: "1 symbol", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }];


  const strength = checks.filter((c) => c.met).length;
  const strengthLabel = strength <= 1 ? "Weak" : strength === 2 ? "Fair" : strength === 3 ? "Good" : "Strong";
  const strengthColor = strength <= 1 ? "text-red-500" : strength === 2 ? "text-amber-500" : strength === 3 ? "text-emerald-500" : "text-emerald-600";

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Password strength</span>
        <span className={strengthColor}>{strengthLabel}</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) =>
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors ${
          i <= strength ?
          strength <= 1 ?
          "bg-red-500" :
          strength === 2 ?
          "bg-amber-500" :
          "bg-emerald-500" :
          "bg-muted"}`
          } />

        )}
      </div>
    </div>);

}

function SignatureCanvas({
  onSave,
  onCancel



}: {onSave: (signatureData: string) => void;onCancel: () => void;}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1A202C";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;

    const signatureData = canvas.toDataURL("image/png");
    onSave(signatureData);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-slate-200 rounded-none bg-white">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="w-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing} />

      </div>
      <p className="text-xs text-slate-400 text-center">Draw your signature above</p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={clearCanvas} className="flex-1 rounded-none">
          Clear
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1 rounded-none">
          Cancel
        </Button>
        <Button
          onClick={saveSignature}
          disabled={!hasSignature}
          className="flex-1 rounded-none bg-[#1A202C] hover:bg-slate-800">

          Apply Signature
        </Button>
      </div>
    </div>);

}

function ProofDetailDialog({
  proof,
  open,
  onOpenChange,
  onRequestSignature





}: {proof: ProofData | null;open: boolean;onOpenChange: (open: boolean) => void;onRequestSignature?: () => void;}) {
  if (!proof) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {proof.name}
          </DialogTitle>
          <DialogDescription>
            Blockchain-anchored document verification certificate
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-emerald-700">Verified & Anchored</span>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              {proof.status}
            </Badge>
          </div>

          {proof.signatureStatus && proof.signatureStatus !== "none" &&
          <div className={`flex items-center justify-between p-3 rounded-lg border ${
          proof.signatureStatus === "signed" ?
          "bg-blue-500/10 border-blue-500/20" :
          "bg-amber-500/10 border-amber-500/20"}`
          }>
              <div className="flex items-center gap-2">
                <PenTool className={`w-5 h-5 ${proof.signatureStatus === "signed" ? "text-blue-600" : "text-amber-600"}`} />
                <span className={`font-medium ${proof.signatureStatus === "signed" ? "text-blue-700" : "text-amber-700"}`}>
                  {proof.signatureStatus === "signed" ? "Digitally Signed" : "Signature Pending"}
                </span>
              </div>
              <Badge className={proof.signatureStatus === "signed" ?
            "bg-blue-500/10 text-blue-600 border-blue-500/20" :
            "bg-amber-500/10 text-amber-600 border-amber-500/20"
            }>
                {proof.signatureStatus === "signed" ? "Signed" : "Pending"}
              </Badge>
            </div>
          }

          {proof.signatureData &&
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-muted-foreground mb-2">E-Signature</p>
              <img src={proof.signatureData} alt="Signature" className="max-h-16 mx-auto" />
              {proof.signatureDate &&
            <p className="text-xs text-slate-400 text-center mt-2">Signed on {proof.signatureDate}</p>
            }
            </div>
          }

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" /> Anchored Date
              </p>
              <p className="text-sm font-medium">{proof.anchoredDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Document Type</p>
              <Badge variant="secondary">{proof.type}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Issuing Authority</p>
              <p className="text-sm font-medium">{proof.issuer}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">File Size</p>
              <p className="text-sm font-medium">{proof.fileSize}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Hash className="w-3 h-3" /> SHA-256 Document Hash
            </p>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <code className="text-xs font-mono flex-1 break-all">{proof.hash}</code>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => copyToClipboard(proof.hash)}>
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Link2 className="w-3 h-3" /> Verification Record ID
            </p>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <code className="text-xs font-mono flex-1 break-all">{proof.recordId}</code>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => copyToClipboard(proof.recordId)}>
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground">Block Height</p>
              <p className="text-sm font-mono font-medium">{proof.blockHeight.toLocaleString()}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="w-3.5 h-3.5" />
              View on Explorer
            </Button>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {onRequestSignature && proof.signatureStatus !== "signed" &&
          <Button variant="outline" onClick={onRequestSignature} className="gap-1">
              <PenTool className="w-4 h-4" />
              {proof.signatureStatus === "pending" ? "Sign Document" : "Request Signature"}
            </Button>
          }
          <Button className="gap-1">
            <ExternalLink className="w-4 h-4" />
            Share Proof
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);

}

function AuthScreen({
  onComplete,
  email,
  setEmail




}: {onComplete: () => void;email: string;setEmail: (email: string) => void;}) {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [authState, setAuthState] = useState<AuthState>("form");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (mode === "signup") {
        setAuthState("verification");
      } else {
        onComplete();
      }
    }, 1200);
  };

  if (authState === "verification") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <CardContent className="pt-12 pb-10 px-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Check your email</h2>
            <p className="text-muted-foreground mb-6">
              We&apos;ve sent a verification link to
              <br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <Button onClick={onComplete} className="w-full" size="lg">
              I&apos;ve Verified My Email
            </Button>
          </CardContent>
        </Card>
      </div>);

  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="hidden md:flex md:w-1/2 bg-[#F8FAFC] relative overflow-hidden flex-col justify-between p-16 border-r border-slate-100">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id="grid-light" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#E2E8F0" strokeWidth="0.1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-light)" />
          </svg>
          <div className="absolute top-[20%] left-[10%] opacity-10 rotate-12"><Shield className="w-12 h-12" /></div>
          <div className="absolute top-[10%] right-[20%] opacity-10 -rotate-12"><Link2 className="w-8 h-8" /></div>
          <div className="absolute bottom-[30%] left-[20%] opacity-10 rotate-45"><Vault className="w-10 h-10" /></div>
          <div className="absolute top-[50%] right-[10%] opacity-10 -rotate-6"><FileText className="w-14 h-14" /></div>
        </div>
        
        <div className="relative z-10">
          <ArkovaLogo className="h-10 mb-24" />
          <h1 className="text-6xl font-extrabold leading-[1.1] mb-8 text-[#1A202C]">
            Verify <br />
            <span className="text-[#7BAAD0]">Don&apos;t Trust</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-lg mb-12 leading-relaxed">
            Blockchain-anchored document verification that&apos;s always available, independently verifiable, and built for enterprise compliance.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 md:px-24 py-12 relative bg-white">
        <div className="md:hidden absolute top-8 left-8">
          <ArkovaLogo className="h-8" />
        </div>
        
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {mode === "signup" ? "Create account" : "Welcome back"}
            </h2>
            <p className="text-slate-500">
              {mode === "signup" ? "Start anchoring your documents today." : "Sign in to manage your vault."}
            </p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50" onClick={onComplete}>
              <GoogleIcon />
              <span className="ml-3 text-slate-600 font-medium">Continue with Google</span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-medium tracking-widest">or email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-12 border-slate-200 rounded-none focus-visible:ring-[#7BAAD0]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />

              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" title="Password" className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Password</Label>
                  {mode === "signin" &&
                  <button type="button" className="text-[10px] uppercase font-bold tracking-widest text-[#7BAAD0] hover:underline">Forgot password?</button>
                  }
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 border-slate-200 pr-12 rounded-none focus-visible:ring-[#7BAAD0]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">

                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === "signup" && <PasswordStrength password={password} />}
              </div>

              <Button type="submit" className="w-full h-12 text-xs uppercase tracking-widest font-bold bg-[#1A202C] hover:bg-slate-800 rounded-none" disabled={isLoading}>
                {isLoading ? "Processing..." : mode === "signup" ? "Create account" : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                className="text-[#7BAAD0] hover:underline">

                {mode === "signup" ? "Sign in" : "Create account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>);

}

function AccountTypeScreen({
  onComplete,
  accountType,
  setAccountType




}: {onComplete: () => void;accountType: AccountType;setAccountType: (type: AccountType) => void;}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="p-8">
        <ArkovaLogo className="h-8" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 -mt-20">
        <div className="max-w-md w-full text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Create account</h1>
          <p className="text-slate-500">
            Blockchain-anchored document verification that&apos;s always available, independently verifiable, and built for enterprise compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
          <div
            className={`group cursor-pointer p-10 border-2 text-center transition-all bg-white ${
            accountType === "individual" ?
            "border-[#7BAAD0] ring-4 ring-[#7BAAD0]/10" :
            "border-slate-100 hover:border-slate-200"}`
            }
            onClick={() => setAccountType("individual")}>

            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <User className={`w-8 h-8 ${accountType === "individual" ? "text-[#7BAAD0]" : "text-slate-400"}`} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-2">For Me</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Personal vault for your diplomas, certifications, and identity proofs.
            </p>
          </div>

          <div
            className={`group cursor-pointer p-10 border-2 text-center transition-all bg-white relative ${
            accountType === "organization" ?
            "border-[#7BAAD0] ring-4 ring-[#7BAAD0]/10" :
            "border-slate-100 hover:border-slate-200"}`
            }
            onClick={() => setAccountType("organization")}>

            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-[#7BAAD0]/10 text-[#7BAAD0] border-none rounded-none text-[10px] uppercase font-bold tracking-tighter">Institution</Badge>
            </div>
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Building2 className={`w-8 h-8 ${accountType === "organization" ? "text-[#7BAAD0]" : "text-slate-400"}`} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-2">Institution</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Issue verifiable credentials and manage organizational compliance.
            </p>
          </div>
        </div>

        <Button
          onClick={onComplete}
          disabled={!accountType}
          size="lg"
          className="min-w-[240px] h-14 text-base font-bold rounded-none uppercase tracking-widest bg-[#1A202C] hover:bg-slate-800">

          Continue
        </Button>
      </div>
      <Footer />
    </div>);

}

function ProfileSetupScreen({
  onComplete,
  email,
  setUserProfile,
  accountType





}: {onComplete: () => void;email: string;setUserProfile: (profile: UserProfile) => void;accountType: AccountType;}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    setUserProfile({
      firstName,
      lastName,
      email,
      bio,
      avatarUrl: avatarPreview
    });
    onComplete();
  };

  const bioMaxLength = 200;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <div className="mb-12">
        <ArkovaLogo className="h-10" />
      </div>
      <Card className="w-full max-w-xl border-slate-200 shadow-2xl rounded-none bg-white">
        <CardHeader className="text-center p-10 border-b border-slate-100">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Set up your profile.
          </CardTitle>
          <CardDescription className="text-slate-500 mt-2">
            Add your details to establish your identity on Arkova.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-10 space-y-8">
          <div className="flex flex-col items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden" />

            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}>

              <div className={`w-28 h-28 rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden ${
              avatarPreview ? "" : "bg-slate-100"}`
              }>
                {avatarPreview ?
                <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" /> :

                <Camera className="w-8 h-8 text-slate-300" />
                }
              </div>
              {avatarPreview &&
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest">
                  Change
                </div>
              }
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-slate-500 mt-4 hover:text-[#7BAAD0] transition-colors">

              {avatarPreview ? "Change photo" : "Upload photo."}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="uppercase text-[10px] font-bold tracking-widest text-slate-500">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                className="h-12 border-slate-200 rounded-none bg-white focus-visible:ring-[#7BAAD0]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />

            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                className="h-12 border-slate-200 rounded-none bg-white focus-visible:ring-[#7BAAD0]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} />

            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Email</Label>
            <Input
              id="email"
              value={email}
              disabled
              readOnly
              className="h-12 bg-slate-50 border-slate-200 text-slate-400 rounded-none cursor-not-allowed" />

          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              className="border-slate-200 min-h-[100px] rounded-none bg-white focus-visible:ring-[#7BAAD0]"
              value={bio}
              onChange={(e) => {
                if (e.target.value.length <= bioMaxLength) {
                  setBio(e.target.value);
                }
              }}
              maxLength={bioMaxLength} />

            <p className="text-xs text-slate-400">
              Brief description for your public profile. Max {bioMaxLength} characters.
            </p>
          </div>

          <Button onClick={handleComplete} className="w-full h-14 text-xs font-bold uppercase tracking-widest rounded-none bg-[#1A202C] hover:bg-slate-800">
            Complete Setup
          </Button>
        </CardContent>
      </Card>
      <div className="mt-12 w-full">
        <Footer />
      </div>
    </div>);

}

function OrganizationVerificationScreen({
  onComplete,
  email,
  setUserProfile




}: {onComplete: () => void;email: string;setUserProfile: (profile: UserProfile) => void;}) {
  const [legalEntityName, setLegalEntityName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [website, setWebsite] = useState("");
  const [taxId, setTaxId] = useState("");
  const [headquartersAddress, setHeadquartersAddress] = useState("");
  const [attestationChecked, setAttestationChecked] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const emailDomain = email.split("@")[1] || "";
  const isPublicEmail = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "protonmail.com", "mail.com"].includes(emailDomain.toLowerCase());

  const handleComplete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setUserProfile({
        firstName: displayName || legalEntityName,
        lastName: "",
        email,
        bio: "",
        avatarUrl: logoPreview
      });
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  const canSubmit = legalEntityName && displayName && attestationChecked && !isSubmitting;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="p-6 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <ArkovaLogo className="h-8" />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold hidden sm:inline">Account Created</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#7BAAD0] flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">2</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#7BAAD0] font-bold hidden sm:inline">Business Verification</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-[10px] text-slate-500 font-bold">3</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold hidden sm:inline">Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-none mb-6">
              <Shield className="w-4 h-4 text-[#7BAAD0]" />
              <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Institutional Verification Required</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">Register Organization</h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              Create an institutional profile to issue and verify documents. All information is subject to verification and compliance review.
            </p>
          </div>

          <Card className="border-slate-200 shadow-xl rounded-none bg-white overflow-hidden">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 bg-slate-50 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Identity & Branding</h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Upload your official company logo or seal. This will appear on all credentials you issue and your public verification page.
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden" />

                  <div
                    className="relative group cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}>

                    <div className={`w-full aspect-square max-w-[200px] mx-auto border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden transition-colors hover:border-[#7BAAD0]/50 bg-white ${
                    logoPreview ? "p-2" : ""}`
                    }>
                      {logoPreview ?
                      <img src={logoPreview} alt="Company Logo" className="w-full h-full object-contain" /> :

                      <>
                          <Building2 className="w-12 h-12 text-slate-300 mb-3" />
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Company Logo / Seal</p>
                          <p className="text-[10px] text-slate-400 mt-1">Click to upload</p>
                        </>
                      }
                    </div>
                    {logoPreview &&
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest">
                        Change Logo
                      </div>
                    }
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-start gap-3 p-4 bg-[#7BAAD0]/5 border border-[#7BAAD0]/20">
                      <ShieldCheck className="w-5 h-5 text-[#7BAAD0] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-700 mb-1">Verification Process</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          After submission, our compliance team will verify your organization within 1-2 business days. You&apos;ll receive email confirmation once approved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-8 lg:p-10 space-y-6">
                {isPublicEmail &&
                <div className="bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-amber-800">Public Email Domain Detected</p>
                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        Institutional accounts require a valid work email for instant processing. Accounts with public domains (gmail, yahoo, etc.) require manual verification, which can take 2-3 business days.
                      </p>
                    </div>
                  </div>
                }

                <div className="space-y-2">
                  <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500 !whitespace-pre-line">Organization name
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="The President and Fellows of Harvard College"
                    className="h-11 border-slate-200 rounded-none bg-white focus-visible:ring-[#7BAAD0]"
                    value={legalEntityName}
                    onChange={(e) => setLegalEntityName(e.target.value)} />

                  <p className="text-[10px] text-slate-400">Full registered legal name as it appears on official documents</p>
                </div>

                <div className="space-y-2">
                  <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">
                    Display Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="Harvard University"
                    className="h-11 border-slate-200 rounded-none bg-white focus-visible:ring-[#7BAAD0]"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)} />

                  <p className="text-[10px] text-slate-400">Public-facing name shown on dashboard and credentials</p>
                </div>

                <div className="space-y-2">
                  <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Website</Label>
                  <Input
                    placeholder="https://www.harvard.edu"
                    className="h-11 border-slate-200 rounded-none bg-white focus-visible:ring-[#7BAAD0]"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)} />

                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                    <FileKey className="w-4 h-4 text-[#7BAAD0]" />
                    Verification Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Work Email (Verified)</Label>
                      <div className="relative">
                        <Input
                          value={email}
                          disabled
                          readOnly
                          className="h-11 bg-slate-50 border-slate-200 text-slate-600 rounded-none cursor-not-allowed pr-28" />

                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {isPublicEmail ?
                          <Badge variant="outline" className="rounded-none text-[9px] uppercase tracking-widest border-amber-300 text-amber-600 bg-amber-50">
                              <Clock className="w-3 h-3 mr-1" /> Manual Review
                            </Badge> :

                          <Badge variant="outline" className="rounded-none text-[9px] uppercase tracking-widest border-emerald-300 text-emerald-600 bg-emerald-50">
                              <Check className="w-3 h-3 mr-1" /> Verified
                            </Badge>
                          }
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Tax ID / EIN</Label>
                        <span className="text-[10px] text-[#7BAAD0] font-medium">Recommended for faster approval</span>
                      </div>
                      <Input
                        placeholder="XX-XXXXXXX"
                        className="h-11 border-slate-200 rounded-none bg-white focus-visible:ring-[#7BAAD0]"
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)} />

                    </div>

                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Headquarters Address</Label>
                      <Input
                        placeholder="Massachusetts Hall, Cambridge, MA 02138, USA"
                        className="h-11 border-slate-200 rounded-none bg-white focus-visible:ring-[#7BAAD0]"
                        value={headquartersAddress}
                        onChange={(e) => setHeadquartersAddress(e.target.value)} />

                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="bg-slate-50 border border-slate-200 p-5">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="attestation"
                        checked={attestationChecked}
                        onChange={(e) => setAttestationChecked(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded-none border-slate-300 text-[#7BAAD0] focus:ring-[#7BAAD0]" />

                      <label htmlFor="attestation" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                        <span className="font-bold text-slate-800 !whitespace-pre-line"></span> I certify that I am an authorized representative of{" "}
                        <span className="font-semibold text-[#7BAAD0]">{displayName || "[Organization Name]"}</span>{" "}
                        and have the authority to bind this organization to Arkova&apos;s{" "}
                        <button type="button" className="text-[#7BAAD0] underline hover:no-underline">Terms of Service</button>{" "}
                        and{" "}
                        <button type="button" className="text-[#7BAAD0] underline hover:no-underline">Institutional Agreement</button>.
                        I understand that providing false information may result in account termination and legal action.
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleComplete}
                  disabled={!canSubmit}
                  className="w-full h-14 text-xs font-bold uppercase tracking-widest rounded-none bg-[#1A202C] hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">

                  {isSubmitting ?
                  <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span> :

                  "Submit for Verification"
                  }
                </Button>

                <p className="text-[10px] text-slate-400 text-center">
                  By submitting, you agree to our verification process. Approval typically takes 1-2 business days.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>);

}

function ESignScreen({
  onBack,
  documentToSign,
  onSignComplete




}: {onBack: () => void;documentToSign: ProofData | SignatureRequest | null;onSignComplete: (signatureData: string) => void;}) {
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [signComplete, setSignComplete] = useState(false);

  const handleSaveSignature = (data: string) => {
    setSignatureData(data);
  };

  const handleConfirmSign = () => {
    if (signatureData) {
      onSignComplete(signatureData);
      setSignComplete(true);
    }
  };

  const documentName = documentToSign ?
  "name" in documentToSign ? documentToSign.name : documentToSign.documentName :
  "Document";

  if (signComplete) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md border-slate-200 shadow-2xl rounded-none bg-white">
          <CardContent className="pt-16 pb-12 px-10 text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Document Signed</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Your e-signature has been successfully applied and anchored to the blockchain.
            </p>
            {signatureData &&
            <div className="bg-slate-50 border border-slate-100 rounded-none p-6 mb-10">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">Your Signature</p>
                <img src={signatureData} alt="Your signature" className="max-h-16 mx-auto" />
              </div>
            }
            <Button onClick={onBack} className="w-full h-14 bg-[#1A202C] hover:bg-slate-800 rounded-none uppercase font-bold tracking-widest text-xs">
              Return to Vault
            </Button>
          </CardContent>
        </Card>
        <div className="mt-12 w-full">
          <Footer />
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
        <ArkovaLogo className="h-8" />
        <Button variant="ghost" onClick={onBack} className="uppercase font-bold tracking-widest text-xs">
          <X className="w-4 h-4 mr-2" /> Close
        </Button>
      </div>

      <main className="max-w-4xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">E-Signature</h1>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            Apply your legally binding digital signature to verify document authenticity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card className="rounded-none border-slate-100 bg-white">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Document Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-slate-50 border border-slate-200 rounded-none p-8 min-h-[300px] flex flex-col items-center justify-center">
                  <FileText className="w-16 h-16 text-slate-300 mb-4" />
                  <p className="text-sm font-bold text-slate-900 mb-1">{documentName}</p>
                  <p className="text-xs text-slate-400">Document ready for signature</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none border-slate-100 bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#7BAAD0]" />
                <span className="text-sm font-bold text-slate-900">Signature Legal Notice</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                By applying your e-signature, you acknowledge that this signature carries the same legal weight as a handwritten signature under applicable e-signature laws.
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-none border-slate-100 bg-white">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Draw Your Signature</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {signatureData ?
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-200 rounded-none bg-white p-4">
                      <img src={signatureData} alt="Your signature" className="max-h-24 mx-auto" />
                    </div>
                    <div className="flex gap-3">
                      <Button
                      variant="outline"
                      onClick={() => setSignatureData(null)}
                      className="flex-1 rounded-none">

                        Clear & Redraw
                      </Button>
                      <Button
                      onClick={handleConfirmSign}
                      className="flex-1 rounded-none bg-[#1A202C] hover:bg-slate-800">

                        Confirm & Sign
                      </Button>
                    </div>
                  </div> :

                <SignatureCanvas
                  onSave={handleSaveSignature}
                  onCancel={onBack} />

                }
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">Signature Activities</h3>
              <div className="space-y-2">
                {[
                { action: "Document Opened", time: "Just now", status: "complete" },
                { action: "Identity Verified", time: "Just now", status: "complete" },
                { action: "Signature Applied", time: "Pending", status: signatureData ? "complete" : "pending" },
                { action: "Blockchain Anchor", time: "Pending", status: "pending" }].
                map((activity, i) =>
                <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-none">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    activity.status === "complete" ? "bg-emerald-100" : "bg-slate-100"}`
                    }>
                        {activity.status === "complete" ?
                      <Check className="w-3 h-3 text-emerald-600" /> :

                      <Clock className="w-3 h-3 text-slate-400" />
                      }
                      </div>
                      <span className="text-xs font-bold text-slate-600">{activity.action}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{activity.time}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}

function IndividualDashboard({
  onNavigateToAnchor,
  onNavigateToESign,
  onNavigateToAssetDetail,
  onLogout,
  userProfile,
  proofs,
  signatureRequests,
  onSignRequest









}: {onNavigateToAnchor: () => void;onNavigateToESign: (doc: ProofData | SignatureRequest) => void;onNavigateToAssetDetail: (proof: ProofData) => void;onLogout: () => void;userProfile: UserProfile;proofs: ProofData[];signatureRequests: SignatureRequest[];onSignRequest: (request: SignatureRequest) => void;}) {
  const [isPublic, setIsPublic] = useState(false);
  const [activeNav, setActiveNav] = useState("vault");
  const arkovaId = "ark:8f2...9x";

  const pendingSignatures = signatureRequests.filter((r) => r.status === "pending");

  const handleDocumentClick = (proof: ProofData) => {
    onNavigateToAssetDetail(proof);
  };

  const displayName = userProfile.firstName || "User";
  const initials = `${userProfile.firstName?.[0] || ""}${userProfile.lastName?.[0] || ""}`.toUpperCase() || "OC";

  const sampleDocuments = [
  { id: "1", name: "Birth Certificate", date: "Jan 15, 2024" },
  { id: "2", name: "Hawaiian Land Title", date: "Jan 15, 2024" },
  { id: "3", name: "1967 Corvette", date: "Jan 15, 2024" },
  { id: "4", name: "Engineering Patent", date: "Jan 15, 2024" }];


  const recentActivities = [
  { date: "Jan 15, 2024 - 18:06 EST", description: "Document anchored successfully. Verification record created and secured on permanent ledger.", link: "View details" },
  { date: "Jan 15, 2024 - 18:06 EST", description: "New proof added to your vault. Certificate of authenticity generated.", link: "View details" },
  { date: "Jan 15, 2024 - 18:06 EST", description: "Credential verification completed. Document integrity confirmed.", link: "View details" }];


  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 fixed h-screen">
        <div className="p-6 border-b border-slate-100">
          <ArkovaLogo className="h-7" />
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {[
          { id: "vault", label: "Vault Overview", icon: Vault },
          { id: "REGISTERED PROOFS", label: "My Proofs", icon: FileKey },
          { id: "affiliations", label: "Affiliations", icon: Link2 },
          { id: "settings", label: "Settings", icon: Settings }].
          map((item) =>
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-none transition-colors ${
            activeNav === item.id ?
            "bg-slate-100 text-slate-900" :
            "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`
            }>

              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          )}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          {isPublic ?
          <div className="flex items-center gap-3 px-2">
              <Avatar className="h-9 w-9">
                {userProfile.avatarUrl ?
              <AvatarImage src={userProfile.avatarUrl} /> :
              null}
                <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-bold">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{displayName}</p>
                <p className="text-[10px] text-emerald-600 font-medium">Public Profile Active</p>
              </div>
            </div> :

          <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                <Shield className="w-4 h-4 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-slate-700">{arkovaId}</p>
                <p className="text-[10px] text-slate-400 font-medium">Vault Locked</p>
              </div>
            </div>
          }
        </div>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-slate-100 px-6 lg:px-10 h-16 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 lg:hidden">
            <ArkovaLogo className="h-6" />
          </div>
          
          <div className="hidden lg:block" />
          
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              title="Enable to allow verified recruiters to view your credentials">

              <Switch
                checked={isPublic}
                onCheckedChange={setIsPublic}
                className="data-[state=checked]:bg-emerald-500" />

              <div className="flex items-center gap-1.5">
                {isPublic ?
                <>
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-600">Discoverable</span>
                  </> :

                <>
                    <Lock className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">Private Mode</span>
                  </>
                }
              </div>
            </div>
            
            <div className="h-6 w-px bg-slate-200" />
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">

              <span className="hidden sm:inline">Sign Out</span>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="p-6 lg:p-10 space-y-8 max-w-6xl">
          <div className="space-y-6">
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#7BAAD0]">
              Welcome: {isPublic ? displayName : "OC"}
            </h1>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="rounded-none border-slate-200 bg-white shadow-sm">
                <CardContent className="p-4 lg:p-5">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Vault className="w-4 h-4" />
                    <span className="text-[10px] font-medium uppercase tracking-wider !whitespace-pre-line !whitespace-pre-line"> PROOFS</span>
                  </div>
                  <p className="text-3xl lg:text-4xl font-bold text-slate-800">27</p>
                </CardContent>
              </Card>
              
              <Card className="rounded-none border-slate-200 bg-white shadow-sm">
                <CardContent className="p-4 lg:p-5">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Pending Anchors</span>
                  </div>
                  <p className="text-3xl lg:text-4xl font-bold text-slate-800">2</p>
                </CardContent>
              </Card>
              
              <Card className="rounded-none border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-4 lg:p-5">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Security Score</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-emerald-600">Optimal</span>
                      <span className="text-[10px] text-slate-400 ml-2">100% Secured</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="rounded-none border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-4 lg:p-5">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <Award className="w-4 h-4" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Active Credits</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="text-3xl lg:text-4xl font-bold text-slate-800">1,250</p>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-400 leading-relaxed">
                Sic de isto et tutius perducit ad actum ipsum, ut si dico &quot;Ego autem vadam lavari, ut mens mea in statu naturae conformior.
              </p>
            </div>
            <Button
              onClick={onNavigateToAnchor}
              className="rounded-none bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm h-auto py-3 px-5 shrink-0">

              <div className="flex items-center gap-4">
                <div className="text-left">
                  <p className="text-sm font-medium">Upload</p>
                  <p className="text-sm font-medium">Document</p>
                </div>
                <div className="w-10 h-10 bg-slate-100 rounded-none flex items-center justify-center">
                  <Plus className="w-5 h-5 text-[#7BAAD0]" />
                </div>
              </div>
            </Button>
          </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">My Proofs</h2>
                <button className="text-sm text-[#7BAAD0] hover:underline font-medium">
                  All Records
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(proofs.length > 0 ? proofs.slice(0, 4) : sampleDocuments).map((doc, index) => {
                const isProof = "status" in doc;
                const docName = isProof ? (doc as ProofData).name.replace(/_/g, " ").replace(".pdf", "") : doc.name;
                const docDate = isProof ? (doc as ProofData).anchoredDate : (doc as {date: string;}).date;

                return (
                  <Card
                    key={doc.id}
                    className="rounded-none border-slate-200 bg-white shadow-sm hover:border-[#7BAAD0]/50 transition-colors cursor-pointer group"
                    onClick={() => isProof && handleDocumentClick(doc as ProofData)}>

                      <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-none flex items-center justify-center shrink-0 group-hover:bg-[#7BAAD0]/10 transition-colors">
                          <FileText className="w-6 h-6 text-slate-400 group-hover:text-[#7BAAD0]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate group-hover:text-[#7BAAD0] transition-colors">{docName}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Anchored: {docDate}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button className="text-xs text-[#7BAAD0] hover:underline font-medium">View</button>
                            <button className="text-xs text-[#7BAAD0] hover:underline font-medium">Transfer</button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>);

              })}
              </div>
            </div>

            <div className="space-y-4 pt-4">
                <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
                
                <div className="space-y-4">
                  {recentActivities.map((activity, index) =>
              <div key={index} className="space-y-2">
                      <p className="text-[10px] text-[#7BAAD0] font-medium">{activity.date}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {activity.description}
                      </p>
                      <button className="text-xs text-[#7BAAD0] hover:underline font-medium">
                        {activity.link}
                      </button>
                    </div>
              )}
                </div>
              </div>
        </main>

        <div className="h-20 bg-slate-800" />
      </div>
    </div>);

}

interface VerificationType {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: "shield" | "award" | "users" | "star";
  memberCount: number;
}

interface MemberWithAffiliations {
  id: string;
  name: string;
  email: string;
  arkovaId: string;
  avatarUrl?: string;
  verifications: string[];
  cohorts: string[];
  lastActive: string;
  status: "active" | "pending" | "inactive";
}

function AdminDashboard({
  onLogout,
  userProfile,
  onNavigateToAnchor




}: {onLogout: () => void;userProfile: UserProfile;onNavigateToAnchor: () => void;}) {
  const [activeNav, setActiveNav] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [showCreateTagModal, setShowCreateTagModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [memberToRevoke, setMemberToRevoke] = useState<{id: string;name: string;email: string;avatarUrl?: string;} | null>(null);
  const [grantStep, setGrantStep] = useState(1);
  const [selectedVerificationType, setSelectedVerificationType] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const orgName = userProfile.firstName || "Ohio State University";
  const orgInitials = orgName.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();

  const [verificationTypes, setVerificationTypes] = useState<VerificationType[]>([
  { id: "v1", name: "Verified Student", description: "Currently enrolled student", color: "emerald", icon: "shield", memberCount: 2450 },
  { id: "v2", name: "Verified Alumnus", description: "Graduated from the institution", color: "blue", icon: "award", memberCount: 8200 },
  { id: "v3", name: "OSU Blockchain Club", description: "Member of the Blockchain Club", color: "purple", icon: "users", memberCount: 156 },
  { id: "v4", name: "Dean's List", description: "Academic excellence recognition", color: "amber", icon: "star", memberCount: 420 },
  { id: "v5", name: "Class of 2026", description: "Expected graduation 2026", color: "slate", icon: "users", memberCount: 1850 },
  { id: "v6", name: "Engineering", description: "College of Engineering", color: "cyan", icon: "shield", memberCount: 3200 }]
  );

  const [members, setMembers] = useState<MemberWithAffiliations[]>([
  {
    id: "m1",
    name: "Marcus Chen",
    email: "marcus.chen@osu.edu",
    arkovaId: "ark:9f3...2x",
    verifications: ["Verified Student", "OSU Blockchain Club"],
    cohorts: ["Class of 2026", "Engineering"],
    lastActive: "2 hours ago",
    status: "active"
  },
  {
    id: "m2",
    name: "Sarah Mitchell",
    email: "sarah.m@osu.edu",
    arkovaId: "ark:7a2...5k",
    verifications: ["Verified Alumnus", "Dean's List"],
    cohorts: ["Class of 2023", "Business"],
    lastActive: "1 day ago",
    status: "active"
  },
  {
    id: "m3",
    name: "James Rodriguez",
    email: "j.rodriguez@osu.edu",
    arkovaId: "ark:4b8...9m",
    verifications: ["Verified Student"],
    cohorts: ["Class of 2025", "Arts & Sciences"],
    lastActive: "5 mins ago",
    status: "active"
  },
  {
    id: "m4",
    name: "Emily Thompson",
    email: "emily.t@osu.edu",
    arkovaId: "ark:2c1...7p",
    verifications: ["Verified Student", "OSU Blockchain Club", "Dean's List"],
    cohorts: ["Class of 2026", "Engineering"],
    lastActive: "3 days ago",
    status: "active"
  },
  {
    id: "m5",
    name: "David Kim",
    email: "david.kim@osu.edu",
    arkovaId: "ark:8e5...3n",
    verifications: [],
    cohorts: [],
    lastActive: "Pending",
    status: "pending"
  }]
  );

  const [documents] = useState<ProofData[]>([
  {
    id: "1",
    name: "BS_ComputerScience_Diploma.pdf",
    type: "Credential",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Jan 15, 2024 14:32",
    hash: "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
    recordId: "3b4e8f2c1d9a7b6e5f4c3d2e1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b",
    fileSize: "2.4 MB",
    blockHeight: 831234,
    signatureStatus: "signed",
    signatureDate: "Jan 16, 2024"
  },
  {
    id: "2",
    name: "Transcript_Final_2024.pdf",
    type: "Credential",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Jan 18, 2024 09:15",
    hash: "b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9",
    recordId: "4c5f9a3e2d8b7c6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2",
    fileSize: "1.2 MB",
    blockHeight: 831298,
    signatureStatus: "signed",
    signatureDate: "Jan 18, 2024"
  },
  {
    id: "3",
    name: "Employment_Verification_Letter.pdf",
    type: "Document",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Feb 02, 2024 11:45",
    hash: "c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0",
    recordId: "5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    fileSize: "856 KB",
    blockHeight: 831456,
    signatureStatus: "signed",
    signatureDate: "Feb 02, 2024"
  },
  {
    id: "4",
    name: "Research_Grant_Agreement.pdf",
    type: "Contract",
    issuer: orgName,
    status: "Processing",
    anchoredDate: "Feb 10, 2024 16:22",
    hash: "d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1",
    recordId: "pending",
    fileSize: "3.1 MB",
    blockHeight: 831567,
    signatureStatus: "pending"
  },
  {
    id: "5",
    name: "Student_ID_Verification.pdf",
    type: "Credential",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Feb 14, 2024 08:30",
    hash: "e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
    recordId: "6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    fileSize: "420 KB",
    blockHeight: 831678,
    signatureStatus: "signed",
    signatureDate: "Feb 14, 2024"
  },
  {
    id: "6",
    name: "Department_Certificate.pdf",
    type: "Credential",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Feb 20, 2024 13:10",
    hash: "f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3",
    recordId: "7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    fileSize: "1.5 MB",
    blockHeight: 831789,
    signatureStatus: "signed",
    signatureDate: "Feb 20, 2024"
  },
  {
    id: "7",
    name: "Faculty_Appointment_Letter.pdf",
    type: "Document",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Mar 01, 2024 10:05",
    hash: "a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4",
    recordId: "8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    fileSize: "780 KB",
    blockHeight: 831890,
    signatureStatus: "signed",
    signatureDate: "Mar 01, 2024"
  },
  {
    id: "8",
    name: "Scholarship_Award_2024.pdf",
    type: "Credential",
    issuer: orgName,
    status: "Processing",
    anchoredDate: "Mar 05, 2024 15:40",
    hash: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    recordId: "pending",
    fileSize: "920 KB",
    blockHeight: 831901,
    signatureStatus: "pending"
  },
  {
    id: "9",
    name: "Internship_Completion_Cert.pdf",
    type: "Credential",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Mar 10, 2024 09:25",
    hash: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    recordId: "9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    fileSize: "650 KB",
    blockHeight: 832012,
    signatureStatus: "signed",
    signatureDate: "Mar 10, 2024"
  },
  {
    id: "10",
    name: "Course_Completion_Record.pdf",
    type: "Credential",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Mar 15, 2024 14:55",
    hash: "d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    recordId: "0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
    fileSize: "1.1 MB",
    blockHeight: 832123,
    signatureStatus: "signed",
    signatureDate: "Mar 15, 2024"
  },
  {
    id: "11",
    name: "Lab_Safety_Certification.pdf",
    type: "Credential",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Mar 18, 2024 11:30",
    hash: "e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    recordId: "1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    fileSize: "340 KB",
    blockHeight: 832234,
    signatureStatus: "signed",
    signatureDate: "Mar 18, 2024"
  },
  {
    id: "12",
    name: "Ethics_Training_Cert.pdf",
    type: "Credential",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Mar 22, 2024 16:15",
    hash: "f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    recordId: "2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
    fileSize: "280 KB",
    blockHeight: 832345,
    signatureStatus: "signed",
    signatureDate: "Mar 22, 2024"
  },
  {
    id: "13",
    name: "GPA_Verification_Spring24.pdf",
    type: "Document",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Mar 25, 2024 09:00",
    hash: "a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    recordId: "3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
    fileSize: "190 KB",
    blockHeight: 832456,
    signatureStatus: "signed",
    signatureDate: "Mar 25, 2024"
  },
  {
    id: "14",
    name: "Research_Publication_Proof.pdf",
    type: "Document",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Mar 28, 2024 14:20",
    hash: "b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
    recordId: "4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
    fileSize: "2.8 MB",
    blockHeight: 832567,
    signatureStatus: "signed",
    signatureDate: "Mar 28, 2024"
  },
  {
    id: "15",
    name: "Attendance_Record_Q1.pdf",
    type: "Document",
    issuer: orgName,
    status: "Anchored",
    anchoredDate: "Apr 01, 2024 10:45",
    hash: "c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    recordId: "5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6",
    fileSize: "560 KB",
    blockHeight: 832678,
    signatureStatus: "signed",
    signatureDate: "Apr 01, 2024"
  }]
  );

  const registryTags = ["Class of '25", "Class of '26", "Alumni", "HR", "Finance", "Engineering", "Research"];
  const [registrySearch, setRegistrySearch] = useState("");
  const [registryStatusFilter, setRegistryStatusFilter] = useState<string>("all");
  const [registryTagFilter, setRegistryTagFilter] = useState<string>("all");
  const [registryDateRange, setRegistryDateRange] = useState<DateRange | undefined>(undefined);
  const [registryPage, setRegistryPage] = useState(1);
  const [registryRowsPerPage, setRegistryRowsPerPage] = useState(10);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = registrySearch === "" ||
    doc.name.toLowerCase().includes(registrySearch.toLowerCase()) ||
    doc.issuer.toLowerCase().includes(registrySearch.toLowerCase()) ||
    doc.hash.toLowerCase().includes(registrySearch.toLowerCase());
    const matchesStatus = registryStatusFilter === "all" ||
    registryStatusFilter === "verified" && doc.status === "Anchored" ||
    registryStatusFilter === "processing" && doc.status === "Processing";
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDocuments.length / registryRowsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    (registryPage - 1) * registryRowsPerPage,
    registryPage * registryRowsPerPage
  );

  const resetRegistryFilters = () => {
    setRegistrySearch("");
    setRegistryStatusFilter("all");
    setRegistryTagFilter("all");
    setRegistryDateRange(undefined);
    setRegistryPage(1);
  };

  const exportToCSV = () => {
    const headers = ["File Name", "Type", "Anchored By", "Digital Fingerprint", "Date Anchored", "Status"];
    const csvContent = [
    headers.join(","),
    ...filteredDocuments.map((doc) => [
    `"${doc.name}"`,
    doc.type,
    `"${doc.issuer}"`,
    doc.hash,
    doc.anchoredDate,
    doc.status].
    join(","))].
    join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `organization_registry_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyHashToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filteredMembers = members.filter((member) =>
  member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  member.verifications.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase())) ||
  member.cohorts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalSecuredRecords = 12450;
  const verifiedMembers = members.filter((m) => m.status === "active").length;
  const activeTags = verificationTypes.length;

  const handleGrantVerification = () => {
    if (selectedVerificationType && selectedMembers.length > 0) {
      const typeName = verificationTypes.find((v) => v.id === selectedVerificationType)?.name;
      if (typeName) {
        setMembers((prev) => prev.map((m) => {
          if (selectedMembers.includes(m.id) && !m.verifications.includes(typeName)) {
            return { ...m, verifications: [...m.verifications, typeName], status: "active" as const };
          }
          return m;
        }));
        setVerificationTypes((prev) => prev.map((v) => {
          if (v.id === selectedVerificationType) {
            return { ...v, memberCount: v.memberCount + selectedMembers.length };
          }
          return v;
        }));
      }
    }
    setShowGrantModal(false);
    setGrantStep(1);
    setSelectedVerificationType(null);
    setSelectedMembers([]);
  };

  const [newTagName, setNewTagName] = useState("");
  const [newTagDescription, setNewTagDescription] = useState("");
  const [newTagColor, setNewTagColor] = useState("slate");

  const handleCreateTag = () => {
    if (newTagName) {
      const newTag: VerificationType = {
        id: `v${Date.now()}`,
        name: newTagName,
        description: newTagDescription,
        color: newTagColor,
        icon: "users",
        memberCount: 0
      };
      setVerificationTypes((prev) => [...prev, newTag]);
      setNewTagName("");
      setNewTagDescription("");
      setNewTagColor("slate");
      setShowCreateTagModal(false);
    }
  };

  const getVerificationColor = (name: string) => {
    const type = verificationTypes.find((v) => v.name === name);
    const color = type?.color || "slate";
    const colors: Record<string, string> = {
      emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      purple: "bg-purple-100 text-purple-700 border-purple-200",
      amber: "bg-amber-100 text-amber-700 border-amber-200",
      slate: "bg-slate-100 text-slate-700 border-slate-200",
      cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
      rose: "bg-rose-100 text-rose-700 border-rose-200"
    };
    return colors[color] || colors.slate;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <aside className="hidden lg:flex flex-col w-72 bg-[#1A202C] text-white fixed h-screen">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            {userProfile.avatarUrl ?
            <img src={userProfile.avatarUrl} alt={orgName} className="w-12 h-12 object-contain bg-white" /> :

            <div className="w-12 h-12 bg-[#7BAAD0] flex items-center justify-center text-white font-bold text-sm">
                {orgInitials}
              </div>
            }
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{orgName}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Institution</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {[
          { id: "overview", label: "Overview", icon: Vault },
          { id: "registry", label: "Registry", icon: FileKey },
          { id: "members", label: "Members & Affiliations", icon: Users },
          { id: "verification-types", label: "Verification Types", icon: ShieldCheck },
          { id: "settings", label: "Settings", icon: Settings }].
          map((item) =>
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-none transition-colors ${
            activeNav === item.id ?
            "bg-white/10 text-white" :
            "text-slate-400 hover:bg-white/5 hover:text-white"}`
            }>

              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          )}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-[#7BAAD0] text-white text-xs font-bold">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Admin User</p>
              <p className="text-[10px] text-slate-400">Organization Admin</p>
            </div>
            <button onClick={onLogout} className="text-slate-400 hover:text-white">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:ml-72">
        <header className="bg-white border-b border-slate-200 px-6 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Organizations</span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-400">{orgName.split(" ").slice(0, 2).join(" ")}</span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-900 font-semibold capitalize">{activeNav.replace("-", " ")}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Global search..."
                className="pl-10 h-10 w-72 border-slate-200 rounded-none bg-slate-50 focus-visible:ring-[#7BAAD0]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
            </Button>
          </div>
        </header>

        <main className="p-6 lg:p-8 space-y-8">
          {activeNav === "overview" &&
          <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="rounded-none border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-[#7BAAD0]/10 rounded-none flex items-center justify-center">
                        <FileKey className="w-6 h-6 text-[#7BAAD0]" />
                      </div>
                      <Badge className="rounded-none bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px] uppercase tracking-widest">+12% this month</Badge>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Total Secured Records</p>
                    <p className="text-4xl font-bold text-slate-900">{totalSecuredRecords.toLocaleString()}</p>
                  </CardContent>
                </Card>
                
                <Card className="rounded-none border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-emerald-50 rounded-none flex items-center justify-center">
                        <Users className="w-6 h-6 text-emerald-600" />
                      </div>
                      <Badge className="rounded-none bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px] uppercase tracking-widest">Active</Badge>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Verified Members</p>
                    <p className="text-4xl font-bold text-slate-900">{verifiedMembers.toLocaleString()}</p>
                  </CardContent>
                </Card>
                
                <Card className="rounded-none border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-50 rounded-none flex items-center justify-center">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Active Tags</p>
                    <p className="text-4xl font-bold text-slate-900">{activeTags}</p>
                    <p className="text-xs text-slate-500 mt-1">Clubs, Depts, Years</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                onClick={() => setShowGrantModal(true)}
                className="h-12 px-6 rounded-none bg-[#1A202C] hover:bg-slate-800 uppercase text-xs font-bold tracking-widest gap-2">

                  <ShieldCheck className="w-4 h-4" /> Grant Verification
                </Button>
                <Button
                onClick={() => setShowInviteModal(true)}
                variant="outline"
                className="h-12 px-6 rounded-none bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 uppercase text-xs font-bold tracking-widest gap-2">

                  <UserPlus className="w-4 h-4" /> Invite Members
                </Button>
                <Button
                onClick={() => setShowCreateTagModal(true)}
                variant="outline"
                className="h-12 px-6 rounded-none uppercase text-xs font-bold tracking-widest gap-2 border-slate-300">

                  <Plus className="w-4 h-4" /> Create New Tag
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900">Member Management</h2>
                  <button
                  onClick={() => setActiveNav("members")}
                  className="text-xs font-bold uppercase tracking-widest text-[#7BAAD0] hover:underline">

                    View All Members
                  </button>
                </div>
                
                <Card className="rounded-none border-slate-200 bg-white overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow className="border-b border-slate-200">
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12">Member Name / ID</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12">Verification Status</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12">Department / Cohorts</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12">Last Active</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.slice(0, 5).map((member) =>
                    <TableRow key={member.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-bold">
                                  {member.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                                <p className="text-[10px] font-mono text-slate-400">{member.arkovaId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                              {member.verifications.length > 0 ?
                          member.verifications.map((v, i) =>
                          <Badge key={i} className={`rounded-none text-[9px] uppercase tracking-widest border ${getVerificationColor(v)}`}>
                                    <Check className="w-2.5 h-2.5 mr-1" />
                                    {v}
                                  </Badge>
                          ) :

                          <span className="text-xs text-slate-400 italic">No verifications</span>
                          }
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                              {member.cohorts.map((c, i) =>
                          <Badge key={i} variant="outline" className="rounded-none text-[9px] uppercase tracking-widest border-slate-200 text-slate-500 bg-white">
                                  {c}
                                </Badge>
                          )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`text-sm ${member.status === "pending" ? "text-amber-600" : "text-slate-600"}`}>
                              {member.lastActive}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-none w-48">
                                <DropdownMenuItem className="gap-2 text-xs uppercase font-bold tracking-widest">
                                  <Edit3 className="w-4 h-4" /> Manage Tags
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-xs uppercase font-bold tracking-widest">
                                  <ShieldCheck className="w-4 h-4" /> Grant Verification
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                              onClick={() => {
                                setMemberToRevoke({ id: member.id, name: member.name, email: member.email });
                                setShowRevokeModal(true);
                              }}
                              className="gap-2 text-xs uppercase font-bold tracking-widest text-red-600">

                                  <UserX className="w-4 h-4" /> Revoke Status
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </>
          }

          {activeNav === "members" &&
          <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Members & Affiliations</h1>
                  <p className="text-slate-500 text-sm mt-1">Manage member verifications and organizational affiliations</p>
                </div>
                <Button
                onClick={() => setShowGrantModal(true)}
                className="h-12 px-6 rounded-none bg-[#1A202C] hover:bg-slate-800 uppercase text-xs font-bold tracking-widest gap-2">

                  <ShieldCheck className="w-4 h-4" /> Grant Verification
                </Button>
              </div>

              <Card className="rounded-none border-slate-200 bg-white overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow className="border-b border-slate-200">
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12">Member Name / ID</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12">Verification Status</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12">Department / Cohorts</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12">Last Active</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest h-12 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) =>
                  <TableRow key={member.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-bold">
                                {member.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                              <p className="text-[10px] font-mono text-slate-400">{member.arkovaId}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                            {member.verifications.length > 0 ?
                        member.verifications.map((v, i) =>
                        <Badge key={i} className={`rounded-none text-[9px] uppercase tracking-widest border ${getVerificationColor(v)}`}>
                                  <Check className="w-2.5 h-2.5 mr-1" />
                                  {v}
                                </Badge>
                        ) :

                        <span className="text-xs text-slate-400 italic">No verifications</span>
                        }
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                            {member.cohorts.map((c, i) =>
                        <Badge key={i} variant="outline" className="rounded-none text-[9px] uppercase tracking-widest border-slate-200 text-slate-500 bg-white">
                                {c}
                              </Badge>
                        )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`text-sm ${member.status === "pending" ? "text-amber-600" : "text-slate-600"}`}>
                            {member.lastActive}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-none w-48">
                              <DropdownMenuItem className="gap-2 text-xs uppercase font-bold tracking-widest">
                                <Edit3 className="w-4 h-4" /> Manage Tags
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-xs uppercase font-bold tracking-widest">
                                <ShieldCheck className="w-4 h-4" /> Grant Verification
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 text-xs uppercase font-bold tracking-widest text-red-600">
                                <X className="w-4 h-4" /> Revoke Status
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          }

          {activeNav === "registry" &&
          <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Organization Registry</h1>
                  <p className="text-slate-500 text-sm mt-1">Complete audit trail of all anchored documents</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                  variant="outline"
                  onClick={exportToCSV}
                  className="h-10 px-4 rounded-none uppercase text-xs font-bold tracking-widest gap-2 border-slate-300">

                    <FileSpreadsheet className="w-4 h-4" /> Export CSV
                  </Button>
                  <Button
                  onClick={onNavigateToAnchor}
                  className="h-10 px-4 rounded-none bg-[#1A202C] hover:bg-slate-800 uppercase text-xs font-bold tracking-widest gap-2">

                    <Plus className="w-4 h-4" /> New Anchor
                  </Button>
                </div>
              </div>

              <Card className="rounded-none border-slate-200 bg-white">
                <div className="p-4 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[280px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                      placeholder="Search by File Name, Member Name, or Record ID..."
                      value={registrySearch}
                      onChange={(e) => {setRegistrySearch(e.target.value);setRegistryPage(1);}}
                      className="pl-10 h-9 rounded-none border-slate-200 text-sm" />

                    </div>
                    
                    <Select value={registryStatusFilter} onValueChange={(v) => {setRegistryStatusFilter(v);setRegistryPage(1);}}>
                      <SelectTrigger className="w-[140px] h-9 rounded-none border-slate-200 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="all" className="text-xs">All Status</SelectItem>
                        <SelectItem value="verified" className="text-xs">Verified</SelectItem>
                        <SelectItem value="processing" className="text-xs">Processing</SelectItem>
                        <SelectItem value="revoked" className="text-xs">Revoked</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={registryTagFilter} onValueChange={(v) => {setRegistryTagFilter(v);setRegistryPage(1);}}>
                      <SelectTrigger className="w-[150px] h-9 rounded-none border-slate-200 text-xs">
                        <SelectValue placeholder="Tags/Cohorts" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="all" className="text-xs">All Tags</SelectItem>
                        {registryTags.map((tag) =>
                      <SelectItem key={tag} value={tag} className="text-xs">{tag}</SelectItem>
                      )}
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="h-9 px-3 rounded-none border-slate-200 text-xs gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {registryDateRange?.from ?
                        registryDateRange.to ?
                        <span>{registryDateRange.from.toLocaleDateString()} - {registryDateRange.to.toLocaleDateString()}</span> :

                        <span>{registryDateRange.from.toLocaleDateString()}</span> :


                        <span>Date Range</span>
                        }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-none" align="start">
                        <div className="p-3 border-b border-slate-100">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Select Date Range</p>
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-[10px] uppercase tracking-widest text-slate-400">From</Label>
                              <Input
                              type="date"
                              className="h-8 rounded-none text-xs"
                              value={registryDateRange?.from?.toISOString().split('T')[0] || ''}
                              onChange={(e) => setRegistryDateRange((prev) => ({ ...prev, from: e.target.value ? new Date(e.target.value) : undefined, to: prev?.to }))} />

                            </div>
                            <div>
                              <Label className="text-[10px] uppercase tracking-widest text-slate-400">To</Label>
                              <Input
                              type="date"
                              className="h-8 rounded-none text-xs"
                              value={registryDateRange?.to?.toISOString().split('T')[0] || ''}
                              onChange={(e) => setRegistryDateRange((prev) => ({ from: prev?.from, to: e.target.value ? new Date(e.target.value) : undefined }))} />

                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Button
                    variant="ghost"
                    onClick={resetRegistryFilters}
                    className="h-9 px-3 rounded-none text-xs text-slate-500 hover:text-slate-700 gap-1">

                      <RotateCcw className="w-3 h-3" /> Reset
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/80">
                      <TableRow className="border-b border-slate-200">
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-10 whitespace-nowrap">File Name</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-10 whitespace-nowrap">Anchored By</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-10 whitespace-nowrap">Digital Fingerprint</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-10 whitespace-nowrap">Assigned Tags</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-10 whitespace-nowrap">Date Anchored</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-10 whitespace-nowrap">Status</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest h-10 text-right whitespace-nowrap">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedDocuments.map((doc, idx) => {
                      const docTags = idx % 3 === 0 ? ["Student", "Engineering", "Class of '25"] : idx % 3 === 1 ? ["Alumni", "Finance"] : ["HR"];
                      const isPdf = doc.name.toLowerCase().endsWith('.pdf');
                      return (
                        <TableRow key={doc.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                            <TableCell className="py-2.5">
                              <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 flex items-center justify-center shrink-0 ${isPdf ? "bg-red-50" : "bg-blue-50"}`}>
                                  <FileText className={`w-3.5 h-3.5 ${isPdf ? "text-red-400" : "text-blue-400"}`} />
                                </div>
                                <span className="text-sm font-medium text-slate-800 truncate max-w-[180px]">{doc.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-2.5">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="bg-slate-100 text-slate-600 text-[9px] font-bold">
                                    {doc.issuer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-slate-600 truncate max-w-[100px]">{doc.issuer}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-2.5">
                              <div className="flex items-center gap-1 group/hash">
                                <code className="text-[11px] font-mono text-slate-500">{doc.hash.slice(0, 8)}...{doc.hash.slice(-4)}</code>
                                <button
                                onClick={() => copyHashToClipboard(doc.hash)}
                                className="opacity-0 group-hover/hash:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded">

                                  {copiedHash === doc.hash ?
                                <Check className="w-3 h-3 text-emerald-500" /> :

                                <Copy className="w-3 h-3 text-slate-400" />
                                }
                                </button>
                              </div>
                            </TableCell>
                            <TableCell className="py-2.5">
                              <div className="flex items-center gap-1">
                                {docTags.slice(0, 2).map((tag, i) =>
                              <Badge key={i} variant="secondary" className="rounded-none text-[9px] px-1.5 py-0 h-5 bg-slate-100 text-slate-600 border-none">
                                    {tag}
                                  </Badge>
                              )}
                                {docTags.length > 2 &&
                              <span className="text-[10px] text-slate-400">+{docTags.length - 2} more</span>
                              }
                              </div>
                            </TableCell>
                            <TableCell className="py-2.5">
                              <span className="text-xs text-slate-600 whitespace-nowrap">{doc.anchoredDate}</span>
                            </TableCell>
                            <TableCell className="py-2.5">
                              <Badge className={`rounded-none text-[9px] uppercase tracking-wider px-2 py-0.5 border-none ${
                            doc.status === "Anchored" ?
                            "bg-emerald-100 text-emerald-700" :
                            "bg-amber-100 text-amber-700"}`
                            }>
                                {doc.status === "Anchored" ? "Secured" : "Anchoring"}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-2.5 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-none w-48">
                                  <DropdownMenuItem className="gap-2 text-xs">
                                    <ExternalLink className="w-4 h-4" /> View Certificate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2 text-xs">
                                    <Clock className="w-4 h-4" /> View Audit Trail
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="gap-2 text-xs text-red-600">
                                    <X className="w-4 h-4" /> Revoke Verification
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>);

                    })}
                    </TableBody>
                  </Table>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Rows per page:</span>
                    <Select value={String(registryRowsPerPage)} onValueChange={(v) => {setRegistryRowsPerPage(Number(v));setRegistryPage(1);}}>
                      <SelectTrigger className="w-[70px] h-8 rounded-none border-slate-200 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="10" className="text-xs">10</SelectItem>
                        <SelectItem value="15" className="text-xs">15</SelectItem>
                        <SelectItem value="20" className="text-xs">20</SelectItem>
                        <SelectItem value="50" className="text-xs">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">
                      {(registryPage - 1) * registryRowsPerPage + 1}-{Math.min(registryPage * registryRowsPerPage, filteredDocuments.length)} of {filteredDocuments.length}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => setRegistryPage((p) => Math.max(1, p - 1))}
                      disabled={registryPage === 1}>

                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-xs text-slate-600 px-2">Page {registryPage} of {totalPages || 1}</span>
                      <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => setRegistryPage((p) => Math.min(totalPages, p + 1))}
                      disabled={registryPage >= totalPages}>

                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          }

          {activeNav === "verification-types" &&
          <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Verification Types</h1>
                  <p className="text-slate-500 text-sm mt-1">Manage badge definitions and affiliation categories</p>
                </div>
                <Button
                onClick={() => setShowCreateTagModal(true)}
                className="h-12 px-6 rounded-none bg-[#1A202C] hover:bg-slate-800 uppercase text-xs font-bold tracking-widest gap-2">

                  <Plus className="w-4 h-4" /> Create New Tag
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {verificationTypes.map((type) =>
              <Card key={type.id} className="rounded-none border-slate-200 bg-white hover:border-[#7BAAD0]/50 transition-colors cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-none flex items-center justify-center ${
                    type.color === "emerald" ? "bg-emerald-100 text-emerald-600" :
                    type.color === "blue" ? "bg-blue-100 text-blue-600" :
                    type.color === "purple" ? "bg-purple-100 text-purple-600" :
                    type.color === "amber" ? "bg-amber-100 text-amber-600" :
                    type.color === "cyan" ? "bg-cyan-100 text-cyan-600" :
                    "bg-slate-100 text-slate-600"}`
                    }>
                          {type.icon === "shield" ? <Shield className="w-5 h-5" /> :
                      type.icon === "award" ? <Award className="w-5 h-5" /> :
                      type.icon === "star" ? <CheckCircle2 className="w-5 h-5" /> :
                      <Users className="w-5 h-5" />}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-none">
                            <DropdownMenuItem className="gap-2 text-xs uppercase font-bold tracking-widest">
                              <Edit3 className="w-4 h-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-xs uppercase font-bold tracking-widest text-red-600">
                              <Trash2 className="w-4 h-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1">{type.name}</h3>
                      <p className="text-xs text-slate-500 mb-4">{type.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Members</span>
                        <span className="text-lg font-bold text-slate-900">{type.memberCount.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
              )}
              </div>
            </div>
          }

          {activeNav === "settings" &&
          <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Manage API keys, billing, and institution settings</p>
              </div>

              <div className="grid gap-6">
                <Card className="rounded-none border-slate-200 bg-white">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest">API Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">API Key</Label>
                      <div className="flex gap-2">
                        <Input value="ark_live_***********************" disabled className="rounded-none font-mono text-sm" />
                        <Button variant="outline" className="rounded-none shrink-0">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Webhook URL</Label>
                      <Input placeholder="https://your-domain.com/webhook" className="rounded-none" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-none border-slate-200 bg-white">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest">Billing</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Enterprise Plan</p>
                        <p className="text-xs text-slate-500">Unlimited verifications, priority support</p>
                      </div>
                      <Badge className="rounded-none bg-emerald-100 text-emerald-700 border-emerald-200">Active</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          }
        </main>
      </div>

      <Dialog open={showGrantModal} onOpenChange={(open) => {
        setShowGrantModal(open);
        if (!open) {
          setGrantStep(1);
          setSelectedVerificationType(null);
          setSelectedMembers([]);
        }
      }}>
        <DialogContent className="max-w-lg rounded-none">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#7BAAD0]" />
              Grant Verification
            </DialogTitle>
            <DialogDescription>
              {grantStep === 1 && "Step 1: Select the verification type to grant"}
              {grantStep === 2 && "Step 2: Select members to receive this verification"}
              {grantStep === 3 && "Step 3: Review and confirm"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((step) =>
              <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                grantStep >= step ? "bg-[#7BAAD0] text-white" : "bg-slate-100 text-slate-400"}`
                }>
                    {grantStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && <div className={`w-12 h-0.5 ${grantStep > step ? "bg-[#7BAAD0]" : "bg-slate-200"}`} />}
                </div>
              )}
            </div>

            {grantStep === 1 &&
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {verificationTypes.map((type) =>
              <button
                key={type.id}
                onClick={() => setSelectedVerificationType(type.id)}
                className={`w-full p-4 border text-left transition-colors ${
                selectedVerificationType === type.id ?
                "border-[#7BAAD0] bg-[#7BAAD0]/5" :
                "border-slate-200 hover:border-slate-300"}`
                }>

                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
                  type.color === "emerald" ? "bg-emerald-100 text-emerald-600" :
                  type.color === "blue" ? "bg-blue-100 text-blue-600" :
                  type.color === "purple" ? "bg-purple-100 text-purple-600" :
                  type.color === "amber" ? "bg-amber-100 text-amber-600" :
                  "bg-slate-100 text-slate-600"}`
                  }>
                        <Shield className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{type.name}</p>
                        <p className="text-xs text-slate-500">{type.description}</p>
                      </div>
                      {selectedVerificationType === type.id &&
                  <Check className="w-5 h-5 text-[#7BAAD0]" />
                  }
                    </div>
                  </button>
              )}
              </div>
            }

            {grantStep === 2 &&
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {members.map((member) =>
              <button
                key={member.id}
                onClick={() => {
                  if (selectedMembers.includes(member.id)) {
                    setSelectedMembers((prev) => prev.filter((id) => id !== member.id));
                  } else {
                    setSelectedMembers((prev) => [...prev, member.id]);
                  }
                }}
                className={`w-full p-4 border text-left transition-colors ${
                selectedMembers.includes(member.id) ?
                "border-[#7BAAD0] bg-[#7BAAD0]/5" :
                "border-slate-200 hover:border-slate-300"}`
                }>

                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-bold">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                      {selectedMembers.includes(member.id) &&
                  <Check className="w-5 h-5 text-[#7BAAD0]" />
                  }
                    </div>
                  </button>
              )}
              </div>
            }

            {grantStep === 3 &&
            <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Verification Type</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {verificationTypes.find((v) => v.id === selectedVerificationType)?.name}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Selected Members ({selectedMembers.length})</p>
                  <div className="space-y-2">
                    {selectedMembers.map((id) => {
                    const member = members.find((m) => m.id === id);
                    return member ?
                    <div key={id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-slate-200 text-slate-600 text-[10px] font-bold">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-slate-700">{member.name}</span>
                        </div> :
                    null;
                  })}
                  </div>
                </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-200">
                    <p className="text-xs text-emerald-700">
                      <strong>Note:</strong> This will immediately add a verification badge to the selected members&apos; profiles. Credits will be used from your account balance.
                    </p>
                  </div>
              </div>
            }
          </div>

          <DialogFooter className="gap-2">
            {grantStep > 1 &&
            <Button
              variant="outline"
              onClick={() => setGrantStep((prev) => prev - 1)}
              className="rounded-none">

                Back
              </Button>
            }
            <Button
              variant="outline"
              onClick={() => setShowGrantModal(false)}
              className="rounded-none">

              Cancel
            </Button>
            {grantStep < 3 ?
            <Button
              onClick={() => setGrantStep((prev) => prev + 1)}
              disabled={grantStep === 1 && !selectedVerificationType || grantStep === 2 && selectedMembers.length === 0}
              className="rounded-none bg-[#1A202C] hover:bg-slate-800">

                Continue
              </Button> :

            <Button
              onClick={handleGrantVerification}
              className="rounded-none bg-[#1A202C] hover:bg-slate-800">

                Grant Verification
              </Button>
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateTagModal} onOpenChange={setShowCreateTagModal}>
        <DialogContent className="max-w-md rounded-none">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#7BAAD0]" />
              Create New Tag
            </DialogTitle>
            <DialogDescription>
              Create a new verification type, cohort, or department tag
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Tag Name</Label>
              <Input
                placeholder="e.g., Blockchain Club, Class of 2027"
                className="rounded-none"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)} />

            </div>
            <div className="space-y-2">
              <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Description</Label>
              <Textarea
                placeholder="Brief description of this tag..."
                className="rounded-none"
                value={newTagDescription}
                onChange={(e) => setNewTagDescription(e.target.value)} />

            </div>
            <div className="space-y-2">
              <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Color</Label>
              <div className="flex flex-wrap gap-2">
                {["emerald", "blue", "purple", "amber", "cyan", "slate", "rose"].map((color) =>
                <button
                  key={color}
                  onClick={() => setNewTagColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                  newTagColor === color ? "border-slate-900" : "border-transparent"} ${

                  color === "emerald" ? "bg-emerald-500" :
                  color === "blue" ? "bg-blue-500" :
                  color === "purple" ? "bg-purple-500" :
                  color === "amber" ? "bg-amber-500" :
                  color === "cyan" ? "bg-cyan-500" :
                  color === "rose" ? "bg-rose-500" :
                  "bg-slate-500"}`
                  } />

                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateTagModal(false)} className="rounded-none">Cancel</Button>
            <Button
              onClick={handleCreateTag}
              disabled={!newTagName}
              className="rounded-none bg-[#1A202C] hover:bg-slate-800">

              Create Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <InviteMemberModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)} />


      <RevokeAccessModal
        isOpen={showRevokeModal}
        onClose={() => setShowRevokeModal(false)}
        member={memberToRevoke || { name: "", email: "" }} />

    </div>);

}

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  hash: string | null;
  status: "hashing" | "ready" | "anchoring" | "anchored";
}

interface AnchoringRecord {
  id: string;
  name: string;
  status: "Verified" | "In Progress" | "Securing";
  progress: number;
}

function AnchorScreen({
  onBack,
  onAnchorComplete



}: {onBack: () => void;onAnchorComplete: (proof: ProofData) => void;}) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [storageOnChain, setStorageOnChain] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [pendingProofs, setPendingProofs] = useState<ProofData[]>([]);
  const [currentSigningIndex, setCurrentSigningIndex] = useState(0);
  const [anchoringRecords, setAnchoringRecords] = useState<AnchoringRecord[]>([
  { id: "ins1", name: "Quando ambulabat agendis admonere te qualis", status: "Verified", progress: 100 },
  { id: "ins2", name: "Quando ambulabat agendis admonere te qualis", status: "In Progress", progress: 35 },
  { id: "ins3", name: "Quando ambulabat agendis admonere te qualis", status: "Securing", progress: 70 }]
  );

  const processFile = (selectedFile: File) => {
    const newFile: UploadedFile = {
      id: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file: selectedFile,
      progress: 0,
      hash: null,
      status: "hashing"
    };

    setUploadedFiles((prev) => [...prev, newFile]);

    const interval = setInterval(() => {
      setUploadedFiles((prev) => prev.map((f) => {
        if (f.id === newFile.id) {
          const newProgress = Math.min(f.progress + Math.random() * 15, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            const mockHash = `${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`.slice(0, 64);
            return { ...f, progress: 100, hash: mockHash, status: "ready" as const };
          }
          return { ...f, progress: newProgress };
        }
        return f;
      }));
    }, 100);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleAnchorClick = () => {
    const readyFiles = uploadedFiles.filter((f) => f.status === "ready");
    if (readyFiles.length > 0) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmAnchor = () => {
    const readyFiles = uploadedFiles.filter((f) => f.status === "ready");

    const newProofs: ProofData[] = readyFiles.map((uploadedFile) => ({
      id: `proof-${Date.now()}-${uploadedFile.id}`,
      name: uploadedFile.file.name,
      type: uploadedFile.file.name.endsWith(".pdf") ? "Document" : "Data",
      issuer: "Self-Anchored",
      status: "Processing" as const,
      anchoredDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      hash: uploadedFile.hash || "",
      recordId: `${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`.slice(0, 64),
      fileSize: `${(uploadedFile.file.size / 1024).toFixed(1)} KB`,
      blockHeight: 831456 + Math.floor(Math.random() * 100),
      signatureStatus: "pending" as const
    }));

    readyFiles.forEach((uploadedFile) => {
      setAnchoringRecords((prev) => [{
        id: `ins-${Date.now()}-${uploadedFile.id}`,
        name: uploadedFile.file.name,
        status: "Securing" as const,
        progress: 0
      }, ...prev]);
    });

    setUploadedFiles((prev) => prev.filter((f) => f.status !== "ready"));
    setPendingProofs(newProofs);
    setCurrentSigningIndex(0);
    setShowConfirmModal(false);
    setShowSignatureModal(true);
  };

  const handleSignatureComplete = (signatureData: string) => {
    const currentProof = pendingProofs[currentSigningIndex];
    const signedProof: ProofData = {
      ...currentProof,
      signatureStatus: "signed",
      signatureDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      }),
      signatureData
    };

    onAnchorComplete(signedProof);

    if (currentSigningIndex < pendingProofs.length - 1) {
      setCurrentSigningIndex((prev) => prev + 1);
    } else {
      setShowSignatureModal(false);
      setPendingProofs([]);
      setCurrentSigningIndex(0);
      onBack();
    }
  };

  const handleSkipSignature = () => {
    const currentProof = pendingProofs[currentSigningIndex];
    onAnchorComplete(currentProof);

    if (currentSigningIndex < pendingProofs.length - 1) {
      setCurrentSigningIndex((prev) => prev + 1);
    } else {
      setShowSignatureModal(false);
      setPendingProofs([]);
      setCurrentSigningIndex(0);
      onBack();
    }
  };

  const readyFilesCount = uploadedFiles.filter((f) => f.status === "ready").length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-slate-800">Secure Asset</h1>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">

            <span className="text-sm">Close</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#7BAAD0]/10 border border-[#7BAAD0]/20 p-4 mb-8 flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#7BAAD0] shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Privacy Guarantee:</span> Your documents are hashed locally on your device. Arkova never receives the file content, only the cryptographic fingerprint.
          </p>
        </div>

        <div className="mb-8">
          <div
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const files = Array.from(e.dataTransfer.files);
              files.forEach((file) => processFile(file));
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="border-2 border-dashed border-slate-200 bg-slate-50/50 h-48 flex flex-col items-center justify-center hover:border-[#7BAAD0]/50 transition-colors">

            <input
              type="file"
              id="file-upload-anchor"
              accept=".pdf,.csv,.xlsx"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  Array.from(e.target.files).forEach((file) => processFile(file));
                }
                e.target.value = "";
              }}
              className="hidden" />

            <ScanLine className="w-10 h-10 text-slate-300 mb-3" />
            <p className="text-sm text-slate-500 mb-1">Drag & drop files to calculate hash</p>
            <p className="text-xs text-slate-400 mb-4">PDF, CSV, XLSX supported • Max 4MB</p>
            <Button
              type="button"
              onClick={() => document.getElementById("file-upload-anchor")?.click()}
              className="bg-[#9B59B6] hover:bg-[#8E44AD] text-white rounded-none px-8 h-10">

              Browse
            </Button>
          </div>
        </div>

        {uploadedFiles.length > 0 &&
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Upload Status</h2>
            <div className="space-y-3">
              {uploadedFiles.map((uploadedFile) =>
            <div key={uploadedFile.id} className="border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{uploadedFile.file.name}</p>
                      <p className="text-xs text-slate-400">{(uploadedFile.file.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32">
                        <Progress
                      value={uploadedFile.progress}
                      className="h-2 rounded-none [&>div]:bg-[#9B59B6]" />

                      </div>
                      <button
                    onClick={() => removeFile(uploadedFile.id)}
                    className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">

                        <X className="w-3 h-3 text-slate-500" />
                      </button>
                    </div>
                  </div>
                  {uploadedFile.hash &&
              <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">SHA-256 Hash</p>
                      <p className="text-xs font-mono text-slate-500 break-all">{uploadedFile.hash}</p>
                    </div>
              }
                </div>
            )}
            </div>
          </div>
        }

          <div className="flex justify-end mb-12 pt-6 border-t border-slate-100">
            <Button
            onClick={handleAnchorClick}
            disabled={readyFilesCount === 0}
            className="bg-[#1A202C] hover:bg-slate-800 text-white rounded-none px-8 h-12 text-xs uppercase tracking-widest font-bold disabled:opacity-50">

              Anchor & Secure Proof
            </Button>
          </div>

          <div>
              <h2 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-4">Anchoring Status</h2>
              <div className="space-y-4">
                {anchoringRecords.map((record) =>
            <div key={record.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{record.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{record.status}</p>
                      </div>
                      {record.status === "Verified" &&
                <button className="flex items-center gap-1 text-[#7BAAD0] hover:underline">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-widest">View Proof</span>
                        </button>
                }
                    </div>
                    <Progress
                value={record.progress}
                className="h-1.5 rounded-none [&>div]:bg-[#7BAAD0]" />

                  </div>
            )}
              </div>
            </div>

          <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <DialogContent className="max-w-md rounded-none">
              <DialogHeader>
                <DialogTitle className="uppercase text-sm font-bold tracking-widest">Confirm Anchor Proof</DialogTitle>
                <DialogDescription className="text-slate-500">
                  You are about to anchor {readyFilesCount} document(s) to the blockchain. This action is permanent and creates an immutable verification record.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-3 pt-4">
                <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="rounded-none uppercase text-[10px] font-bold tracking-widest">

                  Cancel
                </Button>
                <Button
                onClick={handleConfirmAnchor}
                className="bg-[#1A202C] hover:bg-slate-800 rounded-none uppercase text-[10px] font-bold tracking-widest px-6">

                  Confirm & Secure
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        <Dialog open={showSignatureModal} onOpenChange={setShowSignatureModal}>
          <DialogContent className="max-w-lg rounded-none">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <PenTool className="w-5 h-5 text-[#9B59B6]" />
                Sign Document
              </DialogTitle>
              <DialogDescription className="text-slate-500 pt-2">
                {pendingProofs.length > 1 ?
                `Signing document ${currentSigningIndex + 1} of ${pendingProofs.length}` :
                "Apply your e-signature to verify document authenticity"
                }
              </DialogDescription>
            </DialogHeader>
            
            {pendingProofs[currentSigningIndex] &&
            <div className="py-4 space-y-4">
                <div className="bg-slate-50 border border-slate-200 p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {pendingProofs[currentSigningIndex].name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {pendingProofs[currentSigningIndex].fileSize}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Draw Your Signature</p>
                  <SignatureCanvas
                  onSave={handleSignatureComplete}
                  onCancel={handleSkipSignature} />

                </div>
              </div>
            }

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={handleSkipSignature}
                className="text-xs text-slate-400 hover:text-slate-600">

                Skip signing for now
              </button>
              {pendingProofs.length > 1 &&
              <p className="text-xs text-slate-400">
                  {currentSigningIndex + 1} / {pendingProofs.length}
                </p>
              }
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>);

}

function AssetDetailScreen({
  proof,
  onBack,
  onNavigateToESign




}: {proof: ProofData;onBack: () => void;onNavigateToESign: (doc: ProofData) => void;}) {
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "verifying" | "match" | "mismatch">("idle");
  const [droppedFileName, setDroppedFileName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleVerifyFile = (file: File) => {
    setDroppedFileName(file.name);
    setVerifyStatus("verifying");

    setTimeout(() => {
      const isMatch = file.name.toLowerCase().includes(proof.name.toLowerCase().replace(".pdf", "").replace(/_/g, " ").split(" ")[0].toLowerCase());
      setVerifyStatus(isMatch ? "match" : "mismatch");
    }, 1500);
  };

  const resetVerify = () => {
    setVerifyStatus("idle");
    setDroppedFileName(null);
  };

  const truncateHash = (hash: string) => `${hash.slice(0, 8)}...${hash.slice(-8)}`;

  const timelineEvents = [
  {
    title: "Digital Fingerprint Created",
    timestamp: proof.anchoredDate + " • 14:23:01 UTC",
    description: "SHA-256 hash computed locally on user device",
    completed: true
  },
  {
    title: "Anchored to Network",
    timestamp: proof.anchoredDate + " • 14:45:32 UTC",
    description: "Cryptographic fingerprint permanently secured",
    completed: proof.status === "Anchored"
  },
  {
    title: "Independent Verification Confirmed",
    timestamp: proof.status === "Anchored" ? "Verified • Current" : "Pending confirmation",
    description: "Record exists on public ledger",
    completed: proof.status === "Anchored"
  }];


  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-slate-100 px-6 lg:px-10 h-16 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">

            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Vault</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-none gap-2 h-9">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Proof Certificate</span>
          </Button>
          <Button variant="outline" className="rounded-none gap-2 h-9">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share Verification Link</span>
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 lg:p-10">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                {proof.name.replace(/_/g, " ").replace(".pdf", "")}
              </h1>
              <p className="text-slate-500 text-sm">Certificate of Authenticity</p>
            </div>
            <Badge className="bg-emerald-500 text-white border-none rounded-none px-4 py-2 text-xs uppercase tracking-widest font-bold self-start">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Secured & Anchored
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-none border-slate-200 bg-white overflow-hidden">
              <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-12 flex flex-col items-center justify-center min-h-[280px]">
                <div className="absolute top-4 right-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="w-24 h-32 bg-white border border-slate-200 shadow-md flex flex-col items-center justify-center relative">
                  <FileText className="w-12 h-12 text-slate-300" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#7BAAD0] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Digital Asset</p>
                  <p className="text-sm font-medium text-slate-600">{proof.type}</p>
                </div>

                {proof.signatureData &&
                <div className="mt-4 pt-4 border-t border-slate-200 w-full">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 text-center mb-2">E-Signature</p>
                    <img src={proof.signatureData} alt="Signature" className="max-h-12 mx-auto opacity-80" />
                  </div>
                }
              </div>
            </Card>

            <Card className="rounded-none border-slate-200 bg-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Verify Integrity</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Have the original file? Drag it here to verify it matches the anchored record.
                </p>
                
                {verifyStatus === "idle" &&
                <label
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files[0];
                    if (file) handleVerifyFile(file);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#7BAAD0]/50 transition-colors">

                    <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleVerifyFile(file);
                    }}
                    className="hidden" />

                    <RefreshCw className="w-8 h-8 text-slate-300 mb-3" />
                    <p className="text-xs text-slate-500 text-center">
                      Drag & drop to verify match
                    </p>
                  </label>
                }

                {verifyStatus === "verifying" &&
                <div className="border-2 border-dashed border-[#7BAAD0]/30 bg-[#7BAAD0]/5 p-8 flex flex-col items-center justify-center">
                    <div className="animate-spin w-10 h-10 border-2 border-[#7BAAD0] border-t-transparent rounded-full mb-3" />
                    <p className="text-sm text-[#7BAAD0] font-medium">Computing hash...</p>
                    <p className="text-xs text-slate-400 mt-1">{droppedFileName}</p>
                  </div>
                }

                {verifyStatus === "match" &&
                <div className="border-2 border-emerald-200 bg-emerald-50 p-8 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <p className="text-lg font-bold text-emerald-700 mb-1">Match Confirmed!</p>
                    <p className="text-xs text-emerald-600 text-center mb-4">
                      This file is identical to the one anchored on {proof.anchoredDate}
                    </p>
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={resetVerify}
                    className="rounded-none text-xs">

                      Verify Another File
                    </Button>
                  </div>
                }

                {verifyStatus === "mismatch" &&
                <div className="border-2 border-red-200 bg-red-50 p-8 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                      <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <p className="text-lg font-bold text-red-700 mb-1">File Modified</p>
                    <p className="text-xs text-red-600 text-center mb-4">
                      This file does not match the anchored record. It may have been altered.
                    </p>
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={resetVerify}
                    className="rounded-none text-xs border-red-200 text-red-600 hover:bg-red-50">

                      Try Again
                    </Button>
                  </div>
                }
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full rounded-none bg-slate-100 p-1 h-auto">
                <TabsTrigger
                  value="overview"
                  className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-xs font-bold uppercase tracking-widest">

                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="technical"
                  className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-xs font-bold uppercase tracking-widest">

                  Technical Data
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card className="rounded-none border-slate-200 bg-white">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-900">
                      Chain of Custody
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Immutable timeline of document verification events
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="relative">
                      {timelineEvents.map((event, index) =>
                      <div key={index} className="flex gap-4 pb-8 last:pb-0">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          event.completed ?
                          "bg-emerald-100 text-emerald-600" :
                          "bg-slate-100 text-slate-400"}`
                          }>
                              {event.completed ?
                            <Check className="w-4 h-4" /> :

                            <Clock className="w-4 h-4" />
                            }
                            </div>
                            {index < timelineEvents.length - 1 &&
                          <div className={`w-0.5 flex-1 mt-2 ${
                          event.completed ? "bg-emerald-200" : "bg-slate-200"}`
                          } />
                          }
                          </div>
                          <div className="flex-1 pb-2">
                            <p className="text-sm font-bold text-slate-900">{event.title}</p>
                            <p className="text-[10px] text-[#7BAAD0] font-medium mb-1">{event.timestamp}</p>
                            <p className="text-xs text-slate-500">{event.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="rounded-none border-slate-200 bg-white">
                    <CardContent className="p-5">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Issuer</p>
                      <p className="text-sm font-semibold text-slate-900">{proof.issuer}</p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-none border-slate-200 bg-white">
                    <CardContent className="p-5">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Document Type</p>
                      <Badge variant="secondary" className="rounded-none">{proof.type}</Badge>
                    </CardContent>
                  </Card>
                  <Card className="rounded-none border-slate-200 bg-white">
                    <CardContent className="p-5">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">File Size</p>
                      <p className="text-sm font-semibold text-slate-900">{proof.fileSize}</p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-none border-slate-200 bg-white">
                    <CardContent className="p-5">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Security Level</p>
                      <p className="text-sm font-semibold text-emerald-600">Enterprise Grade</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="rounded-none border-[#7BAAD0]/30 bg-[#7BAAD0]/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#7BAAD0]/20 flex items-center justify-center shrink-0">
                        <ExternalLink className="w-5 h-5 text-[#7BAAD0]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900 mb-1">View Independent Public Record</h4>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                          This record exists on a public ledger and can be independently audited without Arkova. Verify the authenticity using any compatible block explorer.
                        </p>
                          <Button
                          variant="outline"
                          className="rounded-none gap-2 text-[#7BAAD0] border-[#7BAAD0]/30 hover:bg-[#7BAAD0]/10"
                          onClick={() => {
                            const url = `https://mempool.space/tx/${proof.recordId}`;
                            window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*");
                          }}>

                            <ExternalLink className="w-4 h-4" />
                            Open Public Ledger
                          </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="mt-6 space-y-6">
                <Card className="rounded-none border-slate-200 bg-white">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-900">
                      Technical Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                        Digital Fingerprint (SHA-256)
                      </p>
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200">
                        <code className="text-xs font-mono text-slate-600 flex-1 break-all">{proof.hash}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 shrink-0"
                          onClick={() => copyToClipboard(proof.hash)}>
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                        Immutable Record ID
                      </p>
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200">
                        <code className="text-xs font-mono text-slate-600 flex-1 break-all">
                          {proof.recordId === "pending" ? "Awaiting confirmation..." : proof.recordId}
                        </code>
                        {proof.recordId !== "pending" &&
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 shrink-0"
                          onClick={() => copyToClipboard(proof.recordId)}>
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                        }
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                          Ledger Position
                        </p>
                        <p className="text-sm font-mono font-semibold text-slate-900">
                          {proof.blockHeight.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                          Timestamp
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {proof.anchoredDate}
                        </p>
                      </div>
                    </div>

                    {proof.signatureStatus === "signed" && proof.signatureDate &&
                    <div className="pt-4 border-t border-slate-200">
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                            E-Signature Applied
                          </p>
                          <div className="flex items-center gap-3">
                            <PenTool className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-slate-900">Signed on {proof.signatureDate}</span>
                          </div>
                        </div>
                      </div>
                    }
                  </CardContent>
                </Card>

                <Card className="rounded-none border-slate-200 bg-white">
                  <CardContent className="p-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Cryptographic Path</h4>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      The cryptographic path proves this document&apos;s inclusion in the anchored batch without revealing other documents in the same batch.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#7BAAD0]" />
                        <code className="text-[10px] font-mono text-slate-500">Root: {truncateHash(proof.hash)}</code>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <code className="text-[10px] font-mono text-slate-400">L1: {truncateHash(proof.recordId || proof.hash)}</code>
                      </div>
                      <div className="flex items-center gap-2 ml-8">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <code className="text-[10px] font-mono text-emerald-600">Leaf: Your Document</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {proof.signatureStatus === "pending" &&
            <Card className="rounded-none border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <PenTool className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-amber-800 mb-1">Signature Required</h4>
                      <p className="text-xs text-amber-700 mb-4">
                        This document requires your e-signature to complete verification.
                      </p>
                      <Button
                      onClick={() => onNavigateToESign(proof)}
                      className="rounded-none bg-amber-600 hover:bg-amber-700 text-white">

                        Sign Document
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            }
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}

const DUMMY_SIGNATURE_1 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgNzBRNDAgMzAgNjAgNTBUMTAwIDQwVDE0MCA2MFQxODAgMzBUMjIwIDUwVDI2MCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUEyMDJDIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNjAgNDBRMjcwIDM1IDI4MCA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUEyMDJDIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==";
const DUMMY_SIGNATURE_2 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUgNTBDMzAgMjAgNTAgODAgNzAgNDBTMTEwIDcwIDEzMCA0MFMxNzAgNjAgMTkwIDM1UzIzMCA2MCAyNTAgNDUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFBMjAyQyIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjI2MCIgY3k9IjQ1IiByPSIzIiBmaWxsPSIjMUEyMDJDIi8+PC9zdmc+";
const DUMMY_SIGNATURE_3 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgNjBMMzUgMzVMNTAgNjBMODAgMjVMMTEwIDY1TDE0MCAzMEwxNzAgNTVMMjAwIDM1TDIzMCA2MEwyNjAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFBMjAyQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjYwIDQwTDI3MCAzNUwyODAgNDUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFBMjAyQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=";

const initialProofs: ProofData[] = [
{
  id: "1",
  name: "BS_ComputerScience_Diploma.pdf",
  type: "Credential",
  issuer: "UC Berkeley",
  status: "Anchored",
  anchoredDate: "Jan 15, 2024",
  hash: "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
  recordId: "3b4e8f2c1d9a7b6e5f4c3d2e1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b",
  fileSize: "2.4 MB",
  blockHeight: 831234,
  signatureStatus: "signed",
  signatureDate: "Jan 16, 2024",
  signatureData: DUMMY_SIGNATURE_1
},
{
  id: "2",
  name: "Employment_Offer_TechCorp.pdf",
  type: "Contract",
  issuer: "Self-Anchored",
  status: "Anchored",
  anchoredDate: "Feb 03, 2024",
  hash: "b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9",
  recordId: "4c5f9a3e2d8b7c6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2",
  fileSize: "856 KB",
  blockHeight: 831298,
  signatureStatus: "signed",
  signatureDate: "Feb 04, 2024",
  signatureData: DUMMY_SIGNATURE_2
},
{
  id: "3",
  name: "AWS_Architect_Cert.pdf",
  type: "Credential",
  issuer: "Amazon Web Services",
  status: "Processing",
  anchoredDate: "Mar 10, 2024",
  hash: "c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0",
  recordId: "pending",
  fileSize: "1.2 MB",
  blockHeight: 831456,
  signatureStatus: "pending"
},
{
  id: "4",
  name: "Hawaiian_Land_Title.pdf",
  type: "Property",
  issuer: "Hawaii Land Registry",
  status: "Anchored",
  anchoredDate: "Jan 20, 2024",
  hash: "d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1",
  recordId: "5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
  fileSize: "1.8 MB",
  blockHeight: 831245,
  signatureStatus: "signed",
  signatureDate: "Jan 21, 2024",
  signatureData: DUMMY_SIGNATURE_3
}];


const initialSignatureRequests: SignatureRequest[] = [
{
  id: "sr1",
  documentName: "NDA_Agreement_2024.pdf",
  documentId: "doc1",
  requestedBy: "TechCorp Inc.",
  requestedDate: "Mar 15, 2024",
  status: "pending",
  dueDate: "Mar 22, 2024"
},
{
  id: "sr2",
  documentName: "Employment_Contract.pdf",
  documentId: "doc2",
  requestedBy: "StartupXYZ",
  requestedDate: "Mar 18, 2024",
  status: "pending",
  dueDate: "Mar 25, 2024"
}];


export default function ArkovaOnboarding() {
  const [step, setStep] = useState<OnboardingStep>("auth");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    avatarUrl: null
  });
  const [proofs, setProofs] = useState<ProofData[]>(initialProofs);
  const [signatureRequests, setSignatureRequests] = useState<SignatureRequest[]>(initialSignatureRequests);
  const [documentToSign, setDocumentToSign] = useState<ProofData | SignatureRequest | null>(null);
  const [selectedProof, setSelectedProof] = useState<ProofData | null>(null);

  const handleAuthComplete = () => setStep("account-type");
  const handleAccountTypeComplete = () => setStep("profile");
  const handleProfileComplete = () => {
    if (accountType === "organization") {
      setStep("admin-dashboard");
    } else {
      setStep("dashboard");
    }
  };
  const handleNavigateToAnchor = () => setStep("anchor");
  const handleNavigateToESign = (doc: ProofData | SignatureRequest) => {
    setDocumentToSign(doc);
    setStep("esign");
  };
  const handleNavigateToAssetDetail = (proof: ProofData) => {
    setSelectedProof(proof);
    setStep("asset-detail");
  };
  const handleBackToDashboard = () => {
    if (accountType === "organization") {
      setStep("admin-dashboard");
    } else {
      setStep("dashboard");
    }
  };

  const handleLogout = () => {
    setStep("auth");
    setEmail("");
    setAccountType(null);
    setUserProfile({
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      avatarUrl: null
    });
    setProofs(initialProofs);
    setSignatureRequests(initialSignatureRequests);
  };

  const handleAnchorComplete = (newProof: ProofData) => {
    setProofs((prev) => [newProof, ...prev]);
  };

  const handleSignComplete = (signatureData: string) => {
    if (documentToSign) {
      if ("name" in documentToSign) {
        setProofs((prev) =>
        prev.map((p) =>
        p.id === documentToSign.id ?
        {
          ...p,
          signatureStatus: "signed" as const,
          signatureDate: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          }),
          signatureData
        } :
        p
        )
        );
      } else {
        setSignatureRequests((prev) =>
        prev.map((r) =>
        r.id === documentToSign.id ? { ...r, status: "signed" as const } : r
        )
        );
      }
    }
  };

  const handleSignRequest = (request: SignatureRequest) => {
    setDocumentToSign(request);
    setStep("esign");
  };

  switch (step) {
    case "auth":
      return <AuthScreen onComplete={handleAuthComplete} email={email} setEmail={setEmail} />;
    case "account-type":
      return (
        <AccountTypeScreen
          onComplete={handleAccountTypeComplete}
          accountType={accountType}
          setAccountType={setAccountType} />);


    case "profile":
      if (accountType === "organization") {
        return (
          <OrganizationVerificationScreen
            onComplete={handleProfileComplete}
            email={email}
            setUserProfile={setUserProfile} />);


      }
      return (
        <ProfileSetupScreen
          onComplete={handleProfileComplete}
          email={email}
          setUserProfile={setUserProfile}
          accountType={accountType} />);


    case "dashboard":
      return (
        <IndividualDashboard
          onNavigateToAnchor={handleNavigateToAnchor}
          onNavigateToESign={handleNavigateToESign}
          onNavigateToAssetDetail={handleNavigateToAssetDetail}
          onLogout={handleLogout}
          userProfile={userProfile}
          proofs={proofs}
          signatureRequests={signatureRequests}
          onSignRequest={handleSignRequest} />);


    case "admin-dashboard":
      return (
        <AdminDashboard
          onLogout={handleLogout}
          userProfile={userProfile}
          onNavigateToAnchor={handleNavigateToAnchor} />);


    case "anchor":
      return (
        <AnchorScreen
          onBack={handleBackToDashboard}
          onAnchorComplete={handleAnchorComplete} />);


    case "esign":
      return (
        <ESignScreen
          onBack={handleBackToDashboard}
          documentToSign={documentToSign}
          onSignComplete={handleSignComplete} />);


    case "asset-detail":
      return selectedProof ?
      <AssetDetailScreen
        proof={selectedProof}
        onBack={handleBackToDashboard}
        onNavigateToESign={handleNavigateToESign} /> :

      null;
    default:
      return null;
  }
}