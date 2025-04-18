
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarNavProps } from "./types/sidebar";
import { SidebarAvatar } from "./SidebarAvatar";
import { getNavigationRoutes } from "./SidebarNavRoutes";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavLink } from "react-router-dom";
import { UserRole } from "@/types/user/base";

const SidebarNav = ({ userType, userName = "User" }: SidebarNavProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Convert userType string to UserRole enum
  const getUserRole = (type: string): UserRole => {
    switch (type.toLowerCase()) {
      case "student":
        return UserRole.Student;
      case "employee":
        return UserRole.Employee;
      case "doctor":
        return UserRole.Doctor;
      case "founder":
        return UserRole.Founder;
      case "admin":
        return UserRole.Admin;
      default:
        return UserRole.Student; // Default to student if role not recognized
    }
  };
  
  // Get navigation routes based on user type
  const navRoutes = getNavigationRoutes(getUserRole(userType));

  return (
    <>
      {/* Mobile Menu Button */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 border-r border-sidebar-border z-40 transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64",
          isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : "md:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
            <div className="avatar-eyes w-10 h-10 bg-gradient-to-br from-sky-400 to-violet-500 rounded-full relative overflow-hidden animate-glow">
              <img 
                src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                alt="Sakha AI Logo" 
                className="w-10 h-10"
              />
            </div>
            {!collapsed && <span className="font-display font-semibold gradient-text">Sakha AI</span>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarAvatar 
            userName={userName} 
            userType={userType} 
            collapsed={collapsed} 
          />
          
          {/* Navigation Routes */}
          <div className="px-3 py-2">
            <nav className="space-y-1">
              {navRoutes.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      collapsed && "justify-center px-0"
                    )
                  }
                  onClick={() => isMobile && setMobileOpen(false)}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between mb-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              asChild
            >
              <Link to="/login">
                <LogOut size={18} />
              </Link>
            </Button>
          </div>
          {!collapsed && (
            <Button 
              variant="ghost" 
              className="w-full text-muted-foreground hover:text-destructive flex items-center gap-2"
              asChild
            >
              <Link to="/login">
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
