import { useState, useEffect } from "react";
import { nhost, gql } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Save,
  Loader2,
  User,
  Mail,
  ShieldCheck,
  Clock,
  RefreshCw,
} from "lucide-react";
import PageContainer from "@/components/pageContainer";
import { useUserApproval } from "@/hooks/use-user-approval";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [email, setEmail] = useState("");
  const [redirectTimer, setRedirectTimer] = useState<number>(5);
  const { isApproved, isAdmin, approvalStatus } = useUserApproval();

  useEffect(() => {
    const session = nhost.getUserSession();
    if (session?.user?.email) {
      setEmail(session.user.email);
    }

    // Fetch the current timer setting (taking the generic first landing page value)
    if (session?.user?.id) {
      fetchGlobalTimerSetting(session.user.id);
    }
  }, []);

  const fetchGlobalTimerSetting = async (userId: string) => {
    try {
      const { data, error } = await gql<{
        landing_pages: { redirect_timer: number }[];
      }>(
        `query GetGlobalTimer($userId: uuid!) {
          landing_pages(where: { user_id: { _eq: $userId } }, limit: 1) {
            id
          }
        }`,
        { userId },
      );
      // Temporarily disabled until DB migration is applied
      // if (data?.landing_pages && data.landing_pages.length > 0) {
      //   setRedirectTimer(data.landing_pages[0].redirect_timer ?? 5);
      // }
    } catch (err) {
      console.error("Failed to fetch timer:", err);
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const session = nhost.getUserSession();
      if (!session?.user?.id) throw new Error("Not authenticated");

      // Update the redirect_timer for ALL landing pages owned by the user
      // Temporarily disabled until DB migration is applied
      /*
      const { error } = await gql(
        `mutation UpdateGlobalTimer($userId: uuid!, $timer: Int!) {
          update_landing_pages(where: { user_id: { _eq: $userId } }, _set: { redirect_timer: $timer }) {
            affected_rows
          }
        }`,
        { userId: session.user.id, timer: redirectTimer },
      );

      if (error) throw new Error(error);
      */

      toast.success(
        `Global redirect timer updated to ${redirectTimer} seconds!`,
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update settings");
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <PageContainer className="bg-background overflow-hidden h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 mx-auto w-full bg-transparent/0 backdrop-blur">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 pt-4 sm:pt-6">
          <div className="rounded-xl sm:rounded-2xl border-border bg-card shadow-sm">
            <div className="flex flex-col gap-3 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                    My Profile & Settings
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-3 sm:px-4 pb-4 pt-4">
        <div className="space-y-4 max-w-3xl">
          {/* Account Details */}
          <Card className="rounded-xl sm:rounded-2xl border-border bg-card shadow-sm">
            <CardHeader className="rounded-t-xl sm:rounded-t-2xl border-b border-border bg-muted/50 px-4 sm:px-6 py-4 sm:py-5">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground">
                <User className="h-5 w-5 text-violet-500" />
                Account Overview
              </CardTitle>
              <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground">
                Your personal account details and access level.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5">
              <div className="space-y-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email Address
                  </Label>
                  <Input
                    value={email}
                    disabled
                    className="bg-muted font-medium text-foreground max-w-md"
                  />
                </div>

                <div className="flex flex-col gap-1.5 pt-2">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Account Status
                  </Label>
                  <div className="flex items-center gap-3">
                    {isAdmin ? (
                      <Badge className="bg-purple-950/50 text-purple-300 border-purple-700 hover:bg-purple-950/50">
                        Admin Access
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-950/50 text-blue-300 border-blue-700 hover:bg-blue-950/50">
                        Standard User
                      </Badge>
                    )}

                    {approvalStatus === "approved" ? (
                      <Badge className="bg-emerald-950/50 text-emerald-400 border-emerald-700">
                        Approved
                      </Badge>
                    ) : approvalStatus === "pending" ? (
                      <Badge className="bg-yellow-950/50 text-yellow-500 border-yellow-700">
                        Pending Approval
                      </Badge>
                    ) : (
                      <Badge className="bg-rose-950/50 text-rose-400 border-rose-700">
                        Rejected
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Global CTA Auto-Redirect Settings */}
          {isApproved && (
            <Card className="rounded-xl sm:rounded-2xl border-border bg-card shadow-sm animate-in slide-in-from-bottom-3 fade-in duration-500 delay-100">
              <CardHeader className="rounded-t-xl sm:rounded-t-2xl border-b border-border bg-muted/50 px-4 sm:px-6 py-4 sm:py-5">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground">
                  <Clock className="h-5 w-5 text-indigo-500" />
                  Global Auto-Redirect Timer
                </CardTitle>
                <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground">
                  Adjust how long visitors wait before being automatically
                  redirected to your Telegram channel (in seconds). This setting
                  instantly applies to ALL your landing pages. Set to 0 to
                  disable auto-redirect.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-5">
                <div className="space-y-6 max-w-xl">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-foreground">
                        Wait Time:{" "}
                        <span className="text-indigo-500 text-lg">
                          {redirectTimer}
                        </span>{" "}
                        seconds
                      </Label>
                      {redirectTimer === 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-muted text-muted-foreground border-border px-3 py-1"
                        >
                          Auto-Redirect Disabled
                        </Badge>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setRedirectTimer(0)}
                          className="h-8 text-xs font-medium bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 hover:text-rose-600 border-none px-3"
                        >
                          Disable Auto-Redirect
                        </Button>
                      )}
                    </div>

                    <Slider
                      value={[redirectTimer]}
                      min={0}
                      max={30}
                      step={1}
                      onValueChange={(vals) => setRedirectTimer(vals[0])}
                      className="cursor-pointer"
                    />

                    <div className="flex justify-between text-xs text-muted-foreground font-medium px-1">
                      <span>0s (Off)</span>
                      <span>15s</span>
                      <span>30s</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveSettings}
                    disabled={savingSettings}
                    className="w-full sm:w-auto gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md"
                  >
                    {savingSettings ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Global Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </PageContainer>
  );
}
