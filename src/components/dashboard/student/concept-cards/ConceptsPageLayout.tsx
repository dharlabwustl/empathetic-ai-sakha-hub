
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuickAccess } from '@/components/dashboard/student/QuickAccess';
import { SectionHeader } from '@/components/ui/section-header';
import { motion } from 'framer-motion';

interface ConceptsPageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

export const ConceptsPageLayout: React.FC<ConceptsPageLayoutProps> = ({
  children,
  showBackButton = false,
  title,
  subtitle
}) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <QuickAccess />
      
      <div className="flex items-center justify-between">
        {showBackButton && (
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/dashboard/student/concepts">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Concepts
              </Button>
            </Link>
          </motion.div>
        )}
        
        {title && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <SectionHeader title={title} subtitle={subtitle} />
          </motion.div>
        )}
      </div>
      
      <Card className="p-6 border border-gray-200 dark:border-gray-800 shadow-md rounded-xl bg-white dark:bg-gray-950">
        {children}
      </Card>
    </motion.div>
  );
};
