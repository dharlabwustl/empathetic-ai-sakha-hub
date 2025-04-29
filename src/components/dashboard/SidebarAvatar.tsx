
import { useState, useEffect } from "react";
import PrepzrLogo from "@/components/common/PrepzrLogo";

interface SidebarAvatarProps {
  userName: string;
  userType: string;
  collapsed: boolean;
}

export const SidebarAvatar = ({ userName, userType, collapsed }: SidebarAvatarProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for avatar eye movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="px-4 mb-6 text-center">
      <div className="flex items-center justify-center mb-2">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-500/20 flex items-center justify-center text-blue-500 animate-glow">
            {/* Avatar with logo */}
            <div className="avatar-eyes relative w-10 h-10 overflow-hidden">
              <PrepzrLogo width={40} height={40} />
            </div>
          </div>
        </div>
      </div>
      
      {!collapsed && (
        <div>
          <p className="font-medium">{userName}</p>
          <p className="text-xs text-muted-foreground capitalize">{userType}</p>
        </div>
      )}
    </div>
  );
};
