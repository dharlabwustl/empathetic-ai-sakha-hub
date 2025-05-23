
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background text-base">
      {/* You can add header, footer, or other common layout elements here if needed */}
      <main className={`container mx-auto px-3 ${isMobile ? 'py-4' : 'py-8'} max-w-full`}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
