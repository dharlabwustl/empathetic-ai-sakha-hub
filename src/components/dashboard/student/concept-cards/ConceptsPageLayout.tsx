
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuickAccess } from '@/components/dashboard/student/QuickAccess';
import { SectionHeader } from '@/components/ui/section-header';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ConceptsPageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
  backButtonUrl?: string;
}

export const ConceptsPageLayout: React.FC<ConceptsPageLayoutProps> = ({
  children,
  showBackButton = false,
  title,
  subtitle,
  backButtonUrl = "/dashboard/student/concepts"
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  return (
    <motion.div 
      className="space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <QuickAccess />
      
      <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-between'}`}>
        {showBackButton && (
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={isMobile ? "mb-2" : ""}
          >
            <Link to={backButtonUrl}>
              <Button 
                variant="ghost" 
                size={isMobile ? "sm" : "default"}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <ChevronLeft className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                <span className={isMobile ? "text-xs" : ""}>Back to Concepts</span>
              </Button>
            </Link>
          </motion.div>
        )}
        
        {title && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={isMobile ? "ml-2" : ""}
          >
            <SectionHeader 
              title={title} 
              subtitle={subtitle}
            />
          </motion.div>
        )}
      </div>
      
      <Card className={`${isMobile ? 'p-3' : 'p-6'} border border-gray-200 dark:border-gray-800 shadow-md rounded-xl bg-white dark:bg-gray-950 overflow-auto max-w-[100vw]`}>
        {children}
      </Card>
    </motion.div>
  );
};
