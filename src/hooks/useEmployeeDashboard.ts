
import { useState, useEffect } from "react";
import { useUserProfile } from "./useUserProfile";
import { UserRole } from "@/types/user/base";

export const useEmployeeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const { userProfile, loading: profileLoading } = useUserProfile(UserRole.Employee);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!profileLoading) {
      setLoading(false);
    }
  }, [profileLoading]);

  return {
    loading,
    userProfile,
    activeTab,
    setActiveTab
  };
};
