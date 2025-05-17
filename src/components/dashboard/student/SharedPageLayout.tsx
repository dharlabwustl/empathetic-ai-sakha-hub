
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  extraHeaderContent?: ReactNode;
}

const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  title,
  subtitle,
  children,
  showBackButton = false,
  onBackClick,
  extraHeaderContent
}) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <header className="mb-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
            <div className="flex items-start gap-4">
              {showBackButton && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onBackClick} 
                  className="mt-1 hover:bg-muted"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
                {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
              </div>
            </div>
            {extraHeaderContent && (
              <div className="flex flex-wrap items-center gap-2">
                {extraHeaderContent}
              </div>
            )}
          </div>
        </header>
        
        <main>
          {children}
        </main>
      </motion.div>
    </div>
  );
};

export default SharedPageLayout;
