
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
    console.log('useNavigation - Current Location:', location.pathname);
    console.log('useNavigation - Current Tab Parameter:', tab);

    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    } else if (location.pathname === "/dashboard/student") {
      setActiveTab("overview");
    }
    
    // Add special handling for concept detail pages
    if (location.pathname.startsWith('/dashboard/student/concepts/') && location.pathname !== '/dashboard/student/concepts') {
      console.log('Detected concept detail page');
      setActiveTab("concepts");
    }
  }, [tab, location.pathname]);

  const handleTabChange = (tab: string) => {
    console.log(`Changing tab to: ${tab}`);
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
