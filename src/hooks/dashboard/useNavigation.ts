
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export function useNavigation() {
  const { tab } = useParams<{ tab?: string }>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(tab || "overview");
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const navigate = useNavigate();

  // Valid tab names
  const validTabs = ["overview", "today", "academic", "concepts", "flashcards", "practice-exam", "feel-good", "notifications", "tutor"];

  // Update active tab when URL changes
  useEffect(() => {
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    } else if (location.pathname === "/dashboard/student") {
      setActiveTab("overview");
    }
  }, [tab, location.pathname]);

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
