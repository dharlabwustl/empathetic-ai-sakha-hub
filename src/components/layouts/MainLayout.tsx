
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  className = "", 
  fullWidth = false 
}) => {
  return (
    <div className={`min-h-screen bg-background text-base ${className}`}>
      <main className={`${fullWidth ? '' : 'container mx-auto px-4'}`}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
