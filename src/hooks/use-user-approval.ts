import { useEffect, useState } from "react";
import { nhost, gql } from "@/integrations/supabase/client";

export function useUserApproval() {
  const [isApproved, setIsApproved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkApprovalStatus();

    // Poll every 15 seconds instead of realtime (Nhost realtime via GraphQL subscriptions
    // requires more complex setup; polling is sufficient for approval use case)
    const interval = setInterval(checkApprovalStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const checkApprovalStatus = async () => {
    try {
      const session = nhost.getUserSession();
      const userId = session?.user?.id;
      const userEmail = session?.user?.email;

      if (!userId) {
        setLoading(false);
        return;
      }

      // Hardcoded Admin Check bypass for specific emails
      if (
        userEmail === "shwetchourey0@gmail.com" ||
        userEmail === "shwetchourcy3@gmail.com"
      ) {
        setIsAdmin(true);
        setIsApproved(true);
        setApprovalStatus("approved");
        setLoading(false);
        return;
      }

      // Check if user is admin via database
      const { data: adminData } = await gql<{
        admin_users: { id: string }[];
      }>(
        `query CheckAdmin($userId: uuid!) {
          admin_users(where: { user_id: { _eq: $userId } }, limit: 1) {
            id
          }
        }`,
        { userId },
      );

      console.log("Admin Check Data:", adminData);

      if (adminData?.admin_users?.length) {
        setIsAdmin(true);
        setIsApproved(true);
        setApprovalStatus("approved");
        setLoading(false);
        return;
      }

      // Check approval status
      const { data: approvalData } = await gql<{
        user_approvals: { status: string }[];
      }>(
        `query CheckApproval($userId: uuid!) {
          user_approvals(where: { user_id: { _eq: $userId } }, limit: 1) {
            status
          }
        }`,
        { userId },
      );

      const status = approvalData?.user_approvals?.[0]?.status ?? "pending";
      setApprovalStatus(status);
      setIsApproved(status === "approved");
    } catch (error) {
      console.error("Error checking approval status:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isApproved,
    isAdmin,
    approvalStatus,
    loading,
    refetch: checkApprovalStatus,
  };
}
