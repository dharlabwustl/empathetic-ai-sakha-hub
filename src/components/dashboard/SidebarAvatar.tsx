
import { useState, useEffect } from "react";

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

  const getEyePosition = (eyeIndex: number) => {
    const basePosition = eyeIndex === 1 ? { x: 8, y: 12 } : { x: 17, y: 12 };
    const maxMovement = 1.5;
    
    // Calculate movement direction based on mouse position
    const moveX = mousePosition.x > window.innerWidth / 2 ? maxMovement : -maxMovement;
    const moveY = mousePosition.y > window.innerHeight / 2 ? maxMovement : -maxMovement;
    
    return {
      left: `${basePosition.x + moveX}px`,
      top: `${basePosition.y + moveY}px`
    };
  };

  return (
    <div className="px-4 mb-6 text-center">
      <div className="flex items-center justify-center mb-2">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400/20 to-violet-500/20 flex items-center justify-center text-sky-500 animate-glow">
            {/* Avatar with animated eyes */}
            <div className="avatar-eyes relative w-10 h-10 overflow-hidden">
              <img 
                src="/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png" 
                alt="Sakha AI Logo" 
                className="w-10 h-10"
              />
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
