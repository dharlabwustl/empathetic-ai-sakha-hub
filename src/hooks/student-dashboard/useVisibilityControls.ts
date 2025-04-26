
import { useState } from "react";

export function useVisibilityControls() {
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);

  const toggleSidebar = () => setHideSidebar(!hideSidebar);
  const toggleTabsNav = () => setHideTabsNav(!hideTabsNav);

  return {
    hideSidebar,
    hideTabsNav,
    toggleSidebar,
    toggleTabsNav
  };
}
