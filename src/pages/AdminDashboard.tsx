import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nhost, gql } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Check, X, Users, Clock } from "lucide-react";
import PageContainer from "@/components/pageContainer";

interface UserApproval {
  id: string;
  user_id: string;
  email: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface AdminUser {
  id: string;
  user_id: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState<UserApproval[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const session = nhost.getUserSession();
    const userId = session?.user?.id ?? null;
    const userEmail = session?.user?.email ?? "";
    setCurrentUserId(userId);

    if (!userId) {
      navigate("/auth");
      return;
    }

    fetchAdminData(userId, userEmail);
  }, []);

  const fetchAdminData = async (userId: string, userEmail: string) => {
    try {
      // Hardcoded bypass for specific emails
      const isBypassedAdmin =
        userEmail === "shwetchourey0@gmail.com" ||
        userEmail === "shwetchourcy3@gmail.com";

      if (isBypassedAdmin) {
        // Auto-register bypassed admin in database to satisfy RLS for viewing approvals
        try {
          await gql(
            `mutation RegisterAdmin($userId: uuid!, $email: String!) {
              insert_admin_users_one(
                object: { user_id: $userId, email: $email },
                on_conflict: { constraint: admin_users_email_key, update_columns: [] }
              ) {
                id
              }
            }`,
            { userId, email: userEmail },
          );
        } catch (e) {
          console.error("Auto-registering admin failed, proceeding anyway", e);
        }
      } else {
        // Check if current user is admin
        const { data: adminCheck } = await gql<{
          admin_users: AdminUser[];
        }>(
          `query CheckAdmin($userId: uuid!) {
            admin_users(where: { user_id: { _eq: $userId } }, limit: 1) {
              id
              user_id
            }
          }`,
          { userId },
        );

        if (!adminCheck?.admin_users?.length) {
          toast.error("Access denied. Admin privileges required.");
          navigate("/dashboard");
          return;
        }
      }

      // Fetch all data in parallel
      const [approvalsResult, adminsResult] = await Promise.all([
        gql<{ user_approvals: UserApproval[] }>(
          `query GetApprovals {
            user_approvals(order_by: { created_at: desc }) {
              id
              user_id
              email
              status
              created_at
              updated_at
            }
          }`,
        ),
        gql<{ admin_users: AdminUser[] }>(
          `query GetAdmins {
            admin_users {
              id
              user_id
            }
          }`,
        ),
      ]);

      setApprovals(approvalsResult.data?.user_approvals ?? []);
      setAdminUsers(adminsResult.data?.admin_users ?? []);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (approvalId: string, userId: string) => {
    try {
      const { error } = await gql(
        `mutation ApproveUser($approvalId: uuid!) {
          update_user_approvals_by_pk(
            pk_columns: { id: $approvalId }
            _set: { status: "approved", updated_at: "now()" }
          ) {
            id
          }
        }`,
        { approvalId },
      );
      if (error) throw new Error(error);
      toast.success("User approved!");
      const session = nhost.getUserSession();
      if (currentUserId)
        fetchAdminData(currentUserId, session?.user?.email ?? "");
    } catch (err) {
      console.error("Approve failed:", err);
      toast.error("Failed to approve user");
    }
  };

  const handleReject = async (approvalId: string) => {
    try {
      const { error } = await gql(
        `mutation RejectUser($approvalId: uuid!) {
          update_user_approvals_by_pk(
            pk_columns: { id: $approvalId }
            _set: { status: "rejected", updated_at: "now()" }
          ) {
            id
          }
        }`,
        { approvalId },
      );
      if (error) throw new Error(error);
      toast.success("User rejected");
      const session = nhost.getUserSession();
      if (currentUserId)
        fetchAdminData(currentUserId, session?.user?.email ?? "");
    } catch (err) {
      console.error("Reject failed:", err);
      toast.error("Failed to reject user");
    }
  };

  const pendingApprovals = approvals.filter((a) => a.status === "pending");
  const processedApprovals = approvals.filter((a) => a.status !== "pending");

  return (
    <PageContainer allowScroll className="bg-background">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 pb-8 sm:pb-14 pt-4 sm:pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage user approvals and access control
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-full bg-yellow-500/10 p-2">
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">
                  {pendingApprovals.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-full bg-emerald-500/10 p-2">
                <Check className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-foreground">
                  {approvals.filter((a) => a.status === "approved").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-full bg-purple-500/10 p-2">
                <Users className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admins</p>
                <p className="text-2xl font-bold text-foreground">
                  {adminUsers.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        <Card className="rounded-xl sm:rounded-2xl border-border bg-card shadow-sm mb-6">
          <CardHeader className="rounded-t-xl sm:rounded-t-2xl border-b border-border bg-muted/50 px-4 sm:px-6 py-4 sm:py-5">
            <CardTitle className="text-base sm:text-lg font-semibold text-foreground">
              Pending Approvals
            </CardTitle>
            <CardDescription className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
              Review and approve or reject user access requests
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="py-10 text-center text-muted-foreground text-sm">
                Loading...
              </div>
            ) : pendingApprovals.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground text-sm">
                No pending approvals.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {pendingApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {approval.email}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Requested{" "}
                        {new Date(approval.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="h-8 gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() =>
                          handleApprove(approval.id, approval.user_id)
                        }
                      >
                        <Check className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1.5 rounded-lg border-rose-700 text-rose-500 hover:bg-rose-950/50"
                        onClick={() => handleReject(approval.id)}
                      >
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Processed Approvals */}
        {processedApprovals.length > 0 && (
          <Card className="rounded-xl sm:rounded-2xl border-border bg-card shadow-sm">
            <CardHeader className="rounded-t-xl sm:rounded-t-2xl border-b border-border bg-muted/50 px-4 sm:px-6 py-4 sm:py-5">
              <CardTitle className="text-base sm:text-lg font-semibold text-foreground">
                Processed Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {processedApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    className="flex items-center justify-between px-4 sm:px-6 py-3 hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {approval.email}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Updated{" "}
                        {new Date(approval.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        approval.status === "approved" ? "default" : "secondary"
                      }
                      className={
                        approval.status === "approved"
                          ? "bg-emerald-600/20 text-emerald-400 border-emerald-700"
                          : "bg-rose-600/20 text-rose-400 border-rose-700"
                      }
                    >
                      {approval.status === "approved" ? (
                        <Check className="mr-1 h-3 w-3" />
                      ) : (
                        <X className="mr-1 h-3 w-3" />
                      )}
                      {approval.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
