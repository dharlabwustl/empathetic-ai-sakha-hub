
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function useNavigation() {
  const { tab } = useParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState(tab || "overview");
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/student/${tab}`);
  };

  const toggleSidebar = () => setHideSidebar(!hideSidebar);
  const toggleTabsNav = () => setHideTabsNav(!hideTabsNav);
  const handleViewStudyPlan = () => setShowStudyPlan(true);
  const handleCloseStudyPlan = () => setShowStudyPlan(false);

  return {
    activeTab,
    hideSidebar,
    hideTabsNav,
    showStudyPlan,
    handleTabChange,
    toggleSidebar,
    toggleTabsNav,
    handleViewStudyPlan,
    handleCloseStudyPlan
  };
}
